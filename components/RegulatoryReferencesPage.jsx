import React, { useState, useMemo } from 'react';
import { useRegulatory } from '../contexts/RegulatoryContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  ExternalLink, 
  BookOpen, 
  Filter,
  Calendar,
  Globe,
  FileText,
  CheckCircle
} from 'lucide-react';

const RegulatoryReferencesPage = () => {
  const { 
    references, 
    searchReferences, 
    getReferencesByCategory, 
    getReferencesBySource,
    getUniqueCategories,
    getUniqueSources
  } = useRegulatory();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedReference, setSelectedReference] = useState(null);

  const categories = getUniqueCategories();
  const sources = getUniqueSources();

  // Filter references based on search and filters
  const filteredReferences = useMemo(() => {
    let filtered = references;

    if (searchTerm) {
      filtered = searchReferences(searchTerm);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(ref => ref.category === selectedCategory);
    }

    if (selectedSource !== 'all') {
      filtered = filtered.filter(ref => ref.source === selectedSource);
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedSource, references, searchReferences]);

  // Group references by source for the overview
  const referencesBySource = useMemo(() => {
    const grouped = {};
    sources.forEach(source => {
      grouped[source] = getReferencesBySource(source);
    });
    return grouped;
  }, [sources, getReferencesBySource]);

  const getSourceColor = (source) => {
    const colors = {
      'EU GDP': 'bg-blue-100 text-blue-800',
      'ICH': 'bg-purple-100 text-purple-800',
      'FDA': 'bg-green-100 text-green-800',
      'WHO': 'bg-orange-100 text-orange-800',
      'ECA': 'bg-indigo-100 text-indigo-800'
    };
    return colors[source] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Regulatory References</h1>
        <p className="text-gray-600 mt-2">
          Comprehensive library of GMP/GDP regulatory guidelines and requirements
        </p>
      </div>

      <Tabs defaultValue="library" className="space-y-6">
        <TabsList>
          <TabsTrigger value="library">Reference Library</TabsTrigger>
          <TabsTrigger value="overview">Source Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-64">
                  <Label htmlFor="search">Search References</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by title, description, or requirements..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="min-w-48">
                  <Label>Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="min-w-48">
                  <Label>Source</Label>
                  <Select value={selectedSource} onValueChange={setSelectedSource}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      {sources.map(source => (
                        <SelectItem key={source} value={source}>{source}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedSource('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {filteredReferences.length} Reference{filteredReferences.length !== 1 ? 's' : ''} Found
              </h2>
            </div>

            <div className="grid gap-4">
              {filteredReferences.map((reference) => (
                <Card key={reference.referenceId} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{reference.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {reference.description}
                        </CardDescription>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <BookOpen className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <ReferenceDetailView reference={reference} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge className={getSourceColor(reference.source)}>
                        {reference.source}
                      </Badge>
                      <Badge variant="outline">{reference.category}</Badge>
                      <Badge variant="outline">{reference.section}</Badge>
                      {reference.applicableRegions.map(region => (
                        <Badge key={region} variant="secondary" className="text-xs">
                          {region}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Updated: {new Date(reference.lastUpdated).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-1" />
                          {reference.applicableRegions.join(', ')}
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" asChild>
                        <a href={reference.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Source
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredReferences.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No references found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or filters to find relevant regulatory references.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6">
            {Object.entries(referencesBySource).map(([source, sourceRefs]) => (
              <Card key={source}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Badge className={getSourceColor(source)}>{source}</Badge>
                        <span className="text-lg">{getSourceFullName(source)}</span>
                      </CardTitle>
                      <CardDescription>
                        {sourceRefs.length} reference{sourceRefs.length !== 1 ? 's' : ''} available
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {sourceRefs.map((ref) => (
                      <div key={ref.referenceId} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{ref.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">{ref.category}</Badge>
                            <span className="text-sm text-gray-500">Section {ref.section}</span>
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <BookOpen className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <ReferenceDetailView reference={ref} />
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
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

// Reference Detail View Component
const ReferenceDetailView = ({ reference }) => {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-xl">{reference.title}</DialogTitle>
        <DialogDescription>
          {reference.source} - Section {reference.section}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className={getSourceColor(reference.source)}>
            {reference.source}
          </Badge>
          <Badge variant="outline">{reference.category}</Badge>
          {reference.applicableRegions.map(region => (
            <Badge key={region} variant="secondary">
              {region}
            </Badge>
          ))}
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-2 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Description
          </h3>
          <p className="text-gray-700">{reference.description}</p>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-3 flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Key Requirements
          </h3>
          <ul className="space-y-2">
            {reference.keyRequirements.map((requirement, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">{requirement}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <div className="flex items-center mb-1">
              <Calendar className="w-4 h-4 mr-1" />
              Last Updated: {new Date(reference.lastUpdated).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              Applicable Regions: {reference.applicableRegions.join(', ')}
            </div>
          </div>
          
          <Button asChild>
            <a href={reference.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full Document
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get full source names
const getSourceFullName = (source) => {
  const fullNames = {
    'EU GDP': 'European Union Good Distribution Practice',
    'ICH': 'International Council for Harmonisation',
    'FDA': 'US Food and Drug Administration',
    'WHO': 'World Health Organization',
    'ECA': 'European Compliance Academy'
  };
  return fullNames[source] || source;
};

// Helper function for source colors (duplicated for use in detail view)
const getSourceColor = (source) => {
  const colors = {
    'EU GDP': 'bg-blue-100 text-blue-800',
    'ICH': 'bg-purple-100 text-purple-800',
    'FDA': 'bg-green-100 text-green-800',
    'WHO': 'bg-orange-100 text-orange-800',
    'ECA': 'bg-indigo-100 text-indigo-800'
  };
  return colors[source] || 'bg-gray-100 text-gray-800';
};

export default RegulatoryReferencesPage;
