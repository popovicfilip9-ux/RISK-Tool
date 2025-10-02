import React, { useState, useContext } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { RiskContext } from '../contexts/RiskContext';
import { AuthContext } from '../contexts/AuthContext';
import { 
  Target, 
  Calendar, 
  User, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  Shield,
  Activity,
  FileText,
  Users,
  BarChart3
} from 'lucide-react';

const RiskTreatmentPlanning = () => {
  const { risks, updateRisk } = useContext(RiskContext);
  const { user } = useContext(AuthContext);
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [showTreatmentForm, setShowTreatmentForm] = useState(false);
  const [newTreatment, setNewTreatment] = useState({
    type: 'Mitigate',
    description: '',
    owner: user?.name || '',
    targetDate: '',
    priority: 'Medium',
    cost: '',
    resources: '',
    status: 'Planned'
  });

  const treatmentTypes = ['Mitigate', 'Transfer', 'Accept', 'Avoid'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const treatmentStatuses = ['Planned', 'In Progress', 'Completed', 'On Hold', 'Cancelled'];

  const risksWithTreatments = risks.map(risk => ({
    ...risk,
    treatments: risk.treatments || []
  }));

  const addTreatment = (riskId) => {
    const risk = risks.find(r => r.id === riskId);
    if (risk) {
      const treatment = {
        ...newTreatment,
        id: Date.now(),
        dateCreated: new Date().toISOString().split('T')[0],
        progress: 0
      };
      
      const updatedRisk = {
        ...risk,
        treatments: [...(risk.treatments || []), treatment],
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      updateRisk(updatedRisk);
      setNewTreatment({
        type: 'Mitigate',
        description: '',
        owner: user?.name || '',
        targetDate: '',
        priority: 'Medium',
        cost: '',
        resources: '',
        status: 'Planned'
      });
      setShowTreatmentForm(false);
    }
  };

  const updateTreatment = (riskId, treatmentId, updates) => {
    const risk = risks.find(r => r.id === riskId);
    if (risk) {
      const updatedTreatments = risk.treatments.map(t => 
        t.id === treatmentId ? { ...t, ...updates } : t
      );
      
      const updatedRisk = {
        ...risk,
        treatments: updatedTreatments,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      updateRisk(updatedRisk);
    }
  };

  const deleteTreatment = (riskId, treatmentId) => {
    const risk = risks.find(r => r.id === riskId);
    if (risk) {
      const updatedTreatments = risk.treatments.filter(t => t.id !== treatmentId);
      
      const updatedRisk = {
        ...risk,
        treatments: updatedTreatments,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      updateRisk(updatedRisk);
    }
  };

  const getTreatmentTypeColor = (type) => {
    switch (type) {
      case 'Mitigate': return 'bg-blue-100 text-blue-800';
      case 'Transfer': return 'bg-purple-100 text-purple-800';
      case 'Accept': return 'bg-yellow-100 text-yellow-800';
      case 'Avoid': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateTreatmentEffectiveness = (risk) => {
    if (!risk.treatments || risk.treatments.length === 0) return 0;
    
    const completedTreatments = risk.treatments.filter(t => t.status === 'Completed');
    const totalTreatments = risk.treatments.length;
    
    return Math.round((completedTreatments.length / totalTreatments) * 100);
  };

  const getOverallTreatmentStats = () => {
    const allTreatments = risksWithTreatments.flatMap(risk => risk.treatments || []);
    
    return {
      total: allTreatments.length,
      completed: allTreatments.filter(t => t.status === 'Completed').length,
      inProgress: allTreatments.filter(t => t.status === 'In Progress').length,
      planned: allTreatments.filter(t => t.status === 'Planned').length,
      overdue: allTreatments.filter(t => 
        t.targetDate && new Date(t.targetDate) < new Date() && t.status !== 'Completed'
      ).length
    };
  };

  const treatmentStats = getOverallTreatmentStats();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Target className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Risk Treatment Planning</h1>
            <p className="text-gray-600">Plan and track risk mitigation actions</p>
          </div>
        </div>
      </div>

      {/* Treatment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{treatmentStats.total}</div>
                <div className="text-sm text-gray-600">Total Treatments</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{treatmentStats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{treatmentStats.inProgress}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-2xl font-bold text-gray-600">{treatmentStats.planned}</div>
                <div className="text-sm text-gray-600">Planned</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">{treatmentStats.overdue}</div>
                <div className="text-sm text-gray-600">Overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Treatment Cards */}
      <div className="space-y-6">
        {risksWithTreatments.map((risk) => (
          <Card key={risk.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{risk.title}</CardTitle>
                  <CardDescription className="mt-1">{risk.description}</CardDescription>
                  <div className="flex space-x-2 mt-2">
                    <Badge variant="outline">{risk.category}</Badge>
                    <Badge className={
                      risk.riskScore >= 15 ? 'bg-red-100 text-red-800' :
                      risk.riskScore >= 10 ? 'bg-orange-100 text-orange-800' :
                      risk.riskScore >= 6 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }>
                      Risk Score: {risk.riskScore}
                    </Badge>
                    <Badge variant="outline">
                      Treatment Effectiveness: {calculateTreatmentEffectiveness(risk)}%
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setSelectedRisk(risk);
                    setShowTreatmentForm(true);
                  }}
                  size="sm"
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add Treatment
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              {risk.treatments && risk.treatments.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Treatment Actions</h4>
                  <div className="grid gap-4">
                    {risk.treatments.map((treatment) => (
                      <Card key={treatment.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge className={getTreatmentTypeColor(treatment.type)}>
                                  {treatment.type}
                                </Badge>
                                <Badge className={getPriorityColor(treatment.priority)}>
                                  {treatment.priority}
                                </Badge>
                                <Badge className={getStatusColor(treatment.status)}>
                                  {treatment.status}
                                </Badge>
                              </div>
                              
                              <p className="text-sm text-gray-900 mb-2">{treatment.description}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-gray-600">Owner:</span>
                                  <p>{treatment.owner}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-600">Target Date:</span>
                                  <p>{treatment.targetDate || 'Not set'}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-600">Progress:</span>
                                  <div className="flex items-center space-x-2">
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                      <div 
                                        className="bg-blue-600 h-2 rounded-full" 
                                        style={{ width: `${treatment.progress || 0}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs">{treatment.progress || 0}%</span>
                                  </div>
                                </div>
                              </div>

                              {treatment.cost && (
                                <div className="mt-2 text-sm">
                                  <span className="font-medium text-gray-600">Estimated Cost:</span>
                                  <span className="ml-1">{treatment.cost}</span>
                                </div>
                              )}

                              {treatment.resources && (
                                <div className="mt-1 text-sm">
                                  <span className="font-medium text-gray-600">Resources Required:</span>
                                  <span className="ml-1">{treatment.resources}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex space-x-1 ml-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const progress = prompt('Enter progress percentage (0-100):', treatment.progress || '0');
                                  if (progress !== null) {
                                    const progressNum = Math.max(0, Math.min(100, parseInt(progress) || 0));
                                    updateTreatment(risk.id, treatment.id, { 
                                      progress: progressNum,
                                      status: progressNum === 100 ? 'Completed' : 
                                              progressNum > 0 ? 'In Progress' : treatment.status
                                    });
                                  }
                                }}
                              >
                                <TrendingUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteTreatment(risk.id, treatment.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Shield className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>No treatment actions defined for this risk</p>
                  <p className="text-sm">Click "Add Treatment" to create a treatment plan</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Treatment Modal */}
      {showTreatmentForm && selectedRisk && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add Treatment Action</CardTitle>
              <CardDescription>
                Create a treatment plan for: {selectedRisk.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Treatment Type</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newTreatment.type}
                    onChange={(e) => setNewTreatment({...newTreatment, type: e.target.value})}
                  >
                    {treatmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newTreatment.priority}
                    onChange={(e) => setNewTreatment({...newTreatment, priority: e.target.value})}
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <Textarea
                  value={newTreatment.description}
                  onChange={(e) => setNewTreatment({...newTreatment, description: e.target.value})}
                  placeholder="Describe the treatment action..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Owner</label>
                  <Input
                    value={newTreatment.owner}
                    onChange={(e) => setNewTreatment({...newTreatment, owner: e.target.value})}
                    placeholder="Treatment owner"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Target Date</label>
                  <Input
                    type="date"
                    value={newTreatment.targetDate}
                    onChange={(e) => setNewTreatment({...newTreatment, targetDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Estimated Cost</label>
                  <Input
                    value={newTreatment.cost}
                    onChange={(e) => setNewTreatment({...newTreatment, cost: e.target.value})}
                    placeholder="e.g., $5,000 or 20 hours"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newTreatment.status}
                    onChange={(e) => setNewTreatment({...newTreatment, status: e.target.value})}
                  >
                    {treatmentStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Resources Required</label>
                <Textarea
                  value={newTreatment.resources}
                  onChange={(e) => setNewTreatment({...newTreatment, resources: e.target.value})}
                  placeholder="Describe required resources, personnel, equipment..."
                  rows={2}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowTreatmentForm(false);
                    setSelectedRisk(null);
                    setNewTreatment({
                      type: 'Mitigate',
                      description: '',
                      owner: user?.name || '',
                      targetDate: '',
                      priority: 'Medium',
                      cost: '',
                      resources: '',
                      status: 'Planned'
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => addTreatment(selectedRisk.id)}
                  disabled={!newTreatment.description.trim()}
                >
                  Add Treatment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RiskTreatmentPlanning;
