import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

const ProtectedRoute = ({ children, requiredRole = 'viewer' }) => {
  const { user, hasPermission } = useAuth();

  if (!user) {
    return null; // This will be handled by the main App component
  }

  if (!hasPermission(requiredRole)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full">
          <Alert variant="destructive">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              You don't have permission to access this page. Required role: {requiredRole}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
