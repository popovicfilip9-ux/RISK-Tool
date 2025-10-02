import React, { createContext, useContext, useState } from 'react';

const RegulatoryContext = createContext();

export const useRegulatory = () => {
  const context = useContext(RegulatoryContext);
  if (!context) {
    throw new Error('useRegulatory must be used within a RegulatoryProvider');
  }
  return context;
};

// Mock regulatory references data
const mockReferences = [
  {
    referenceId: '1',
    title: 'EU Guidelines on Good Distribution Practice (GDP) - Temperature Control',
    source: 'EU GDP',
    section: '5.2.1',
    description: 'Requirements for maintaining appropriate temperature conditions during storage and transportation of medicinal products.',
    url: 'https://ec.europa.eu/health/documents/eudralex/vol-4_en',
    category: 'Temperature Management',
    applicableRegions: ['EU', 'EEA'],
    lastUpdated: '2024-01-15',
    keyRequirements: [
      'Continuous temperature monitoring during transport',
      'Validated temperature-controlled storage facilities',
      'Documentation of temperature excursions and corrective actions'
    ]
  },
  {
    referenceId: '2',
    title: 'ICH Q9 - Quality Risk Management',
    source: 'ICH',
    section: '3.2',
    description: 'International guidance on quality risk management principles and tools for pharmaceutical development, manufacturing, and distribution.',
    url: 'https://www.ich.org/page/quality-guidelines',
    category: 'Risk Management',
    applicableRegions: ['Global'],
    lastUpdated: '2023-11-20',
    keyRequirements: [
      'Systematic approach to risk assessment',
      'Risk evaluation and control measures',
      'Regular review and monitoring of risk controls'
    ]
  },
  {
    referenceId: '3',
    title: 'FDA 21 CFR Part 211 - Current Good Manufacturing Practice',
    source: 'FDA',
    section: '211.142',
    description: 'US FDA regulations for warehousing procedures and requirements for pharmaceutical products.',
    url: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/CFRSearch.cfm',
    category: 'Storage and Warehousing',
    applicableRegions: ['USA'],
    lastUpdated: '2024-03-10',
    keyRequirements: [
      'Proper storage conditions and environmental controls',
      'Segregation of different product types',
      'Regular inspection and maintenance of storage areas'
    ]
  },
  {
    referenceId: '4',
    title: 'EU GDP Guidelines - Security Requirements',
    source: 'EU GDP',
    section: '7.1',
    description: 'Security measures to prevent theft, diversion, and counterfeiting of medicinal products.',
    url: 'https://ec.europa.eu/health/documents/eudralex/vol-4_en',
    category: 'Security',
    applicableRegions: ['EU', 'EEA'],
    lastUpdated: '2024-02-28',
    keyRequirements: [
      'Secure storage and transport arrangements',
      'Personnel security and access controls',
      'Incident reporting and investigation procedures'
    ]
  },
  {
    referenceId: '5',
    title: 'WHO Technical Report Series - Good Storage Practices',
    source: 'WHO',
    section: '4.3',
    description: 'World Health Organization guidelines for good storage practices for pharmaceutical products.',
    url: 'https://www.who.int/medicines/areas/quality_safety/quality_assurance/guidelines/en/',
    category: 'Storage Conditions',
    applicableRegions: ['Global'],
    lastUpdated: '2023-09-12',
    keyRequirements: [
      'Appropriate storage conditions for different product types',
      'Environmental monitoring and control systems',
      'Stock rotation and inventory management'
    ]
  },
  {
    referenceId: '6',
    title: 'ECA Guide to GDP - Documentation Requirements',
    source: 'ECA',
    section: '2.4',
    description: 'European Compliance Academy guidance on documentation requirements for good distribution practice.',
    url: 'https://www.gmp-compliance.org/guidelines/gmp-guideline',
    category: 'Documentation',
    applicableRegions: ['EU', 'Global'],
    lastUpdated: '2024-01-30',
    keyRequirements: [
      'Complete batch records and distribution documentation',
      'Traceability throughout the supply chain',
      'Regular review and update of documentation systems'
    ]
  }
];

export const RegulatoryProvider = ({ children }) => {
  const [references, setReferences] = useState(mockReferences);

  const getReferenceById = (referenceId) => {
    return references.find(ref => ref.referenceId === referenceId);
  };

  const getReferencesBySource = (source) => {
    return references.filter(ref => ref.source === source);
  };

  const getReferencesByCategory = (category) => {
    return references.filter(ref => ref.category === category);
  };

  const searchReferences = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return references.filter(ref => 
      ref.title.toLowerCase().includes(term) ||
      ref.description.toLowerCase().includes(term) ||
      ref.category.toLowerCase().includes(term) ||
      ref.source.toLowerCase().includes(term) ||
      ref.keyRequirements.some(req => req.toLowerCase().includes(term))
    );
  };

  const getUniqueCategories = () => {
    return [...new Set(references.map(ref => ref.category))];
  };

  const getUniqueSources = () => {
    return [...new Set(references.map(ref => ref.source))];
  };

  const value = {
    references,
    getReferenceById,
    getReferencesBySource,
    getReferencesByCategory,
    searchReferences,
    getUniqueCategories,
    getUniqueSources
  };

  return (
    <RegulatoryContext.Provider value={value}>
      {children}
    </RegulatoryContext.Provider>
  );
};
