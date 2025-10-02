import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users data - in a real application, this would come from a backend
const mockUsers = [
  {
    userId: '1',
    username: 'admin',
    password: 'admin123', // In real app, this would be hashed
    role: 'administrator',
    name: 'System Administrator'
  },
  {
    userId: '2',
    username: 'assessor',
    password: 'assessor123',
    role: 'assessor',
    name: 'Risk Assessor'
  },
  {
    userId: '3',
    username: 'viewer',
    password: 'viewer123',
    role: 'viewer',
    name: 'Risk Viewer'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('gmp-gdp-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // Mock authentication - in real app, this would be an API call
    const foundUser = mockUsers.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('gmp-gdp-user', JSON.stringify(userWithoutPassword));
      return { success: true };
    } else {
      return { success: false, error: 'Invalid username or password' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gmp-gdp-user');
  };

  const hasPermission = (requiredRole) => {
    if (!user) return false;
    
    const roleHierarchy = {
      'viewer': 1,
      'assessor': 2,
      'administrator': 3
    };
    
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  const value = {
    user,
    login,
    logout,
    hasPermission,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
