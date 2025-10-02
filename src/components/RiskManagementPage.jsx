import React, { useState } from 'react';
import { useRisk } from '../contexts/RiskContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';

const RiskManagementPage = () => {
  const { risks, addRisk, updateRisk, deleteRisk } = useRisk();
  const { hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRisk, setEditingRisk] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    riskName: '',
    description: '',
    category: '',
    likelihood: 1,
    impact: 1,
    mitigationStatus: 'not_started',
    regulatoryReference: ''
  });

  const categories = ['Temperature Control', 'Packaging', 'Documentation', 'Storage Conditions', 'Security', 'Transportation', 'Quality Control'];
  const mitigationStatuses = [
    { value: 'not_started', label: 'Not Started', color: 'bg-red-100 text-red-800' },
    { value: 'in_progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' }
  ];

  const filteredRisks = risks.filter(risk => {
    const matchesSearch = risk.riskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || risk.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || risk.mitigationStatus === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const resetForm = () => {
    setFormData({
      riskName: '',
      description: '',
      category: '',
      likelihood: 1,
      impact: 1,
      mitigationStatus: 'not_started',
      regulatoryReference: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingRisk) {
      updateRisk(editingRisk.riskId, formData);
      setEditingRisk(null);
    } else {
      addRisk(formData);
      setIsAddDialogOpen(false);
    }
    
    resetForm();
  };

  const handleEdit = (risk) => {
    setFormData({
      riskName: risk.riskName,
      description: risk.description,
      category: risk.category,
      likelihood: risk.likelihood,
      impact: risk.impact,
      mitigationStatus: risk.mitigationStatus,
      regulatoryReference: risk.regulatoryReference
    });
    setEditingRisk(risk);
  };

  const handleDelete = (riskId) => {
    deleteRisk(riskId);
  };

  const getRiskScoreColor = (score) => {
    if (score >= 15) return 'bg-red-100 text-red-800';
    if (score >= 9) return 'bg-orange-100 text-orange-800';
    if (score >= 5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const canEdit = hasPermission('assessor');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Management</h1>
          <p className="text-gray-600 mt-2">Manage and assess pharmaceutical transportation risks</p>
        </div>
        
        {canEdit && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Risk
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Risk</DialogTitle>
                <DialogDescription>
                  Create a new risk assessment entry for pharmaceutical transportation.
                </DialogDescription>
              </DialogHeader>
              <RiskForm 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={handleSubmit}
                categories={categories}
                mitigationStatuses={mitigationStatuses}
                isEditing={false}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-64">
              <Label htmlFor="search">Search Risks</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="min-w-48">
              <Label>Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="min-w-48">
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {mitigationStatuses.map(status => (
                    <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Table */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Overview</CardTitle>
          <CardDescription>
            {filteredRisks.length} risk{filteredRisks.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Likelihood</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                {canEdit && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRisks.map((risk) => (
                <TableRow key={risk.riskId}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{risk.riskName}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {risk.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{risk.category}</Badge>
                  </TableCell>
                  <TableCell>{risk.likelihood}</TableCell>
                  <TableCell>{risk.impact}</TableCell>
                  <TableCell>
                    <Badge className={getRiskScoreColor(risk.riskScore)}>
                      {risk.riskScore}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={mitigationStatuses.find(s => s.value === risk.mitigationStatus)?.color}>
                      {mitigationStatuses.find(s => s.value === risk.mitigationStatus)?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(risk.updatedAt).toLocaleDateString()}
                  </TableCell>
                  {canEdit && (
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(risk)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Risk</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{risk.riskName}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(risk.riskId)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {editingRisk && (
        <Dialog open={!!editingRisk} onOpenChange={() => setEditingRisk(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Risk</DialogTitle>
              <DialogDescription>
                Update the risk assessment details.
              </DialogDescription>
            </DialogHeader>
            <RiskForm 
              formData={formData} 
              setFormData={setFormData} 
              onSubmit={handleSubmit}
              categories={categories}
              mitigationStatuses={mitigationStatuses}
              isEditing={true}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Risk Form Component
const RiskForm = ({ formData, setFormData, onSubmit, categories, mitigationStatuses, isEditing }) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="riskName">Risk Name *</Label>
          <Input
            id="riskName"
            value={formData.riskName}
            onChange={(e) => handleInputChange('riskName', e.target.value)}
            required
          />
        </div>
        
        <div className="col-span-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            required
          />
        </div>
        
        <div>
          <Label>Category *</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Mitigation Status</Label>
          <Select value={formData.mitigationStatus} onValueChange={(value) => handleInputChange('mitigationStatus', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mitigationStatuses.map(status => (
                <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="likelihood">Likelihood (1-5) *</Label>
          <Select value={formData.likelihood.toString()} onValueChange={(value) => handleInputChange('likelihood', parseInt(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map(num => (
                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="impact">Impact (1-5) *</Label>
          <Select value={formData.impact.toString()} onValueChange={(value) => handleInputChange('impact', parseInt(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map(num => (
                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="col-span-2">
          <Label htmlFor="regulatoryReference">Regulatory Reference ID</Label>
          <Input
            id="regulatoryReference"
            value={formData.regulatoryReference}
            onChange={(e) => handleInputChange('regulatoryReference', e.target.value)}
            placeholder="e.g., EU GDP 5.2.1"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit">
          {isEditing ? 'Update Risk' : 'Add Risk'}
        </Button>
      </div>
    </form>
  );
};

export default RiskManagementPage;
