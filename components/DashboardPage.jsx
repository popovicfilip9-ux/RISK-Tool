import React from 'react';

const EnhancedDashboard = () => {
  // Mock data for demonstration
  const stats = [
    {
      icon: '⚠️',
      value: '5',
      label: 'Total Risks',
      sublabel: 'Active risk assessments',
      color: '#2563eb'
    },
    {
      icon: '🔴',
      value: '1',
      label: 'High Risk Items',
      sublabel: 'Risk score ≥ 12',
      color: '#ef4444'
    },
    {
      icon: '✅',
      value: '40%',
      label: 'Mitigation Rate',
      sublabel: 'Completed mitigations',
      color: '#10b981'
    },
    {
      icon: '📊',
      value: '8',
      label: 'Average Risk Score',
      sublabel: 'Out of 25 maximum',
      color: '#f59e0b'
    }
  ];

  const quickActions = [
    {
      title: 'Create Assessment',
      description: 'Start new risk assessment',
      icon: '➕',
      color: '#2563eb'
    },
    {
      title: 'FMEA Templates',
      description: 'Access FMEA resources',
      icon: '📋',
      color: '#10b981'
    },
    {
      title: 'Approvals',
      description: 'Manage workflows',
      icon: '✅',
      color: '#f59e0b'
    },
    {
      title: 'Export Data',
      description: 'Download reports',
      icon: '📤',
      color: '#8b5cf6'
    }
  ];

  const recentRisks = [
    {
      id: 1,
      title: 'Temperature Excursion During Transport',
      category: 'Temperature Control',
      score: 12,
      status: 'High',
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      title: 'Package Integrity Compromise',
      category: 'Physical Security',
      score: 8,
      status: 'Medium',
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      title: 'Documentation Discrepancies',
      category: 'Compliance',
      score: 6,
      status: 'Low',
      lastUpdated: '3 days ago'
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      High: { background: '#fee2e2', color: '#991b1b' },
      Medium: { background: '#fef3c7', color: '#92400e' },
      Low: { background: '#dcfce7', color: '#166534' }
    };
    
    return (
      <span 
        className="badge-enhanced"
        style={styles[status]}
      >
        {status}
      </span>
    );
  };

  return (
    <div>
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Risk Assessment Dashboard</h1>
        <p className="dashboard-subtitle">
          Overview of pharmaceutical transportation risks and mitigation status
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card-enhanced animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="stat-icon-enhanced" style={{ background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}25)`, color: stat.color }}>
              <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
            </div>
            <div className="stat-value-enhanced" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="stat-label-enhanced">
              <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{stat.label}</div>
              <div style={{ fontSize: '0.75rem' }}>{stat.sublabel}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {quickActions.map((action, index) => (
          <div key={index} className="card chart-card animate-slide-up" style={{ animationDelay: `${(index + 4) * 0.1}s`, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div 
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: `linear-gradient(135deg, ${action.color}15, ${action.color}25)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}
              >
                {action.icon}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
                  {action.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
                  {action.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Risk Distribution Chart */}
        <div className="chart-card animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <h3 className="chart-title">Risk Distribution by Category</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Number of risks and average scores per category
          </p>
          <div style={{ height: '200px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
            📊 Chart Placeholder - Risk Distribution
          </div>
        </div>

        {/* Mitigation Status */}
        <div className="chart-card animate-slide-up" style={{ animationDelay: '0.9s' }}>
          <h3 className="chart-title">Mitigation Status Distribution</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Current status of risk mitigation efforts
          </p>
          <div style={{ height: '200px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
            🥧 Chart Placeholder - Mitigation Status
          </div>
        </div>

        {/* Risk Trend */}
        <div className="chart-card animate-slide-up" style={{ animationDelay: '1.0s' }}>
          <h3 className="chart-title">Risk Trend Analysis</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Monthly progression of risk identification and mitigation
          </p>
          <div style={{ height: '200px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
            📈 Chart Placeholder - Risk Trends
          </div>
        </div>

        {/* Risk Heatmap */}
        <div className="chart-card animate-slide-up" style={{ animationDelay: '1.1s' }}>
          <h3 className="chart-title">Risk Heatmap</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Likelihood vs Impact visualization
          </p>
          <div style={{ height: '200px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
            🔥 Chart Placeholder - Risk Heatmap
          </div>
        </div>
      </div>

      {/* Recent Risks Table */}
      <div className="table-card animate-slide-up" style={{ animationDelay: '1.2s' }}>
        <div className="table-header">
          <h3 className="table-title">High Priority Risks</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
            Risks requiring immediate attention (score ≥ 12)
          </p>
        </div>
        
        <div style={{ padding: '1.5rem 2rem' }}>
          {recentRisks.map((risk, index) => (
            <div 
              key={risk.id} 
              style={{ 
                padding: '1rem 0', 
                borderBottom: index < recentRisks.length - 1 ? '1px solid #f1f5f9' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>
                  {risk.title}
                </h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
                  {risk.category} • Score: {risk.score} • Updated {risk.lastUpdated}
                </p>
              </div>
              <div style={{ marginLeft: '1rem' }}>
                {getStatusBadge(risk.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Required Section */}
      <div className="alert alert-info animate-slide-up" style={{ animationDelay: '1.3s', marginTop: '2rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' }}>
          Action Required
        </h4>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          Some risks require attention to improve overall mitigation status:
        </p>
        <ul style={{ margin: '0.5rem 0 0 1.5rem', fontSize: '0.875rem' }}>
          <li>1 risk not yet started</li>
          <li>2 risks in progress</li>
        </ul>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
