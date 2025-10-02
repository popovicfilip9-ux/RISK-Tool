import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileText, 
  AlertTriangle, 
  Calculator, 
  CheckCircle, 
  ArrowRight,
  Info,
  Target,
  TrendingUp,
  Users,
  BookOpen
} from 'lucide-react';

const FMEAOverviewPage = () => {
  const [selectedStep, setSelectedStep] = useState(0);

  const fmeaSteps = [
    {
      id: 1,
      title: "Define Scope & Team",
      description: "Establish the boundaries of analysis and assemble cross-functional team",
      icon: <Users className="h-5 w-5" />,
      details: [
        "Define process/product boundaries",
        "Assemble multidisciplinary team",
        "Assign roles and responsibilities",
        "Set timeline and objectives"
      ]
    },
    {
      id: 2,
      title: "Process Mapping",
      description: "Create detailed process flow diagram",
      icon: <FileText className="h-5 w-5" />,
      details: [
        "Map process steps sequentially",
        "Identify inputs and outputs",
        "Document process parameters",
        "Validate with stakeholders"
      ]
    },
    {
      id: 3,
      title: "Failure Mode Identification",
      description: "Identify potential ways each step could fail",
      icon: <AlertTriangle className="h-5 w-5" />,
      details: [
        "Brainstorm potential failures",
        "Consider all failure modes",
        "Use historical data",
        "Apply systematic thinking"
      ]
    },
    {
      id: 4,
      title: "Effects Analysis",
      description: "Determine consequences of each failure mode",
      icon: <TrendingUp className="h-5 w-5" />,
      details: [
        "Identify immediate effects",
        "Trace downstream impacts",
        "Consider patient safety",
        "Evaluate regulatory implications"
      ]
    },
    {
      id: 5,
      title: "Cause Analysis",
      description: "Identify root causes of failure modes",
      icon: <Target className="h-5 w-5" />,
      details: [
        "Use root cause analysis tools",
        "Consider human factors",
        "Evaluate equipment issues",
        "Assess environmental factors"
      ]
    },
    {
      id: 6,
      title: "Risk Assessment",
      description: "Evaluate severity, occurrence, and detection",
      icon: <Calculator className="h-5 w-5" />,
      details: [
        "Rate Severity (1-10)",
        "Rate Occurrence (1-10)",
        "Rate Detection (1-10)",
        "Calculate RPN (S × O × D)"
      ]
    },
    {
      id: 7,
      title: "Risk Treatment",
      description: "Develop and implement risk mitigation actions",
      icon: <CheckCircle className="h-5 w-5" />,
      details: [
        "Prioritize high RPN items",
        "Develop action plans",
        "Assign responsibilities",
        "Set target dates"
      ]
    }
  ];

  const rpnCalculator = {
    severity: [
      { score: 1, description: "Minor - No impact on product quality or patient safety" },
      { score: 2, description: "Low - Slight impact, easily correctable" },
      { score: 3, description: "Moderate - Some impact on quality" },
      { score: 4, description: "High - Significant quality impact" },
      { score: 5, description: "Very High - Major quality impact" },
      { score: 6, description: "Extreme - Potential patient harm" },
      { score: 7, description: "Serious - Likely patient harm" },
      { score: 8, description: "Hazardous - Severe patient harm" },
      { score: 9, description: "Very Hazardous - Life-threatening" },
      { score: 10, description: "Catastrophic - Death or permanent disability" }
    ],
    occurrence: [
      { score: 1, description: "Remote - Extremely unlikely (< 1 in 1,000,000)" },
      { score: 2, description: "Very Low - Very unlikely (1 in 100,000)" },
      { score: 3, description: "Low - Unlikely (1 in 10,000)" },
      { score: 4, description: "Moderately Low - Occasional (1 in 1,000)" },
      { score: 5, description: "Moderate - Possible (1 in 100)" },
      { score: 6, description: "Moderately High - Frequent (1 in 50)" },
      { score: 7, description: "High - Very frequent (1 in 20)" },
      { score: 8, description: "Very High - Repeated failures (1 in 10)" },
      { score: 9, description: "Extremely High - Almost certain (1 in 5)" },
      { score: 10, description: "Certain - Failure is inevitable (> 1 in 2)" }
    ],
    detection: [
      { score: 1, description: "Very High - Certain detection" },
      { score: 2, description: "High - Almost certain detection" },
      { score: 3, description: "Moderately High - High detection probability" },
      { score: 4, description: "Moderate - Moderate detection probability" },
      { score: 5, description: "Low - Low detection probability" },
      { score: 6, description: "Very Low - Very low detection probability" },
      { score: 7, description: "Remote - Remote detection probability" },
      { score: 8, description: "Very Remote - Very remote detection probability" },
      { score: 9, description: "Extremely Remote - Extremely remote detection" },
      { score: 10, description: "Absolute Uncertainty - No detection possible" }
    ]
  };

  const [rpnInputs, setRpnInputs] = useState({ severity: 1, occurrence: 1, detection: 1 });
  const calculatedRPN = rpnInputs.severity * rpnInputs.occurrence * rpnInputs.detection;

  const getRPNColor = (rpn) => {
    if (rpn >= 200) return "bg-red-100 text-red-800 border-red-200";
    if (rpn >= 100) return "bg-orange-100 text-orange-800 border-orange-200";
    if (rpn >= 50) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  const getRPNPriority = (rpn) => {
    if (rpn >= 200) return "Critical - Immediate Action Required";
    if (rpn >= 100) return "High - Action Required";
    if (rpn >= 50) return "Medium - Action Recommended";
    return "Low - Monitor";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <BookOpen className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FMEA Overview</h1>
          <p className="text-gray-600">Failure Mode and Effects Analysis Methodology</p>
        </div>
      </div>

      <Tabs defaultValue="methodology" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="methodology">Methodology</TabsTrigger>
          <TabsTrigger value="process">Process Steps</TabsTrigger>
          <TabsTrigger value="calculator">RPN Calculator</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="methodology" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  <span>What is FMEA?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Failure Mode and Effects Analysis (FMEA) is a systematic, proactive method for evaluating 
                  processes to identify where and how they might fail and assessing the relative impact of 
                  different failures.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Benefits</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Proactive risk identification</li>
                      <li>• Systematic approach to risk assessment</li>
                      <li>• Prioritized action planning</li>
                      <li>• Regulatory compliance support</li>
                      <li>• Continuous improvement</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-700">Applications</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Manufacturing processes</li>
                      <li>• Product development</li>
                      <li>• Quality systems</li>
                      <li>• Supply chain management</li>
                      <li>• Equipment validation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Severity (S)</span>
                    <Badge variant="outline">1-10</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Occurrence (O)</span>
                    <Badge variant="outline">1-10</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Detection (D)</span>
                    <Badge variant="outline">1-10</Badge>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">RPN = S × O × D</span>
                      <Badge className="bg-blue-100 text-blue-800">1-1000</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="process" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">FMEA Process</CardTitle>
                  <CardDescription>Click on each step to learn more</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {fmeaSteps.map((step, index) => (
                    <Button
                      key={step.id}
                      variant={selectedStep === index ? "default" : "ghost"}
                      className="w-full justify-start h-auto p-3"
                      onClick={() => setSelectedStep(index)}
                    >
                      <div className="flex items-center space-x-3">
                        {step.icon}
                        <div className="text-left">
                          <div className="font-medium text-sm">{step.title}</div>
                          <div className="text-xs text-gray-500 truncate">Step {step.id}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    {fmeaSteps[selectedStep].icon}
                    <span>{fmeaSteps[selectedStep].title}</span>
                    <Badge variant="outline">Step {fmeaSteps[selectedStep].id}</Badge>
                  </CardTitle>
                  <CardDescription>{fmeaSteps[selectedStep].description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Key Activities:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {fmeaSteps[selectedStep].details.map((detail, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedStep(Math.max(0, selectedStep - 1))}
                        disabled={selectedStep === 0}
                      >
                        Previous Step
                      </Button>
                      <Button
                        onClick={() => setSelectedStep(Math.min(fmeaSteps.length - 1, selectedStep + 1))}
                        disabled={selectedStep === fmeaSteps.length - 1}
                      >
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <span>RPN Calculator</span>
                </CardTitle>
                <CardDescription>Calculate Risk Priority Number</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Severity (S)</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={rpnInputs.severity}
                      onChange={(e) => setRpnInputs({...rpnInputs, severity: parseInt(e.target.value)})}
                    >
                      {rpnCalculator.severity.map((item) => (
                        <option key={item.score} value={item.score}>
                          {item.score} - {item.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Occurrence (O)</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={rpnInputs.occurrence}
                      onChange={(e) => setRpnInputs({...rpnInputs, occurrence: parseInt(e.target.value)})}
                    >
                      {rpnCalculator.occurrence.map((item) => (
                        <option key={item.score} value={item.score}>
                          {item.score} - {item.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Detection (D)</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={rpnInputs.detection}
                      onChange={(e) => setRpnInputs({...rpnInputs, detection: parseInt(e.target.value)})}
                    >
                      {rpnCalculator.detection.map((item) => (
                        <option key={item.score} value={item.score}>
                          {item.score} - {item.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="text-center space-y-2">
                    <div className="text-sm text-gray-600">
                      RPN = {rpnInputs.severity} × {rpnInputs.occurrence} × {rpnInputs.detection}
                    </div>
                    <div className={`text-3xl font-bold p-4 rounded-lg border-2 ${getRPNColor(calculatedRPN)}`}>
                      {calculatedRPN}
                    </div>
                    <div className="text-sm font-medium">
                      {getRPNPriority(calculatedRPN)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>RPN Priority Matrix</CardTitle>
                <CardDescription>Risk prioritization guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div>
                        <div className="font-semibold text-red-800">Critical (200-1000)</div>
                        <div className="text-sm text-red-600">Immediate action required</div>
                      </div>
                      <Badge className="bg-red-100 text-red-800">High Priority</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div>
                        <div className="font-semibold text-orange-800">High (100-199)</div>
                        <div className="text-sm text-orange-600">Action required within 30 days</div>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">Medium Priority</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div>
                        <div className="font-semibold text-yellow-800">Medium (50-99)</div>
                        <div className="text-sm text-yellow-600">Action recommended</div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Low Priority</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div>
                        <div className="font-semibold text-green-800">Low (1-49)</div>
                        <div className="text-sm text-green-600">Monitor and review</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Monitor</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Manufacturing Process FMEA",
                description: "Template for manufacturing process risk assessment",
                category: "Manufacturing",
                items: ["Process steps", "Equipment failures", "Human errors", "Environmental factors"]
              },
              {
                title: "Product Design FMEA",
                description: "Template for product design risk assessment",
                category: "Design",
                items: ["Component failures", "Interface issues", "Performance degradation", "Safety hazards"]
              },
              {
                title: "Supply Chain FMEA",
                description: "Template for supply chain risk assessment",
                category: "Supply Chain",
                items: ["Supplier failures", "Transportation risks", "Storage issues", "Quality defects"]
              },
              {
                title: "Equipment FMEA",
                description: "Template for equipment risk assessment",
                category: "Equipment",
                items: ["Mechanical failures", "Electrical issues", "Software bugs", "Maintenance needs"]
              },
              {
                title: "Quality System FMEA",
                description: "Template for quality system risk assessment",
                category: "Quality",
                items: ["Process deviations", "Documentation errors", "Training gaps", "Audit findings"]
              },
              {
                title: "Validation FMEA",
                description: "Template for validation risk assessment",
                category: "Validation",
                items: ["Test failures", "Protocol deviations", "Equipment issues", "Data integrity"]
              }
            ].map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Includes:</h4>
                    <ul className="space-y-1">
                      {template.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4" variant="outline">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FMEAOverviewPage;
