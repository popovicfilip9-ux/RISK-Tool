import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RiskProvider } from './contexts/RiskContext';
import { RegulatoryProvider } from './contexts/RegulatoryContext';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './components/DashboardPage';
import RiskManagementPage from './components/RiskManagementPage';
import FMEAOverviewPage from './components/FMEAOverviewPage';
import RiskAssessmentGenerator from './components/RiskAssessmentGenerator';
import ApprovalWorkflowPage from './components/ApprovalWorkflowPage';
import ExportPage from './components/ExportPage';
import RegulatoryReferencesPage from './components/RegulatoryReferencesPage';
import UserManagementPage from './components/UserManagementPage';
import AuditTrailPage from './components/AuditTrailPage';
import './App.css';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Main App Router Component
const AppRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute requiredRole="viewer">
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/risks" 
          element={
            <ProtectedRoute requiredRole="assessor">
              <RiskManagementPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/fmea" 
          element={
            <ProtectedRoute requiredRole="assessor">
              <FMEAOverviewPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/generator" 
          element={
            <ProtectedRoute requiredRole="assessor">
              <RiskAssessmentGenerator />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/workflows" 
          element={
            <ProtectedRoute requiredRole="assessor">
              <ApprovalWorkflowPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/export" 
          element={
            <ProtectedRoute requiredRole="assessor">
              <ExportPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/references" 
          element={
            <ProtectedRoute requiredRole="viewer">
              <RegulatoryReferencesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute requiredRole="administrator">
              <UserManagementPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/audit" 
          element={
            <ProtectedRoute requiredRole="administrator">
              <AuditTrailPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <AuthProvider>
        <RiskProvider>
          <RegulatoryProvider>
            <div className="min-h-screen bg-gray-50">
              <AppRouter />
            </div>
          </RegulatoryProvider>
        </RiskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
