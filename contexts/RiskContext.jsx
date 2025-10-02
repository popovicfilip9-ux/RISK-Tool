import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const RiskContext = createContext();

export const useRisk = () => {
  const context = useContext(RiskContext);
  if (!context) {
    throw new Error('useRisk must be used within a RiskProvider');
  }
  return context;
};

// Mock risk data
const mockRisks = [
  {
    riskId: '1',
    riskName: 'Temperature Excursion During Transport',
    description: 'Risk of temperature-sensitive medicines being exposed to temperatures outside the specified range during transportation.',
    category: 'Temperature Control',
    likelihood: 3,
    impact: 4,
    riskScore: 12,
    mitigationStatus: 'in_progress',
    regulatoryReference: '1',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-09-15').toISOString()
  },
  {
    riskId: '2',
    riskName: 'Packaging Integrity Failure',
    description: 'Risk of primary or secondary packaging being damaged during handling and transport, potentially compromising product quality.',
    category: 'Packaging',
    likelihood: 2,
    impact: 3,
    riskScore: 6,
    mitigationStatus: 'completed',
    regulatoryReference: '2',
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date('2024-08-20').toISOString()
  },
  {
    riskId: '3',
    riskName: 'Chain of Custody Documentation Gap',
    description: 'Risk of incomplete or missing documentation in the chain of custody, affecting traceability and regulatory compliance.',
    category: 'Documentation',
    likelihood: 2,
    impact: 4,
    riskScore: 8,
    mitigationStatus: 'not_started',
    regulatoryReference: '3',
    createdAt: new Date('2024-03-05').toISOString(),
    updatedAt: new Date('2024-09-10').toISOString()
  },
  {
    riskId: '4',
    riskName: 'Contamination During Storage',
    description: 'Risk of cross-contamination or environmental contamination during intermediate storage at distribution centers.',
    category: 'Storage Conditions',
    likelihood: 1,
    impact: 5,
    riskScore: 5,
    mitigationStatus: 'in_progress',
    regulatoryReference: '1',
    createdAt: new Date('2024-04-12').toISOString(),
    updatedAt: new Date('2024-09-25').toISOString()
  },
  {
    riskId: '5',
    riskName: 'Theft or Diversion',
    description: 'Risk of pharmaceutical products being stolen or diverted from the legitimate supply chain.',
    category: 'Security',
    likelihood: 2,
    impact: 4,
    riskScore: 8,
    mitigationStatus: 'completed',
    regulatoryReference: '4',
    createdAt: new Date('2024-05-08').toISOString(),
    updatedAt: new Date('2024-09-12').toISOString()
  }
];

// Mock audit trail data
const mockAuditTrail = [
  {
    auditId: '1',
    riskId: '1',
    userId: '2',
    action: 'update',
    timestamp: new Date('2024-09-15').toISOString(),
    changes: { mitigationStatus: { from: 'not_started', to: 'in_progress' } }
  },
  {
    auditId: '2',
    riskId: '2',
    userId: '1',
    action: 'update',
    timestamp: new Date('2024-08-20').toISOString(),
    changes: { mitigationStatus: { from: 'in_progress', to: 'completed' } }
  }
];

export const RiskProvider = ({ children }) => {
  const [risks, setRisks] = useState(mockRisks);
  const [auditTrail, setAuditTrail] = useState(mockAuditTrail);
  const { user } = useAuth();

  const calculateRiskScore = (likelihood, impact) => {
    return likelihood * impact;
  };

  const addRisk = (riskData) => {
    const newRisk = {
      ...riskData,
      riskId: Date.now().toString(),
      riskScore: calculateRiskScore(riskData.likelihood, riskData.impact),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setRisks(prev => [...prev, newRisk]);
    
    // Add audit trail entry
    const auditEntry = {
      auditId: Date.now().toString(),
      riskId: newRisk.riskId,
      userId: user?.userId,
      action: 'create',
      timestamp: new Date().toISOString(),
      changes: { created: newRisk }
    };
    setAuditTrail(prev => [...prev, auditEntry]);
    
    return newRisk;
  };

  const updateRisk = (riskId, updates) => {
    const oldRisk = risks.find(r => r.riskId === riskId);
    if (!oldRisk) return null;

    const updatedRisk = {
      ...oldRisk,
      ...updates,
      riskScore: calculateRiskScore(
        updates.likelihood || oldRisk.likelihood,
        updates.impact || oldRisk.impact
      ),
      updatedAt: new Date().toISOString()
    };

    setRisks(prev => prev.map(r => r.riskId === riskId ? updatedRisk : r));
    
    // Add audit trail entry
    const auditEntry = {
      auditId: Date.now().toString(),
      riskId: riskId,
      userId: user?.userId,
      action: 'update',
      timestamp: new Date().toISOString(),
      changes: updates
    };
    setAuditTrail(prev => [...prev, auditEntry]);
    
    return updatedRisk;
  };

  const deleteRisk = (riskId) => {
    const riskToDelete = risks.find(r => r.riskId === riskId);
    if (!riskToDelete) return false;

    setRisks(prev => prev.filter(r => r.riskId !== riskId));
    
    // Add audit trail entry
    const auditEntry = {
      auditId: Date.now().toString(),
      riskId: riskId,
      userId: user?.userId,
      action: 'delete',
      timestamp: new Date().toISOString(),
      changes: { deleted: riskToDelete }
    };
    setAuditTrail(prev => [...prev, auditEntry]);
    
    return true;
  };

  const getRiskById = (riskId) => {
    return risks.find(r => r.riskId === riskId);
  };

  const getRisksByCategory = () => {
    const categories = {};
    risks.forEach(risk => {
      if (!categories[risk.category]) {
        categories[risk.category] = [];
      }
      categories[risk.category].push(risk);
    });
    return categories;
  };

  const getHighRiskItems = () => {
    return risks.filter(risk => risk.riskScore >= 12);
  };

  const getMitigationStats = () => {
    const stats = {
      not_started: 0,
      in_progress: 0,
      completed: 0
    };
    
    risks.forEach(risk => {
      stats[risk.mitigationStatus]++;
    });
    
    return stats;
  };

  const value = {
    risks,
    auditTrail,
    addRisk,
    updateRisk,
    deleteRisk,
    getRiskById,
    getRisksByCategory,
    getHighRiskItems,
    getMitigationStats,
    calculateRiskScore
  };

  return <RiskContext.Provider value={value}>{children}</RiskContext.Provider>;
};
