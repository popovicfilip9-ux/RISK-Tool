import React, { useState, useContext } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useRisk } from '../contexts/RiskContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Wand2, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle, 
  AlertTriangle,
  FileText,
  Users,
  Settings,
  Target,
  Calendar,
  Building,
  Package,
  Truck,
  Shield,
  Zap
} from 'lucide-react';

const RiskAssessmentGenerator = () => {
  const { addRisk } = useRisk();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState({
    title: '',
    description: '',
    scope: '',
    team: [],
    category: '',
    process: '',
    riskTemplate: '',
    generatedRisks: []
  });

  const steps = [
    { id: 0, title: "Assessment Details", icon: <FileText className="h-5 w-5" /> },
    { id: 1, title: "Scope & Team", icon: <Users className="h-5 w-5" /> },
    { id: 2, title: "Risk Template", icon: <Settings className="h-5 w-5" /> },
    { id: 3, title: "Risk Generation", icon: <Wand2 className="h-5 w-5" /> },
    { id: 4, title: "Review & Create", icon: <CheckCircle className="h-5 w-5" /> }
  ];

  const riskTemplates = [
    {
      id: 'manufacturing',
      title: 'Manufacturing Process',
      icon: <Building className="h-6 w-6" />,
      description: 'Risks related to pharmaceutical manufacturing operations',
      risks: [
        {
          title: 'Equipment Failure During Production',
          category: 'Equipment',
          likelihood: 3,
          impact: 4,
          description: 'Critical manufacturing equipment fails during production run',
          causes: ['Mechanical wear', 'Electrical failure', 'Software malfunction', 'Poor maintenance'],
          effects: ['Production delays', 'Product quality issues', 'Batch rejection', 'Regulatory non-compliance'],
          controls: ['Preventive maintenance', 'Equipment monitoring', 'Backup systems', 'Operator training']
        },
        {
          title: 'Cross-Contamination Between Products',
          category: 'Quality',
          likelihood: 2,
          impact: 5,
          description: 'Contamination between different pharmaceutical products',
          causes: ['Inadequate cleaning', 'Shared equipment', 'Personnel error', 'Facility design'],
          effects: ['Product recall', 'Patient safety risk', 'Regulatory action', 'Brand damage'],
          controls: ['Cleaning validation', 'Dedicated equipment', 'Personnel training', 'Environmental monitoring']
        },
        {
          title: 'Raw Material Quality Deviation',
          category: 'Supply Chain',
          likelihood: 3,
          impact: 4,
          description: 'Incoming raw materials do not meet specifications',
          causes: ['Supplier quality issues', 'Transportation damage', 'Storage conditions', 'Testing errors'],
          effects: ['Production delays', 'Quality issues', 'Batch failure', 'Supply disruption'],
          controls: ['Supplier qualification', 'Incoming inspection', 'Storage controls', 'Testing protocols']
        }
      ]
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain',
      icon: <Truck className="h-6 w-6" />,
      description: 'Risks in pharmaceutical supply chain operations',
      risks: [
        {
          title: 'Cold Chain Temperature Excursion',
          category: 'Transportation',
          likelihood: 3,
          impact: 5,
          description: 'Temperature-sensitive products exposed to temperature outside specified range',
          causes: ['Equipment failure', 'Power outage', 'Human error', 'Extreme weather'],
          effects: ['Product degradation', 'Efficacy loss', 'Patient safety risk', 'Product recall'],
          controls: ['Temperature monitoring', 'Backup systems', 'Training', 'Contingency plans']
        },
        {
          title: 'Supplier Quality System Failure',
          category: 'Supply Chain',
          likelihood: 2,
          impact: 4,
          description: 'Key supplier fails to maintain adequate quality systems',
          causes: ['System breakdown', 'Personnel changes', 'Regulatory changes', 'Financial issues'],
          effects: ['Supply disruption', 'Quality issues', 'Regulatory non-compliance', 'Patient risk'],
          controls: ['Supplier audits', 'Quality agreements', 'Alternative suppliers', 'Monitoring systems']
        },
        {
          title: 'Counterfeit Product Infiltration',
          category: 'Security',
          likelihood: 2,
          impact: 5,
          description: 'Counterfeit products enter the legitimate supply chain',
          causes: ['Weak security', 'Complex supply chain', 'Inadequate verification', 'Criminal activity'],
          effects: ['Patient safety risk', 'Brand damage', 'Regulatory action', 'Legal liability'],
          controls: ['Serialization', 'Track and trace', 'Supplier verification', 'Security measures']
        }
      ]
    },
    {
      id: 'quality-system',
      title: 'Quality System',
      icon: <Shield className="h-6 w-6" />,
      description: 'Risks in pharmaceutical quality management systems',
      risks: [
        {
          title: 'Data Integrity Breach',
          category: 'Data Management',
          likelihood: 3,
          impact: 5,
          description: 'Compromise of data integrity in critical quality systems',
          causes: ['System vulnerabilities', 'Human error', 'Intentional manipulation', 'Inadequate controls'],
          effects: ['Regulatory action', 'Product recall', 'Loss of trust', 'Legal consequences'],
          controls: ['Access controls', 'Audit trails', 'Training', 'System validation']
        },
        {
          title: 'Deviation Investigation Delays',
          category: 'Quality',
          likelihood: 4,
          impact: 3,
          description: 'Delays in investigating and resolving quality deviations',
          causes: ['Resource constraints', 'Complex investigations', 'Poor prioritization', 'System limitations'],
          effects: ['Regulatory non-compliance', 'Repeat occurrences', 'Product quality risk', 'Audit findings'],
          controls: ['Resource planning', 'Investigation procedures', 'Tracking systems', 'Training']
        },
        {
          title: 'Change Control Process Failure',
          category: 'Change Management',
          likelihood: 3,
          impact: 4,
          description: 'Inadequate change control leading to unintended consequences',
          causes: ['Poor risk assessment', 'Inadequate review', 'Communication failure', 'System limitations'],
          effects: ['Product quality impact', 'Regulatory non-compliance', 'Process disruption', 'Safety risk'],
          controls: ['Change control procedures', 'Risk assessment', 'Cross-functional review', 'Training']
        }
      ]
    },
    {
      id: 'product-development',
      title: 'Product Development',
      icon: <Package className="h-6 w-6" />,
      description: 'Risks in pharmaceutical product development',
      risks: [
        {
          title: 'Clinical Trial Data Integrity Issues',
          category: 'Clinical',
          likelihood: 2,
          impact: 5,
          description: 'Compromise of clinical trial data integrity',
          causes: ['Protocol deviations', 'Data manipulation', 'System failures', 'Inadequate oversight'],
          effects: ['Regulatory rejection', 'Study delays', 'Patient safety risk', 'Legal consequences'],
          controls: ['Data monitoring', 'Audit procedures', 'Training', 'System validation']
        },
        {
          title: 'Formulation Stability Failure',
          category: 'Development',
          likelihood: 3,
          impact: 4,
          description: 'Product formulation fails stability testing requirements',
          causes: ['Formulation issues', 'Packaging problems', 'Storage conditions', 'Testing errors'],
          effects: ['Development delays', 'Reformulation needed', 'Regulatory delays', 'Increased costs'],
          controls: ['Stability protocols', 'Accelerated testing', 'Packaging studies', 'Environmental controls']
        },
        {
          title: 'Regulatory Submission Rejection',
          category: 'Regulatory',
          likelihood: 3,
          impact: 4,
          description: 'Regulatory authority rejects product submission',
          causes: ['Inadequate data', 'Regulatory changes', 'Quality issues', 'Submission errors'],
          effects: ['Launch delays', 'Additional studies', 'Increased costs', 'Competitive disadvantage'],
          controls: ['Regulatory strategy', 'Pre-submission meetings', 'Quality reviews', 'Expert consultation']
        }
      ]
    },
    {
      id: 'facility-equipment',
      title: 'Facility & Equipment',
      icon: <Zap className="h-6 w-6" />,
      description: 'Risks related to facilities and equipment',
      risks: [
        {
          title: 'HVAC System Failure',
          category: 'Facility',
          likelihood: 3,
          impact: 4,
          description: 'Heating, ventilation, and air conditioning system failure',
          causes: ['Equipment failure', 'Power outage', 'Maintenance issues', 'Design problems'],
          effects: ['Environmental excursions', 'Product quality impact', 'Production shutdown', 'Regulatory non-compliance'],
          controls: ['Preventive maintenance', 'Backup systems', 'Monitoring', 'Emergency procedures']
        },
        {
          title: 'Utility System Interruption',
          category: 'Utilities',
          likelihood: 2,
          impact: 4,
          description: 'Interruption of critical utilities (power, water, steam)',
          causes: ['External failures', 'Equipment breakdown', 'Maintenance activities', 'Natural disasters'],
          effects: ['Production shutdown', 'Product loss', 'Equipment damage', 'Safety risks'],
          controls: ['Backup systems', 'Emergency generators', 'Utility monitoring', 'Contingency plans']
        },
        {
          title: 'Cleanroom Contamination',
          category: 'Environment',
          likelihood: 2,
          impact: 5,
          description: 'Microbial or particulate contamination in cleanroom environment',
          causes: ['Personnel practices', 'Equipment failure', 'Facility breach', 'Maintenance activities'],
          effects: ['Product contamination', 'Batch rejection', 'Production shutdown', 'Regulatory action'],
          controls: ['Environmental monitoring', 'Personnel training', 'Facility maintenance', 'Contamination control']
        }
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTemplateSelect = (template) => {
    setAssessmentData({
      ...assessmentData,
      riskTemplate: template.id,
      generatedRisks: template.risks
    });
  };

  const handleGenerateRisks = () => {
    const selectedTemplate = riskTemplates.find(t => t.id === assessmentData.riskTemplate);
    if (selectedTemplate) {
      setAssessmentData({
        ...assessmentData,
        generatedRisks: selectedTemplate.risks
      });
      setCurrentStep(4);
    }
  };

  const handleCreateAssessment = () => {
    // Create individual risk entries
    assessmentData.generatedRisks.forEach((risk, index) => {
      const newRisk = {
        id: Date.now() + index,
        title: risk.title,
        description: risk.description,
        category: risk.category,
        likelihood: risk.likelihood,
        impact: risk.impact,
        riskScore: risk.likelihood * risk.impact,
        status: 'Open',
        owner: user.name,
        dateCreated: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        mitigationPlan: '',
        targetDate: '',
        causes: risk.causes,
        effects: risk.effects,
        controls: risk.controls,
        assessmentTitle: assessmentData.title,
        assessmentScope: assessmentData.scope
      };
      addRisk(newRisk);
    });

    // Reset form
    setAssessmentData({
      title: '',
      description: '',
      scope: '',
      team: [],
      category: '',
      process: '',
      riskTemplate: '',
      generatedRisks: []
    });
    setCurrentStep(0);
    
    alert(`Successfully created risk assessment with ${assessmentData.generatedRisks.length} risks!`);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Assessment Title *</label>
              <Input
                placeholder="Enter assessment title (e.g., Manufacturing Process Risk Assessment)"
                value={assessmentData.title}
                onChange={(e) => setAssessmentData({...assessmentData, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                placeholder="Describe the purpose and objectives of this risk assessment"
                value={assessmentData.description}
                onChange={(e) => setAssessmentData({...assessmentData, description: e.target.value})}
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Process/Area</label>
              <Input
                placeholder="Specify the process or area being assessed"
                value={assessmentData.process}
                onChange={(e) => setAssessmentData({...assessmentData, process: e.target.value})}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Assessment Scope *</label>
              <Textarea
                placeholder="Define the boundaries and scope of this risk assessment"
                value={assessmentData.scope}
                onChange={(e) => setAssessmentData({...assessmentData, scope: e.target.value})}
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Team Members</label>
              <Textarea
                placeholder="List team members and their roles (e.g., John Smith - Quality Manager, Jane Doe - Production Supervisor)"
                value={assessmentData.team.join('\n')}
                onChange={(e) => setAssessmentData({...assessmentData, team: e.target.value.split('\n').filter(t => t.trim())})}
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Risk Template</h3>
              <p className="text-gray-600 mb-6">Choose a template that best matches your assessment needs:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {riskTemplates.map((template) => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    assessmentData.riskTemplate === template.id 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-600">{template.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{template.risks.length} risk scenarios</Badge>
                      {assessmentData.riskTemplate === template.id && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        const selectedTemplate = riskTemplates.find(t => t.id === assessmentData.riskTemplate);
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Generated Risk Scenarios</h3>
              <p className="text-gray-600 mb-6">
                Based on your selected template: <strong>{selectedTemplate?.title}</strong>
              </p>
            </div>
            
            {selectedTemplate && (
              <div className="space-y-4">
                {selectedTemplate.risks.map((risk, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{risk.title}</CardTitle>
                          <CardDescription className="mt-1">{risk.description}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Badge variant="outline">{risk.category}</Badge>
                          <Badge 
                            className={`${
                              risk.likelihood * risk.impact >= 15 ? 'bg-red-100 text-red-800' :
                              risk.likelihood * risk.impact >= 10 ? 'bg-orange-100 text-orange-800' :
                              risk.likelihood * risk.impact >= 6 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}
                          >
                            Risk Score: {risk.likelihood * risk.impact}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h4 className="font-semibold text-red-700 mb-2">Potential Causes:</h4>
                          <ul className="space-y-1">
                            {risk.causes.map((cause, i) => (
                              <li key={i} className="flex items-start space-x-1">
                                <span className="text-red-500 mt-1">•</span>
                                <span>{cause}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-orange-700 mb-2">Potential Effects:</h4>
                          <ul className="space-y-1">
                            {risk.effects.map((effect, i) => (
                              <li key={i} className="flex items-start space-x-1">
                                <span className="text-orange-500 mt-1">•</span>
                                <span>{effect}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-700 mb-2">Current Controls:</h4>
                          <ul className="space-y-1">
                            {risk.controls.map((control, i) => (
                              <li key={i} className="flex items-start space-x-1">
                                <span className="text-green-500 mt-1">•</span>
                                <span>{control}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Wand2 className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Ready to Generate</span>
              </div>
              <p className="text-blue-700 text-sm">
                {selectedTemplate?.risks.length} risk scenarios will be created based on your template selection.
                You can modify and customize these risks after creation.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Assessment Ready</h3>
              <p className="text-gray-600">Review your assessment details before creating</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Assessment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">Title:</span>
                    <p className="text-gray-700">{assessmentData.title}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Process/Area:</span>
                    <p className="text-gray-700">{assessmentData.process}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-semibold">Scope:</span>
                    <p className="text-gray-700">{assessmentData.scope}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Template Used:</span>
                    <p className="text-gray-700">
                      {riskTemplates.find(t => t.id === assessmentData.riskTemplate)?.title}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold">Risks Generated:</span>
                    <p className="text-gray-700">{assessmentData.generatedRisks.length} risk scenarios</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-900">What happens next?</span>
              </div>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• {assessmentData.generatedRisks.length} individual risk entries will be created</li>
                <li>• Each risk will be available in the Risk Management section</li>
                <li>• You can customize, update, and manage each risk individually</li>
                <li>• Mitigation plans and actions can be assigned to team members</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Wand2 className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Assessment Generator</h1>
          <p className="text-gray-600">Create comprehensive risk assessments using guided templates</p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  index <= currentStep 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="ml-3 hidden md:block">
                  <div className={`text-sm font-medium ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block w-16 h-0.5 ml-4 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-96">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {currentStep === 3 && (
                <Button onClick={handleGenerateRisks} disabled={!assessmentData.riskTemplate}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Risks
                </Button>
              )}
              
              {currentStep === 4 ? (
                <Button onClick={handleCreateAssessment} disabled={!assessmentData.title}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Create Assessment
                </Button>
              ) : currentStep < 3 ? (
                <Button onClick={handleNext} disabled={
                  (currentStep === 0 && !assessmentData.title) ||
                  (currentStep === 1 && !assessmentData.scope) ||
                  (currentStep === 2 && !assessmentData.riskTemplate)
                }>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentGenerator;
