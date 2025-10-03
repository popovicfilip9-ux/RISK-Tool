import React, { useState } from 'react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: '📊', active: true },
    { name: 'Risk Management', href: '/risks', icon: '⚠️' },
    { name: 'FMEA Overview', href: '/fmea', icon: '🔍' },
    { name: 'Risk Generator', href: '/generator', icon: '⚡' },
    { name: 'Approval Workflows', href: '/approvals', icon: '✅' },
    { name: 'Export Center', href: '/export', icon: '📤' },
    { name: 'Regulatory References', href: '/regulatory', icon: '📚' },
    { name: 'User Management', href: '/users', icon: '👥' },
    { name: 'Audit Trail', href: '/audit', icon: '📝' },
  ];

  const resetDemo = () => {
    if (confirm('Are you sure you want to reset all demo data? This will restore the initial demo state.')) {
      // Clear localStorage
      localStorage.clear();
      // Reload page to reset state
      window.location.reload();
    }
  };

  return (
    <div className="app">
      {/* Demo Banner */}
      <div className="demo-banner">
        🎯 <strong>Interactive Demo:</strong> This is a demonstration platform. All data is stored locally in your browser and will persist between sessions on this device.
        <button 
          onClick={resetDemo}
          style={{
            marginLeft: '1rem',
            padding: '0.25rem 0.75rem',
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '6px',
            color: 'white',
            fontSize: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
        >
          Reset Demo
        </button>
      </div>

      <div className="app-container">
        {/* Sidebar */}
        <aside className={`app-sidebar sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-logo">GMP/GDP</div>
            <div className="sidebar-subtitle">Risk Assessment</div>
          </div>

          <nav className="nav-menu">
            <div className="nav-section">
              <div className="nav-section-title">Main Navigation</div>
              {navigationItems.slice(0, 4).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${item.active ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </div>

            <div className="nav-section">
              <div className="nav-section-title">Management</div>
              {navigationItems.slice(4, 7).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link"
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </div>

            <div className="nav-section">
              <div className="nav-section-title">Administration</div>
              {navigationItems.slice(7).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link"
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Header */}
          <header className="app-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="btn btn-secondary"
                style={{ display: 'none' }}
                id="mobile-menu-btn"
              >
                ☰
              </button>
              <h1 className="app-title">Risk Assessment Dashboard</h1>
            </div>

            <div className="user-info">
              <div style={{ textAlign: 'right', marginRight: '0.5rem' }}>
                <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>System Administrator</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>administrator</div>
              </div>
              <div className="user-avatar">SA</div>
            </div>
          </header>

          {/* Page Content */}
          <div className="dashboard-container animate-fade-scale">
            {children}
          </div>
        </main>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          #mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
