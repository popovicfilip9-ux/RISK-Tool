import React, { useState, useMemo } from 'react';
import { useRisk } from '../contexts/RiskContext';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  History, 
  Search, 
  Filter,
  Calendar,
  User,
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const AuditTrailPage = () => {
  const { auditTrail, risks } = useRisk();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');

  // Mock user data for display purposes
  const mockUsers = {
    '1': { name: 'System Administrator', username: 'admin' },
    '2': { name: 'Risk Assessor', username: 'assessor' },
    '3': { name: 'Risk Viewer', username: 'viewer' }
  };

  // Get unique users and actions from audit trail
  const uniqueUsers = useMemo(() => {
    const userIds = [...new Set(auditTrail.map(entry => entry.userId))];
    return userIds.map(id => ({
      id,
      name: mockUsers[id]?.name || 'Unknown User',
      username: mockUsers[id]?.username || 'unknown'
    }));
  }, [auditTrail]);

  const uniqueActions = useMemo(() => {
    return [...new Set(auditTrail.map(entry => entry.action))];
  }, [auditTrail]);

  // Filter audit trail entries
  const filteredAuditTrail = useMemo(() => {
    return auditTrail.filter(entry => {
      const risk = risks.find(r => r.riskId === entry.riskId);
      const riskName = risk?.riskName || 'Unknown Risk';
      const userName = mockUsers[entry.userId]?.name || 'Unknown User';
      
      const matchesSearch = searchTerm === '' || 
        riskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.action.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAction = filterAction === 'all' || entry.action === filterAction;
      const matchesUser = filterUser === 'all' || entry.userId === filterUser;
      
      return matchesSearch && matchesAction && matchesUser;
    });
  }, [auditTrail, risks, searchTerm, filterAction, filterUser]);

  const getActionIcon = (action) => {
    switch (action) {
      case 'create':
        return <Plus className="w-4 h-4 text-green-600" />;
      case 'update':
        return <Edit className="w-4 h-4 text-blue-600" />;
      case 'delete':
        return <Trash2 className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 text-green-800';
      case 'update':
        return 'bg-blue-100 text-blue-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatChanges = (changes) => {
    if (!changes) return 'No changes recorded';
    
    const changeEntries = Object.entries(changes);
    if (changeEntries.length === 0) return 'No changes recorded';
    
    return changeEntries.map(([key, value]) => {
      if (typeof value === 'object' && value.from && value.to) {
        return `${key}: ${value.from} → ${value.to}`;
      }
      return `${key}: ${JSON.stringify(value)}`;
    }).join(', ');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Audit Trail</h1>
        <p className="text-gray-600 mt-2">
          Complete history of all changes made to risk assessments
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-64">
              <Label htmlFor="search">Search Audit Trail</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by risk name, user, or action..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="min-w-48">
              <Label>Action</Label>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {uniqueActions.map(action => (
                    <SelectItem key={action} value={action}>
                      {action.charAt(0).toUpperCase() + action.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="min-w-48">
              <Label>User</Label>
              <Select value={filterUser} onValueChange={setFilterUser}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {uniqueUsers.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setFilterAction('all');
                setFilterUser('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Trail Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="w-5 h-5" />
            <span>Audit Trail Entries</span>
          </CardTitle>
          <CardDescription>
            {filteredAuditTrail.length} entr{filteredAuditTrail.length !== 1 ? 'ies' : 'y'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Changes</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAuditTrail
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .map((entry) => {
                  const risk = risks.find(r => r.riskId === entry.riskId);
                  const userName = mockUsers[entry.userId]?.name || 'Unknown User';
                  
                  return (
                    <TableRow key={entry.auditId}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="font-medium">
                              {new Date(entry.timestamp).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(entry.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getActionIcon(entry.action)}
                          <Badge className={getActionColor(entry.action)}>
                            {entry.action.charAt(0).toUpperCase() + entry.action.slice(1)}
                          </Badge>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {risk?.riskName || 'Unknown Risk'}
                          </div>
                          {risk && (
                            <div className="text-sm text-gray-500">
                              ID: {entry.riskId}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="font-medium">{userName}</div>
                            <div className="text-sm text-gray-500">
                              {mockUsers[entry.userId]?.username || 'unknown'}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="max-w-xs truncate text-sm">
                          {formatChanges(entry.changes)}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <AuditDetailView 
                              entry={entry} 
                              risk={risk} 
                              userName={userName}
                            />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>

          {filteredAuditTrail.length === 0 && (
            <div className="text-center py-12">
              <History className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No audit entries found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find relevant audit entries.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditTrail.length}</div>
            <p className="text-xs text-muted-foreground">
              All audit trail entries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {auditTrail.filter(entry => {
                const entryDate = new Date(entry.timestamp);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return entryDate >= weekAgo;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Entries in last 7 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              Users with audit entries
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Audit Detail View Component
const AuditDetailView = ({ entry, risk, userName }) => {
  const formatDetailedChanges = (changes) => {
    if (!changes) return null;
    
    const changeEntries = Object.entries(changes);
    if (changeEntries.length === 0) return null;
    
    return (
      <div className="space-y-2">
        {changeEntries.map(([key, value]) => (
          <div key={key} className="border rounded p-3">
            <div className="font-medium text-sm text-gray-700 mb-1">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </div>
            {typeof value === 'object' && value.from && value.to ? (
              <div className="text-sm">
                <div className="text-red-600">From: {value.from}</div>
                <div className="text-green-600">To: {value.to}</div>
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                {JSON.stringify(value, null, 2)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-2">
          {entry.action === 'create' && <Plus className="w-5 h-5 text-green-600" />}
          {entry.action === 'update' && <Edit className="w-5 h-5 text-blue-600" />}
          {entry.action === 'delete' && <Trash2 className="w-5 h-5 text-red-600" />}
          <span>Audit Entry Details</span>
        </DialogTitle>
        <DialogDescription>
          {entry.action.charAt(0).toUpperCase() + entry.action.slice(1)} action performed on {new Date(entry.timestamp).toLocaleString()}
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-700">Action</Label>
          <div className="mt-1">
            <Badge className={
              entry.action === 'create' ? 'bg-green-100 text-green-800' :
              entry.action === 'update' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }>
              {entry.action.charAt(0).toUpperCase() + entry.action.slice(1)}
            </Badge>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">User</Label>
          <div className="mt-1 text-sm">{userName}</div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Risk</Label>
          <div className="mt-1 text-sm">{risk?.riskName || 'Unknown Risk'}</div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Risk ID</Label>
          <div className="mt-1 text-sm font-mono">{entry.riskId}</div>
        </div>
      </div>

      {entry.changes && Object.keys(entry.changes).length > 0 && (
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Changes Made</Label>
          {formatDetailedChanges(entry.changes)}
        </div>
      )}

      <div className="pt-4 border-t">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Timestamp: {new Date(entry.timestamp).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default AuditTrailPage;
