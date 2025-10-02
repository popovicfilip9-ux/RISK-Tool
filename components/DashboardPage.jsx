import React, { useMemo } from 'react';
import { useRisk } from '../contexts/RiskContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter
} from 'recharts';
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  XCircle,
  Activity,
  Settings,
  Target,
  Workflow,
  Download
} from 'lucide-react';

const DashboardPage = () => {
  const { risks, getMitigationStats, getRisksByCategory } = useRisk();

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalRisks = risks.length;
    const highRiskItems = risks.filter(r => r.riskScore >= 12).length;
    const mitigationStats = getMitigationStats();
    const mitigationRate = totalRisks > 0 ? Math.round((mitigationStats.completed / totalRisks) * 100) : 0;
    const averageRiskScore = totalRisks > 0 ? Math.round(risks.reduce((sum, r) => sum + r.riskScore, 0) / totalRisks) : 0;

    return {
      totalRisks,
      highRiskItems,
      mitigationRate,
      averageRiskScore,
      inProgress: mitigationStats.in_progress,
      notStarted: mitigationStats.not_started
    };
  }, [risks, getMitigationStats]);

  // Risk distribution by category
  const categoryData = useMemo(() => {
    const categories = getRisksByCategory();
    return Object.entries(categories).map(([category, categoryRisks]) => ({
      category,
      count: categoryRisks.length,
      averageScore: Math.round(categoryRisks.reduce((sum, r) => sum + r.riskScore, 0) / categoryRisks.length),
      highRisk: categoryRisks.filter(r => r.riskScore >= 12).length
    }));
  }, [risks, getRisksByCategory]);

  // Mitigation status distribution
  const mitigationData = useMemo(() => {
    const stats = getMitigationStats();
    return [
      { name: 'Not Started', value: stats.not_started, color: '#ef4444' },
      { name: 'In Progress', value: stats.in_progress, color: '#f59e0b' },
      { name: 'Completed', value: stats.completed, color: '#10b981' }
    ];
  }, [getMitigationStats]);

  // Risk trend analysis (simulated monthly data)
  const trendData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    return months.map((month, index) => ({
      month,
      totalRisks: Math.max(1, risks.length - (months.length - index - 1)),
      highRisks: Math.max(0, kpis.highRiskItems - Math.floor((months.length - index - 1) / 2)),
      mitigated: Math.floor((index + 1) * kpis.mitigationRate / months.length)
    }));
  }, [risks, kpis]);

  // Risk heatmap data (likelihood vs impact)
  const heatmapData = useMemo(() => {
    return risks.map(risk => ({
      x: risk.likelihood,
      y: risk.impact,
      z: risk.riskScore,
      name: risk.riskName,
      category: risk.category
    }));
  }, [risks]);

  const COLORS = ['#ef4444', '#f59e0b', '#10b981'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Risk Assessment Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of pharmaceutical transportation risks and mitigation status</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.totalRisks}</div>
            <p className="text-xs text-muted-foreground">
              Active risk assessments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Items</CardTitle>
            <Shield className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{kpis.highRiskItems}</div>
            <p className="text-xs text-muted-foreground">
              Risk score ≥ 12
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mitigation Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{kpis.mitigationRate}%</div>
            <Progress value={kpis.mitigationRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Risk Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.averageRiskScore}</div>
            <p className="text-xs text-muted-foreground">
              Out of 25 maximum
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.location.href = '/generator'}>
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Create Assessment</h3>
              <p className="text-sm text-gray-600">Start new risk assessment</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.location.href = '/fmea'}>
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">FMEA Templates</h3>
              <p className="text-sm text-gray-600">Access FMEA resources</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.location.href = '/workflows'}>
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Workflow className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Approvals</h3>
              <p className="text-sm text-gray-600">Manage workflows</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.location.href = '/export'}>
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Download className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Export Data</h3>
              <p className="text-sm text-gray-600">Download reports</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution by Category</CardTitle>
            <CardDescription>Number of risks and average scores per category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="category" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" name="Risk Count" />
                <Bar dataKey="averageScore" fill="#f59e0b" name="Avg Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mitigation Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Mitigation Status Distribution</CardTitle>
            <CardDescription>Current status of risk mitigation efforts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mitigationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mitigationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Trend Analysis</CardTitle>
            <CardDescription>Monthly progression of risk identification and mitigation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="totalRisks" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Total Risks"
                />
                <Line 
                  type="monotone" 
                  dataKey="highRisks" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="High Risks"
                />
                <Line 
                  type="monotone" 
                  dataKey="mitigated" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Mitigated %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Heatmap</CardTitle>
            <CardDescription>Likelihood vs Impact visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Likelihood" 
                  domain={[0, 6]}
                  label={{ value: 'Likelihood', position: 'insideBottom', offset: -10 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Impact" 
                  domain={[0, 6]}
                  label={{ value: 'Impact', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border rounded shadow-lg">
                          <p className="font-semibold">{data.name}</p>
                          <p>Category: {data.category}</p>
                          <p>Likelihood: {data.x}</p>
                          <p>Impact: {data.y}</p>
                          <p>Risk Score: {data.z}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  data={heatmapData} 
                  fill="#3b82f6"
                  fillOpacity={0.7}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>High Priority Risks</CardTitle>
          <CardDescription>Risks requiring immediate attention (score ≥ 12)</CardDescription>
        </CardHeader>
        <CardContent>
          {kpis.highRiskItems > 0 ? (
            <div className="space-y-4">
              {risks
                .filter(risk => risk.riskScore >= 12)
                .sort((a, b) => b.riskScore - a.riskScore)
                .map(risk => (
                  <div key={risk.riskId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{risk.riskName}</h4>
                      <p className="text-sm text-gray-600 mt-1">{risk.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline">{risk.category}</Badge>
                        <Badge className="bg-red-100 text-red-800">
                          Score: {risk.riskScore}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {risk.mitigationStatus === 'completed' && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {risk.mitigationStatus === 'in_progress' && (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      )}
                      {risk.mitigationStatus === 'not_started' && (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p>No high-priority risks identified</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Missing Elements Alert */}
      {(kpis.notStarted > 0 || kpis.inProgress > 0) && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800">Action Required</CardTitle>
            <CardDescription className="text-yellow-700">
              Some risks require attention to improve overall mitigation status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {kpis.notStarted > 0 && (
                <div className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">
                    {kpis.notStarted} risk{kpis.notStarted !== 1 ? 's' : ''} not yet started
                  </span>
                </div>
              )}
              {kpis.inProgress > 0 && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">
                    {kpis.inProgress} risk{kpis.inProgress !== 1 ? 's' : ''} in progress
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;
