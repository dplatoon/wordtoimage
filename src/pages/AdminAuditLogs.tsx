import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import type { Json } from '@/integrations/supabase/types';
import { 
  Shield, 
  CalendarIcon, 
  Search, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  AlertTriangle,
  User,
  CreditCard,
  Mail,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  details: Json;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

const ACTION_TYPES = [
  { value: 'all', label: 'All Actions' },
  { value: 'credits_add', label: 'Credits Added' },
  { value: 'credits_deduct', label: 'Credits Deducted' },
  { value: 'credits_reset', label: 'Credits Reset' },
  { value: 'subscription_created', label: 'Subscription Created' },
  { value: 'subscription_updated', label: 'Subscription Updated' },
  { value: 'subscription_canceled', label: 'Subscription Canceled' },
  { value: 'contact_form_submit', label: 'Contact Form' },
];

const RESOURCE_TYPES = [
  { value: 'all', label: 'All Resources' },
  { value: 'profile', label: 'Profile' },
  { value: 'subscription', label: 'Subscription' },
  { value: 'contact_submission', label: 'Contact' },
];

const getActionIcon = (action: string) => {
  if (action.startsWith('credits_')) return <CreditCard className="w-4 h-4" />;
  if (action.startsWith('subscription_')) return <Activity className="w-4 h-4" />;
  if (action === 'contact_form_submit') return <Mail className="w-4 h-4" />;
  return <User className="w-4 h-4" />;
};

const getActionColor = (action: string): string => {
  if (action === 'credits_add') return 'bg-green-500/20 text-green-400 border-green-500/30';
  if (action === 'credits_deduct') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  if (action === 'subscription_canceled') return 'bg-red-500/20 text-red-400 border-red-500/30';
  if (action.startsWith('subscription_')) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  return 'bg-primary/20 text-primary border-primary/30';
};

export default function AdminAuditLogs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  
  // Filters
  const [actionFilter, setActionFilter] = useState('all');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  
  // Pagination
  const [page, setPage] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      fetchLogs();
    }
  }, [isAdmin, actionFilter, resourceFilter, startDate, endDate, page]);

  const checkAdminStatus = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      // Use server-side verification for admin status
      const { data, error } = await supabase.functions.invoke('verify-admin');

      if (error) {
        console.error('Error verifying admin status:', error);
        toast.error('Failed to verify permissions');
        navigate('/dashboard');
        return;
      }
      
      if (!data?.isAdmin) {
        toast.error('Access denied: Admin privileges required');
        navigate('/dashboard');
        return;
      }
      
      setIsAdmin(true);
    } catch (error) {
      console.error('Error checking admin status:', error);
      toast.error('Failed to verify permissions');
      navigate('/dashboard');
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('audit_logs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (actionFilter !== 'all') {
        query = query.eq('action', actionFilter);
      }
      
      if (resourceFilter !== 'all') {
        query = query.eq('resource_type', resourceFilter);
      }
      
      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }
      
      if (endDate) {
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);
        query = query.lte('created_at', endOfDay.toISOString());
      }

      const { data, error, count } = await query;

      if (error) throw error;
      
      setLogs(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      toast.error('Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(0);
    fetchLogs();
  };

  const clearFilters = () => {
    setActionFilter('all');
    setResourceFilter('all');
    setSearchQuery('');
    setStartDate(undefined);
    setEndDate(undefined);
    setPage(0);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  if (!isAdmin && !loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-dark-gradient" />
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-neon-coral/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Nav />
      
      <main className="container max-w-7xl py-8 px-4 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-neon-coral shadow-neon">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Security Audit Logs
            </h1>
          </div>
          <p className="text-muted-foreground ml-14">
            Monitor sensitive operations and track admin actions for compliance
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-primary/20 mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Filters
              </CardTitle>
              <CardDescription>Filter audit logs by action type, resource, and date range</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Action Type Filter */}
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger className="glass-card border-primary/20">
                    <SelectValue placeholder="Action Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-primary/20">
                    {ACTION_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Resource Type Filter */}
                <Select value={resourceFilter} onValueChange={setResourceFilter}>
                  <SelectTrigger className="glass-card border-primary/20">
                    <SelectValue placeholder="Resource Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-primary/20">
                    {RESOURCE_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Start Date */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn(
                      "glass-card border-primary/20 justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background border-primary/20" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>

                {/* End Date */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn(
                      "glass-card border-primary/20 justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background border-primary/20" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button onClick={handleSearch} variant="neon" className="flex-1">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button onClick={clearFilters} variant="glass" size="icon">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-4"
        >
          <p className="text-sm text-muted-foreground">
            Showing {logs.length} of {totalCount} audit log entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage(p => Math.max(0, p - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page + 1} of {Math.max(1, totalPages)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => p + 1)}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Logs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card border-primary/20 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/20 hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Timestamp</TableHead>
                    <TableHead className="text-muted-foreground">Action</TableHead>
                    <TableHead className="text-muted-foreground">Resource</TableHead>
                    <TableHead className="text-muted-foreground">User ID</TableHead>
                    <TableHead className="text-muted-foreground">Details</TableHead>
                    <TableHead className="text-muted-foreground">IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i} className="border-primary/20">
                        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      </TableRow>
                    ))
                  ) : logs.length === 0 ? (
                    <TableRow className="border-primary/20">
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="flex flex-col items-center gap-3 text-muted-foreground">
                          <AlertTriangle className="w-8 h-8" />
                          <p>No audit logs found matching your filters</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    logs.map((log) => (
                      <TableRow key={log.id} className="border-primary/20 hover:bg-primary/5">
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {format(new Date(log.created_at), "MMM d, yyyy HH:mm:ss")}
                        </TableCell>
                        <TableCell>
                          <Badge className={cn("gap-1.5", getActionColor(log.action))}>
                            {getActionIcon(log.action)}
                            {log.action.replace(/_/g, ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {log.resource_type}
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {log.user_id ? log.user_id.slice(0, 8) + '...' : 'Anonymous'}
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <code className="text-xs bg-muted/50 px-2 py-1 rounded truncate block">
                            {JSON.stringify(log.details).slice(0, 50)}
                            {JSON.stringify(log.details).length > 50 && '...'}
                          </code>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {log.ip_address || '-'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}