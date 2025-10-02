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
import { Checkbox } from './ui/checkbox';
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  Settings, 
  Calendar,
  Filter,
  Eye,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  PieChart,
  TrendingUp,
  FileImage,
  Package
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ExportPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('risk_assessments');
  const [selectedItems, setSelectedItems] = useState([]);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportOptions, setExportOptions] = useState({
    includeCharts: true,
    includeComments: true,
    includeSignatures: true,
    includeAuditTrail: false,
    dateRange: 'all',
    customDateFrom: '',
    customDateTo: '',
    template: 'standard'
  });
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportHistory, setExportHistory] = useState([]);
  const [availableData, setAvailableData] = useState({
    riskAssessments: [],
    workflows: [],
    auditTrail: [],
    reports: []
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockData = {
      riskAssessments: [
        {
          id: 1,
          title: 'Manufacturing Process Risk Assessment - Line 3',
          type: 'Process Risk Assessment',
          status: 'approved',
          created: '2024-09-28',
          lastModified: '2024-09-30',
          creator: 'John Smith',
          approver: 'Michael Chen',
          riskLevel: 'Medium',
          itemCount: 45
        },
        {
          id: 2,
          title: 'Supplier Risk Assessment - API Vendor XYZ',
          type: 'Supplier Risk Assessment',
          status: 'pending_approval',
          created: '2024-09-25',
          lastModified: '2024-09-29',
          creator: 'Emma Wilson',
          approver: 'Sarah Johnson',
          riskLevel: 'High',
          itemCount: 32
        },
        {
          id: 3,
          title: 'Equipment Qualification Risk Assessment',
          type: 'Equipment Risk Assessment',
          status: 'approved',
          created: '2024-09-20',
          lastModified: '2024-09-22',
          creator: 'Robert Taylor',
          approver: 'Lisa Rodriguez',
          riskLevel: 'Low',
          itemCount: 28
        }
      ],
      workflows: [
        {
          id: 1,
          title: 'Change Control - Temperature Monitoring',
          type: 'Change Control',
          status: 'approved',
          created: '2024-09-26',
          steps: 3,
          currentStep: 'Completed'
        },
        {
          id: 2,
          title: 'Deviation Investigation - Batch 2024-089',
          type: 'Deviation',
          status: 'in_progress',
          created: '2024-09-28',
          steps: 4,
          currentStep: 'Investigation'
        }
      ],
      auditTrail: [
        {
          id: 1,
          action: 'Risk Assessment Created',
          user: 'John Smith',
          timestamp: '2024-09-28 10:30:00',
          details: 'Manufacturing Process Risk Assessment - Line 3'
        },
        {
          id: 2,
          action: 'Risk Assessment Approved',
          user: 'Michael Chen',
          timestamp: '2024-09-30 14:15:00',
          details: 'Manufacturing Process Risk Assessment - Line 3'
        }
      ],
      reports: [
        {
          id: 1,
          title: 'Monthly Risk Summary Report',
          type: 'Summary Report',
          period: 'September 2024',
          created: '2024-10-01',
          metrics: {
            totalAssessments: 15,
            highRisks: 3,
            mediumRisks: 8,
            lowRisks: 4
          }
        },
        {
          id: 2,
          title: 'FMEA Analysis Report',
          type: 'FMEA Report',
          period: 'Q3 2024',
          created: '2024-09-30',
          metrics: {
            totalFMEAs: 8,
            criticalItems: 12,
            actionItems: 25
          }
        }
      ]
    };
    setAvailableData(mockData);

    // Mock export history
    const mockHistory = [
      {
        id: 1,
        filename: 'Risk_Assessments_Export_20241001.pdf',
        type: 'Risk Assessments',
        format: 'PDF',
        created: '2024-10-01 09:15:00',
        size: '2.4 MB',
        status: 'completed',
        downloadUrl: '#'
      },
      {
        id: 2,
        filename: 'Monthly_Report_September_2024.xlsx',
        type: 'Reports',
        format: 'Excel',
        created: '2024-09-30 16:30:00',
        size: '1.8 MB',
        status: 'completed',
        downloadUrl: '#'
      },
      {
        id: 3,
        filename: 'Audit_Trail_Export_20240929.pdf',
        type: 'Audit Trail',
        format: 'PDF',
        created: '2024-09-29 11:45:00',
        size: '890 KB',
        status: 'completed',
        downloadUrl: '#'
      }
    ];
    setExportHistory(mockHistory);
  }, []);

  const handleItemSelection = (itemId, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  const handleSelectAll = (items) => {
    const itemIds = items.map(item => item.id);
    if (selectedItems.length === itemIds.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(itemIds);
    }
  };

  const handleExport = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to export.');
      return;
    }
    setShowExportDialog(true);
  };

  const executeExport = () => {
    // In a real application, this would trigger the actual export process
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
    const filename = `${activeTab}_export_${timestamp}.${exportFormat}`;
    
    console.log('Executing export:', {
      items: selectedItems,
      format: exportFormat,
      options: exportOptions,
      filename: filename
    });

    // Mock export process
    const newExport = {
      id: exportHistory.length + 1,
      filename: filename,
      type: activeTab.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      format: exportFormat.toUpperCase(),
      created: new Date().toLocaleString(),
      size: '1.2 MB',
      status: 'completed',
      downloadUrl: '#'
    };

    setExportHistory([newExport, ...exportHistory]);
    setShowExportDialog(false);
    setSelectedItems([]);

    // Simulate file download
    const blob = new Blob(['Mock export data'], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const ExportDialog = () => (
    <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export Configuration</DialogTitle>
          <DialogDescription>
            Configure export settings for {selectedItems.length} selected item(s)
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <Label className="text-base font-medium">Export Format</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Card 
                className={`cursor-pointer transition-colors ${exportFormat === 'pdf' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                onClick={() => setExportFormat('pdf')}
              >
                <CardContent className="flex items-center space-x-3 p-4">
                  <FileText className="h-8 w-8 text-red-600" />
                  <div>
                    <div className="font-medium">PDF Document</div>
                    <div className="text-sm text-gray-500">Formatted report with charts</div>
                  </div>
                </CardContent>
              </Card>
              <Card 
                className={`cursor-pointer transition-colors ${exportFormat === 'excel' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                onClick={() => setExportFormat('excel')}
              >
                <CardContent className="flex items-center space-x-3 p-4">
                  <FileSpreadsheet className="h-8 w-8 text-green-600" />
                  <div>
                    <div className="font-medium">Excel Spreadsheet</div>
                    <div className="text-sm text-gray-500">Raw data for analysis</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Export Options */}
          <div>
            <Label className="text-base font-medium">Export Options</Label>
            <div className="space-y-3 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-charts"
                  checked={exportOptions.includeCharts}
                  onCheckedChange={(checked) => setExportOptions({...exportOptions, includeCharts: checked})}
                />
                <Label htmlFor="include-charts">Include charts and visualizations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-comments"
                  checked={exportOptions.includeComments}
                  onCheckedChange={(checked) => setExportOptions({...exportOptions, includeComments: checked})}
                />
                <Label htmlFor="include-comments">Include comments and notes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-signatures"
                  checked={exportOptions.includeSignatures}
                  onCheckedChange={(checked) => setExportOptions({...exportOptions, includeSignatures: checked})}
                />
                <Label htmlFor="include-signatures">Include digital signatures</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-audit"
                  checked={exportOptions.includeAuditTrail}
                  onCheckedChange={(checked) => setExportOptions({...exportOptions, includeAuditTrail: checked})}
                />
                <Label htmlFor="include-audit">Include audit trail</Label>
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <Label className="text-base font-medium">Date Range</Label>
            <Select 
              value={exportOptions.dateRange} 
              onValueChange={(value) => setExportOptions({...exportOptions, dateRange: value})}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All dates</SelectItem>
                <SelectItem value="last_week">Last week</SelectItem>
                <SelectItem value="last_month">Last month</SelectItem>
                <SelectItem value="last_quarter">Last quarter</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            {exportOptions.dateRange === 'custom' && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <Label htmlFor="date-from">From</Label>
                  <Input 
                    id="date-from"
                    type="date" 
                    value={exportOptions.customDateFrom}
                    onChange={(e) => setExportOptions({...exportOptions, customDateFrom: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="date-to">To</Label>
                  <Input 
                    id="date-to"
                    type="date" 
                    value={exportOptions.customDateTo}
                    onChange={(e) => setExportOptions({...exportOptions, customDateTo: e.target.value})}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Template Selection */}
          <div>
            <Label className="text-base font-medium">Report Template</Label>
            <Select 
              value={exportOptions.template} 
              onValueChange={(value) => setExportOptions({...exportOptions, template: value})}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Report</SelectItem>
                <SelectItem value="executive">Executive Summary</SelectItem>
                <SelectItem value="detailed">Detailed Analysis</SelectItem>
                <SelectItem value="regulatory">Regulatory Submission</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={executeExport}>
              <Download className="h-4 w-4 mr-2" />
              Export {selectedItems.length} Item(s)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderDataTable = (data, type) => {
    if (!data || data.length === 0) {
      return (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No data available</h3>
            <p className="text-gray-500">No {type} found to export.</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Checkbox 
              checked={selectedItems.length === data.length}
              onCheckedChange={() => handleSelectAll(data)}
            />
            <Label>Select All ({data.length} items)</Label>
          </div>
          <div className="text-sm text-gray-500">
            {selectedItems.length} of {data.length} selected
          </div>
        </div>

        <div className="grid gap-4">
          {data.map((item) => (
            <Card key={item.id} className={`transition-colors ${selectedItems.includes(item.id) ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={(checked) => handleItemSelection(item.id, checked)}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.type}</p>
                      </div>
                      <div className="flex space-x-2">
                        {item.riskLevel && (
                          <Badge className={getRiskLevelColor(item.riskLevel)}>
                            {item.riskLevel}
                          </Badge>
                        )}
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Created:</span> {item.created}
                      </div>
                      {item.lastModified && (
                        <div>
                          <span className="font-medium">Modified:</span> {item.lastModified}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Creator:</span> {item.creator}
                      </div>
                      {item.itemCount && (
                        <div>
                          <span className="font-medium">Items:</span> {item.itemCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Export Center</h1>
          <p className="text-gray-600 mt-1">Export risk assessments, reports, and data to Excel and PDF formats</p>
        </div>
        <Button 
          onClick={handleExport}
          disabled={selectedItems.length === 0}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Selected ({selectedItems.length})
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="risk_assessments">Risk Assessments</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="history">Export History</TabsTrigger>
        </TabsList>

        <TabsContent value="risk_assessments" className="space-y-4">
          {renderDataTable(availableData.riskAssessments, 'risk assessments')}
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          {renderDataTable(availableData.workflows, 'workflows')}
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={selectedItems.length === availableData.reports.length}
                  onCheckedChange={() => handleSelectAll(availableData.reports)}
                />
                <Label>Select All ({availableData.reports.length} reports)</Label>
              </div>
              <div className="text-sm text-gray-500">
                {selectedItems.length} of {availableData.reports.length} selected
              </div>
            </div>

            <div className="grid gap-4">
              {availableData.reports.map((report) => (
                <Card key={report.id} className={`transition-colors ${selectedItems.includes(report.id) ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        checked={selectedItems.includes(report.id)}
                        onCheckedChange={(checked) => handleItemSelection(report.id, checked)}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900">{report.title}</h3>
                            <p className="text-sm text-gray-600">{report.type} • {report.period}</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">
                            {report.type}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Created:</span> {report.created}
                          </div>
                          <div>
                            <span className="font-medium">Period:</span> {report.period}
                          </div>
                        </div>
                        <div className="flex space-x-4 text-sm">
                          {Object.entries(report.metrics).map(([key, value]) => (
                            <div key={key} className="flex items-center space-x-1">
                              <BarChart3 className="h-4 w-4 text-blue-600" />
                              <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Export History</CardTitle>
              <CardDescription>Recent exports and downloads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exportHistory.map((export_item) => (
                  <div key={export_item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {export_item.format === 'PDF' ? (
                        <FileText className="h-8 w-8 text-red-600" />
                      ) : (
                        <FileSpreadsheet className="h-8 w-8 text-green-600" />
                      )}
                      <div>
                        <div className="font-medium">{export_item.filename}</div>
                        <div className="text-sm text-gray-600">
                          {export_item.type} • {export_item.format} • {export_item.size}
                        </div>
                        <div className="text-xs text-gray-500">{export_item.created}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(export_item.status)}>
                        {export_item.status.toUpperCase()}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ExportDialog />
    </div>
  );
};

export default ExportPage;
