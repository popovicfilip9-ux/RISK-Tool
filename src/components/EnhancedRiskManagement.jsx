import React, { useState, useContext } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { RiskContext } from '../contexts/RiskContext';
import { AuthContext } from '../contexts/AuthContext';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  FileText,
  Download,
  Users,
  Calendar,
  Target,
  TrendingUp,
  Shield,
  AlertCircle,
  UserCheck,
  FileSpreadsheet,
  FileDown,
  Send,
  Eye,
  MessageSquare
} from 'lucide-react';

const EnhancedRiskManagement = () => {
  const { risks, addRisk, updateRisk, deleteRisk } = useContext(RiskContext);
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedApprovalStatus, setSelectedApprovalStatus] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRisk, setEditingRisk] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedRiskForApproval, setSelectedRiskForApproval] = useState(null);

  const [newRisk, setNewRisk] = useState({
    title: '',
    description: '',
    category: 'Quality',
    likelihood: 1,
    impact: 1,
    status: 'Open',
    owner: user?.name || '',
    mitigationPlan: '',
    targetDate: '',
    causes: [],
    effects: [],
    controls: [],
    approvalStatus: 'Draft',
    approvers: [],
    comments: []
  });

  const categories = ['All', 'Quality', 'Safety', 'Regulatory', 'Operational', 'Financial', 'Technical', 'Environmental', 'Supply Chain', 'Equipment', 'Transportation', 'Data Management', 'Clinical', 'Development', 'Facility', 'Utilities', 'Security', 'Change Management'];
  const statuses = ['All', 'Open', 'In Progress', 'Closed', 'On Hold'];
  const approvalStatuses = ['All', 'Draft', 'Pending Review', 'Under Review', 'Approved', 'Rejected', 'Requires Changes'];

  const approvalWorkflow = [
    { role: 'Quality Manager', required: true },
    { role: 'Department Head', required: true },
    { role: 'Risk Manager', required: false },
    { role: 'Regulatory Affairs', required: false }
  ];

  const filteredRisks = risks.filter(risk => {
    const matchesSearch = risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || risk.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || risk.status === selectedStatus;
    const matchesApproval = selectedApprovalStatus === 'All' || risk.approvalStatus === selectedApprovalStatus;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesApproval;
  });

  const handleAddRisk = () => {
    const risk = {
      ...newRisk,
      id: Date.now(),
      riskScore: newRisk.likelihood * newRisk.impact,
      dateCreated: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      approvalStatus: 'Draft',
      approvers: [],
      comments: []
    };
    addRisk(risk);
    setNewRisk({
      title: '',
      description: '',
      category: 'Quality',
      likelihood: 1,
      impact: 1,
      status: 'Open',
      owner: user?.name || '',
      mitigationPlan: '',
      targetDate: '',
      causes: [],
      effects: [],
      controls: [],
      approvalStatus: 'Draft',
      approvers: [],
      comments: []
    });
    setShowAddForm(false);
  };

  const handleUpdateRisk = () => {
    const updatedRisk = {
      ...editingRisk,
      riskScore: editingRisk.likelihood * editingRisk.impact,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    updateRisk(updatedRisk);
    setEditingRisk(null);
  };

  const handleSubmitForApproval = (riskId) => {
    const risk = risks.find(r => r.id === riskId);
    if (risk) {
      const updatedRisk = {
        ...risk,
        approvalStatus: 'Pending Review',
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      updateRisk(updatedRisk);
    }
  };

  const handleApproval = (riskId, action, comment = '') => {
    const risk = risks.find(r => r.id === riskId);
    if (risk) {
      const newApprover = {
        name: user.name,
        role: user.role,
        action: action,
        comment: comment,
        date: new Date().toISOString().split('T')[0]
      };

      let newStatus = risk.approvalStatus;
      if (action === 'approve') {
        // Check if all required approvers have approved
        const requiredApprovers = approvalWorkflow.filter(a => a.required);
        const currentApprovers = [...(risk.approvers || []), newApprover];
        const approvedByRequired = requiredApprovers.every(req => 
          currentApprovers.some(app => app.role === req.role && app.action === 'approve')
        );
        newStatus = approvedByRequired ? 'Approved' : 'Under Review';
      } else if (action === 'reject') {
        newStatus = 'Rejected';
      } else if (action === 'request_changes') {
        newStatus = 'Requires Changes';
      }

      const updatedRisk = {
        ...risk,
        approvalStatus: newStatus,
        approvers: [...(risk.approvers || []), newApprover],
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      updateRisk(updatedRisk);
    }
    setShowApprovalModal(false);
    setSelectedRiskForApproval(null);
  };

  const exportToExcel = () => {
    const headers = ['ID', 'Title', 'Category', 'Risk Score', 'Status', 'Approval Status', 'Owner', 'Date Created', 'Target Date'];
    const csvContent = [
      headers.join(','),
      ...filteredRisks.map(risk => [
        risk.id,
        `"${risk.title}"`,
        risk.category,
        risk.riskScore,
        risk.status,
        risk.approvalStatus || 'Draft',
        `"${risk.owner}"`,
        risk.dateCreated,
        risk.targetDate || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `risk_assessment_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    // Create a simple HTML content for PDF export
    const htmlContent = `
      <html>
        <head>
          <title>Risk Assessment Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .risk { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; }
            .risk-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
            .risk-meta { display: flex; gap: 15px; margin-bottom: 10px; }
            .badge { padding: 2px 8px; border-radius: 4px; font-size: 12px; }
            .high-risk { background-color: #fee2e2; color: #991b1b; }
            .medium-risk { background-color: #fef3c7; color: #92400e; }
            .low-risk { background-color: #dcfce7; color: #166534; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Risk Assessment Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <p>Total Risks: ${filteredRisks.length}</p>
          </div>
          ${filteredRisks.map(risk => `
            <div class="risk">
              <div class="risk-title">${risk.title}</div>
              <div class="risk-meta">
                <span class="badge">${risk.category}</span>
                <span class="badge ${risk.riskScore >= 15 ? 'high-risk' : risk.riskScore >= 10 ? 'medium-risk' : 'low-risk'}">
                  Risk Score: ${risk.riskScore}
                </span>
                <span class="badge">${risk.status}</span>
                <span class="badge">${risk.approvalStatus || 'Draft'}</span>
              </div>
              <p><strong>Description:</strong> ${risk.description}</p>
              <p><strong>Owner:</strong> ${risk.owner}</p>
              <p><strong>Date Created:</strong> ${risk.dateCreated}</p>
              ${risk.mitigationPlan ? `<p><strong>Mitigation Plan:</strong> ${risk.mitigationPlan}</p>` : ''}
            </div>
          `).join('')}
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  const getRiskScoreColor = (score) => {
    if (score >= 15) return 'bg-red-100 text-red-800 border-red-200';
    if (score >= 10) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getApprovalStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Requires Changes': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canUserApprove = (risk) => {
    if (!risk.approvers) return true;
    return !risk.approvers.some(approver => approver.name === user.name);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Enhanced Risk Management</h1>
            <p className="text-gray-600">Comprehensive risk assessment with approval workflow</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportToExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
          <Button variant="outline" onClick={exportToPDF}>
            <FileDown className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Risk
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{risks.length}</div>
                <div className="text-sm text-gray-600">Total Risks</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {risks.filter(r => r.riskScore >= 15).length}
                </div>
                <div className="text-sm text-gray-600">High Risk</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {risks.filter(r => r.approvalStatus === 'Pending Review' || r.approvalStatus === 'Under Review').length}
                </div>
                <div className="text-sm text-gray-600">Pending Approval</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {risks.filter(r => r.approvalStatus === 'Approved').length}
                </div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {risks.filter(r => r.status === 'Closed').length}
                </div>
                <div className="text-sm text-gray-600">Closed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search risks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={selectedApprovalStatus}
              onChange={(e) => setSelectedApprovalStatus(e.target.value)}
            >
              {approvalStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <div className="text-sm text-gray-600 flex items-center">
              Showing {filteredRisks.length} of {risks.length} risks
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredRisks.map((risk) => (
          <Card key={risk.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{risk.title}</CardTitle>
                  <CardDescription className="mt-1">{risk.description}</CardDescription>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <div className="flex space-x-2">
                    <Badge variant="outline">{risk.category}</Badge>
                    <Badge className={getRiskScoreColor(risk.riskScore)}>
                      Risk Score: {risk.riskScore}
                    </Badge>
                    <Badge variant="outline">{risk.status}</Badge>
                    <Badge className={getApprovalStatusColor(risk.approvalStatus || 'Draft')}>
                      {risk.approvalStatus || 'Draft'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Owner:</span>
                  <p className="text-sm">{risk.owner}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Created:</span>
                  <p className="text-sm">{risk.dateCreated}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Target Date:</span>
                  <p className="text-sm">{risk.targetDate || 'Not set'}</p>
                </div>
              </div>

              {risk.mitigationPlan && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-600">Mitigation Plan:</span>
                  <p className="text-sm mt-1">{risk.mitigationPlan}</p>
                </div>
              )}

              {/* Approval Status */}
              {risk.approvers && risk.approvers.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-600">Approvals:</span>
                  <div className="mt-2 space-y-1">
                    {risk.approvers.map((approver, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <UserCheck className="h-4 w-4 text-green-600" />
                        <span>{approver.name} ({approver.role})</span>
                        <Badge variant="outline" className={
                          approver.action === 'approve' ? 'text-green-700' :
                          approver.action === 'reject' ? 'text-red-700' : 'text-orange-700'
                        }>
                          {approver.action}
                        </Badge>
                        <span className="text-gray-500">{approver.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingRisk(risk)}
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  
                  {(risk.approvalStatus === 'Draft' || risk.approvalStatus === 'Requires Changes') && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSubmitForApproval(risk.id)}
                    >
                      <Send className="mr-1 h-3 w-3" />
                      Submit for Approval
                    </Button>
                  )}

                  {(risk.approvalStatus === 'Pending Review' || risk.approvalStatus === 'Under Review') && 
                   canUserApprove(risk) && user.role !== 'Viewer' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRiskForApproval(risk);
                        setShowApprovalModal(true);
                      }}
                    >
                      <UserCheck className="mr-1 h-3 w-3" />
                      Review
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteRisk(risk.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                </div>

                <div className="text-xs text-gray-500">
                  Last updated: {risk.lastUpdated}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Risk Modal */}
      {(showAddForm || editingRisk) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingRisk ? 'Edit Risk' : 'Add New Risk'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <Input
                  value={editingRisk ? editingRisk.title : newRisk.title}
                  onChange={(e) => editingRisk 
                    ? setEditingRisk({...editingRisk, title: e.target.value})
                    : setNewRisk({...newRisk, title: e.target.value})
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={editingRisk ? editingRisk.description : newRisk.description}
                  onChange={(e) => editingRisk 
                    ? setEditingRisk({...editingRisk, description: e.target.value})
                    : setNewRisk({...newRisk, description: e.target.value})
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={editingRisk ? editingRisk.category : newRisk.category}
                    onChange={(e) => editingRisk 
                      ? setEditingRisk({...editingRisk, category: e.target.value})
                      : setNewRisk({...newRisk, category: e.target.value})
                    }
                  >
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={editingRisk ? editingRisk.status : newRisk.status}
                    onChange={(e) => editingRisk 
                      ? setEditingRisk({...editingRisk, status: e.target.value})
                      : setNewRisk({...newRisk, status: e.target.value})
                    }
                  >
                    {statuses.slice(1).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Likelihood (1-5)</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={editingRisk ? editingRisk.likelihood : newRisk.likelihood}
                    onChange={(e) => editingRisk 
                      ? setEditingRisk({...editingRisk, likelihood: parseInt(e.target.value)})
                      : setNewRisk({...newRisk, likelihood: parseInt(e.target.value)})
                    }
                  >
                    {[1,2,3,4,5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Impact (1-5)</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={editingRisk ? editingRisk.impact : newRisk.impact}
                    onChange={(e) => editingRisk 
                      ? setEditingRisk({...editingRisk, impact: parseInt(e.target.value)})
                      : setNewRisk({...newRisk, impact: parseInt(e.target.value)})
                    }
                  >
                    {[1,2,3,4,5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Mitigation Plan</label>
                <Textarea
                  value={editingRisk ? editingRisk.mitigationPlan : newRisk.mitigationPlan}
                  onChange={(e) => editingRisk 
                    ? setEditingRisk({...editingRisk, mitigationPlan: e.target.value})
                    : setNewRisk({...newRisk, mitigationPlan: e.target.value})
                  }
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Target Date</label>
                <Input
                  type="date"
                  value={editingRisk ? editingRisk.targetDate : newRisk.targetDate}
                  onChange={(e) => editingRisk 
                    ? setEditingRisk({...editingRisk, targetDate: e.target.value})
                    : setNewRisk({...newRisk, targetDate: e.target.value})
                  }
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingRisk(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={editingRisk ? handleUpdateRisk : handleAddRisk}>
                  {editingRisk ? 'Update' : 'Add'} Risk
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Approval Modal */}
      {showApprovalModal && selectedRiskForApproval && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Review Risk Assessment</CardTitle>
              <CardDescription>
                {selectedRiskForApproval.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Comment (Optional)</label>
                <Textarea
                  placeholder="Add your review comments..."
                  rows={3}
                  id="approval-comment"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowApprovalModal(false);
                    setSelectedRiskForApproval(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const comment = document.getElementById('approval-comment').value;
                    handleApproval(selectedRiskForApproval.id, 'request_changes', comment);
                  }}
                  className="text-orange-600 hover:text-orange-700"
                >
                  Request Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const comment = document.getElementById('approval-comment').value;
                    handleApproval(selectedRiskForApproval.id, 'reject', comment);
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  Reject
                </Button>
                <Button
                  onClick={() => {
                    const comment = document.getElementById('approval-comment').value;
                    handleApproval(selectedRiskForApproval.id, 'approve', comment);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Approve
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnhancedRiskManagement;
