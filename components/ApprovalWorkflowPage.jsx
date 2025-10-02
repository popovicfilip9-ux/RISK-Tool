import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  FileText, 
  Users, 
  Send, 
  Eye, 
  Edit3, 
  MessageSquare,
  AlertTriangle,
  Calendar,
  User,
  CheckSquare,
  ArrowRight,
  Download,
  Upload
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ApprovalWorkflowPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pending');
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showSignDialog, setShowSignDialog] = useState(false);
  const [signatureData, setSignatureData] = useState({ comments: '', decision: '' });

  // Mock data for demonstration
  useEffect(() => {
    const mockWorkflows = [
      {
        id: 1,
        title: 'Manufacturing Process Risk Assessment - Line 3',
        type: 'Risk Assessment',
        status: 'pending_approval',
        priority: 'high',
        created: '2024-09-28',
        deadline: '2024-10-05',
        creator: 'John Smith',
        currentApprover: 'Quality Manager',
        approvalSteps: [
          { 
            id: 1, 
            role: 'Quality Assurance Lead', 
            user: 'Sarah Johnson', 
            status: 'approved', 
            date: '2024-09-29',
            comments: 'Risk assessment methodology is sound. Approved for next level review.',
            signature: 'SJ_20240929_143022'
          },
          { 
            id: 2, 
            role: 'Quality Manager', 
            user: 'Michael Chen', 
            status: 'pending', 
            date: null,
            comments: '',
            signature: null
          },
          { 
            id: 3, 
            role: 'Site Manager', 
            user: 'Lisa Rodriguez', 
            status: 'waiting', 
            date: null,
            comments: '',
            signature: null
          }
        ],
        documents: [
          { name: 'Risk_Assessment_Line3_v2.1.pdf', size: '2.4 MB', type: 'PDF' },
          { name: 'FMEA_Analysis_Line3.xlsx', size: '1.8 MB', type: 'Excel' }
        ],
        description: 'Comprehensive risk assessment for manufacturing line 3 following equipment upgrade and process modifications.'
      },
      {
        id: 2,
        title: 'Supplier Qualification - API Vendor',
        type: 'Supplier Assessment',
        status: 'approved',
        priority: 'medium',
        created: '2024-09-25',
        deadline: '2024-10-02',
        creator: 'Emma Wilson',
        currentApprover: 'Completed',
        approvalSteps: [
          { 
            id: 1, 
            role: 'Procurement Lead', 
            user: 'David Kim', 
            status: 'approved', 
            date: '2024-09-26',
            comments: 'Supplier documentation complete and satisfactory.',
            signature: 'DK_20240926_091534'
          },
          { 
            id: 2, 
            role: 'Quality Manager', 
            user: 'Michael Chen', 
            status: 'approved', 
            date: '2024-09-27',
            comments: 'Quality systems audit results acceptable. Approved for qualification.',
            signature: 'MC_20240927_154412'
          }
        ],
        documents: [
          { name: 'Supplier_Audit_Report.pdf', size: '3.1 MB', type: 'PDF' },
          { name: 'Quality_Agreement.pdf', size: '1.2 MB', type: 'PDF' }
        ],
        description: 'Qualification assessment for new API supplier including quality system evaluation and risk analysis.'
      },
      {
        id: 3,
        title: 'Change Control - Temperature Monitoring System',
        type: 'Change Control',
        status: 'rejected',
        priority: 'high',
        created: '2024-09-20',
        deadline: '2024-09-30',
        creator: 'Robert Taylor',
        currentApprover: 'Rejected',
        approvalSteps: [
          { 
            id: 1, 
            role: 'Engineering Lead', 
            user: 'Amanda Foster', 
            status: 'approved', 
            date: '2024-09-22',
            comments: 'Technical specifications reviewed and approved.',
            signature: 'AF_20240922_103045'
          },
          { 
            id: 2, 
            role: 'Validation Manager', 
            user: 'James Wilson', 
            status: 'rejected', 
            date: '2024-09-24',
            comments: 'Insufficient validation protocol. Additional testing requirements needed before implementation.',
            signature: 'JW_20240924_161230'
          }
        ],
        documents: [
          { name: 'Change_Control_Form_CC2024-089.pdf', size: '1.5 MB', type: 'PDF' },
          { name: 'Technical_Specifications.docx', size: '890 KB', type: 'Word' }
        ],
        description: 'Implementation of upgraded temperature monitoring system for cold storage areas.'
      }
    ];
    setWorkflows(mockWorkflows);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStepStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'waiting': return <Clock className="h-5 w-5 text-gray-400" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleSignDocument = (workflow, decision) => {
    setSelectedWorkflow(workflow);
    setSignatureData({ ...signatureData, decision });
    setShowSignDialog(true);
  };

  const submitSignature = () => {
    // In a real application, this would submit to the backend
    console.log('Submitting signature:', {
      workflowId: selectedWorkflow.id,
      decision: signatureData.decision,
      comments: signatureData.comments,
      user: user.name,
      timestamp: new Date().toISOString()
    });
    
    setShowSignDialog(false);
    setSignatureData({ comments: '', decision: '' });
    
    // Update workflow status (mock update)
    const updatedWorkflows = workflows.map(w => {
      if (w.id === selectedWorkflow.id) {
        const currentStepIndex = w.approvalSteps.findIndex(step => step.status === 'pending');
        if (currentStepIndex !== -1) {
          w.approvalSteps[currentStepIndex] = {
            ...w.approvalSteps[currentStepIndex],
            status: signatureData.decision,
            date: new Date().toISOString().split('T')[0],
            comments: signatureData.comments,
            signature: `${user.name.split(' ').map(n => n[0]).join('')}_${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}`
          };
          
          // Move to next step if approved
          if (signatureData.decision === 'approved' && currentStepIndex < w.approvalSteps.length - 1) {
            w.approvalSteps[currentStepIndex + 1].status = 'pending';
          } else if (signatureData.decision === 'approved') {
            w.status = 'approved';
            w.currentApprover = 'Completed';
          } else if (signatureData.decision === 'rejected') {
            w.status = 'rejected';
            w.currentApprover = 'Rejected';
          }
        }
      }
      return w;
    });
    setWorkflows(updatedWorkflows);
  };

  const filteredWorkflows = workflows.filter(workflow => {
    switch (activeTab) {
      case 'pending': return workflow.status === 'pending_approval';
      case 'approved': return workflow.status === 'approved';
      case 'rejected': return workflow.status === 'rejected';
      case 'my_items': return workflow.creator === user.name || 
        workflow.approvalSteps.some(step => step.user === user.name);
      default: return true;
    }
  });

  const CreateWorkflowDialog = () => (
    <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Approval Workflow</DialogTitle>
          <DialogDescription>
            Set up a new document or assessment for approval workflow
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="workflow-title">Title</Label>
            <Input id="workflow-title" placeholder="Enter workflow title" />
          </div>
          <div>
            <Label htmlFor="workflow-type">Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select workflow type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="risk_assessment">Risk Assessment</SelectItem>
                <SelectItem value="change_control">Change Control</SelectItem>
                <SelectItem value="supplier_assessment">Supplier Assessment</SelectItem>
                <SelectItem value="deviation">Deviation Investigation</SelectItem>
                <SelectItem value="capa">CAPA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="workflow-priority">Priority</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="workflow-deadline">Deadline</Label>
            <Input id="workflow-deadline" type="date" />
          </div>
          <div>
            <Label htmlFor="workflow-description">Description</Label>
            <Textarea 
              id="workflow-description" 
              placeholder="Describe the workflow purpose and requirements"
              rows={3}
            />
          </div>
          <div>
            <Label>Approval Steps</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">1.</span>
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select first approver role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qa_lead">Quality Assurance Lead</SelectItem>
                    <SelectItem value="quality_manager">Quality Manager</SelectItem>
                    <SelectItem value="site_manager">Site Manager</SelectItem>
                    <SelectItem value="regulatory_affairs">Regulatory Affairs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">2.</span>
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select second approver role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qa_lead">Quality Assurance Lead</SelectItem>
                    <SelectItem value="quality_manager">Quality Manager</SelectItem>
                    <SelectItem value="site_manager">Site Manager</SelectItem>
                    <SelectItem value="regulatory_affairs">Regulatory Affairs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowCreateDialog(false)}>
              Create Workflow
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const SignatureDialog = () => (
    <Dialog open={showSignDialog} onOpenChange={setShowSignDialog}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {signatureData.decision === 'approved' ? 'Approve' : 'Reject'} Document
          </DialogTitle>
          <DialogDescription>
            {selectedWorkflow?.title}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="signature-comments">Comments</Label>
            <Textarea 
              id="signature-comments"
              value={signatureData.comments}
              onChange={(e) => setSignatureData({...signatureData, comments: e.target.value})}
              placeholder={`Enter your ${signatureData.decision === 'approved' ? 'approval' : 'rejection'} comments...`}
              rows={4}
            />
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">Digital Signature Details:</div>
            <div className="text-sm font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">{user.role}</div>
            <div className="text-sm text-gray-500">{new Date().toLocaleString()}</div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowSignDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={submitSignature}
              className={signatureData.decision === 'approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
            >
              {signatureData.decision === 'approved' ? 'Approve' : 'Reject'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Approval Workflows</h1>
          <p className="text-gray-600 mt-1">Manage document approvals and digital signatures</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <FileText className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="my_items">My Items</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid gap-4">
            {filteredWorkflows.map((workflow) => (
              <Card key={workflow.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{workflow.title}</CardTitle>
                      <CardDescription>{workflow.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getPriorityColor(workflow.priority)}>
                        {workflow.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(workflow.status)}>
                        {workflow.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Workflow Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Type:</span>
                        <div className="font-medium">{workflow.type}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Creator:</span>
                        <div className="font-medium">{workflow.creator}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Created:</span>
                        <div className="font-medium">{workflow.created}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Deadline:</span>
                        <div className="font-medium">{workflow.deadline}</div>
                      </div>
                    </div>

                    {/* Approval Steps */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Approval Progress</h4>
                      <div className="space-y-2">
                        {workflow.approvalSteps.map((step, index) => (
                          <div key={step.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                            {getStepStatusIcon(step.status)}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{step.role}</span>
                                <span className="text-gray-500">-</span>
                                <span className="text-gray-700">{step.user}</span>
                              </div>
                              {step.comments && (
                                <div className="text-sm text-gray-600 mt-1">{step.comments}</div>
                              )}
                              {step.date && (
                                <div className="text-xs text-gray-500 mt-1">
                                  Signed: {step.date} | Signature: {step.signature}
                                </div>
                              )}
                            </div>
                            {step.status === 'pending' && step.user === user.name && (
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-green-600 border-green-600 hover:bg-green-50"
                                  onClick={() => handleSignDocument(workflow, 'approved')}
                                >
                                  <CheckSquare className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                  onClick={() => handleSignDocument(workflow, 'rejected')}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Documents */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Documents</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {workflow.documents.map((doc, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <div className="flex-1">
                              <div className="text-sm font-medium">{doc.name}</div>
                              <div className="text-xs text-gray-500">{doc.size} • {doc.type}</div>
                            </div>
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-2 pt-2 border-t">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Comments
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredWorkflows.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No workflows found</h3>
                <p className="text-gray-500">
                  {activeTab === 'pending' && "No pending approvals at this time."}
                  {activeTab === 'approved' && "No approved workflows to display."}
                  {activeTab === 'rejected' && "No rejected workflows to display."}
                  {activeTab === 'my_items' && "You don't have any workflows assigned."}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <CreateWorkflowDialog />
      <SignatureDialog />
    </div>
  );
};

export default ApprovalWorkflowPage;
