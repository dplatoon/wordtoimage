import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Users, MousePointer, Target, TestTube, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AnalyticsData {
  totalUsers: number;
  totalSessions: number;
  conversionRate: number;
  popularPages: Array<{ page: string; views: number }>;
  userJourney: Array<{ step: string; count: number; stage: number }>;
  abTests: Array<{ 
    id: string;
    test_name: string; 
    description?: string;
    variants: any[]; 
    active: boolean;
    created_at: string;
  }>;
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d');
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin - simplified to always show admin warning for now
  useEffect(() => {
    // For now, restrict access to admin-only preview
    // TODO: Implement proper admin role checking when user_roles table is available
    setIsAdmin(false);
  }, []);

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const endDate = new Date();
      const startDate = new Date();
      
      switch (dateRange) {
        case '24h':
          startDate.setDate(endDate.getDate() - 1);
          break;
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
      }

      // Fetch user analytics summary
      const { data: userAnalytics } = await supabase
        .from('user_analytics')
        .select('user_id, session_id, event_type, page_url')
        .gte('created_at', startDate.toISOString());

      // Fetch conversion data
      const { data: conversionData } = await supabase
        .from('conversion_events')
        .select('*')
        .gte('created_at', startDate.toISOString());

      // Fetch behavior data
      const { data: behaviorData } = await supabase
        .from('user_behavior')
        .select('page_path, time_on_page, scroll_depth')
        .gte('created_at', startDate.toISOString());

      // Fetch AB tests
      const { data: abTests } = await supabase
        .from('ab_tests')
        .select('*')
        .eq('active', true);

      // Process data
      const uniqueUsers = new Set(userAnalytics?.map(u => u.user_id).filter(Boolean)).size;
      const uniqueSessions = new Set(userAnalytics?.map(u => u.session_id)).size;
      
      // Calculate conversion rate (users who completed purchase vs viewed pricing)
      const viewedPricing = conversionData?.filter(c => c.funnel_step === 'view_pricing').length || 0;
      const completedPurchase = conversionData?.filter(c => c.funnel_step === 'complete_purchase').length || 0;
      const conversionRate = viewedPricing > 0 ? (completedPurchase / viewedPricing) * 100 : 0;

      // Popular pages
      const pageViews: Record<string, number> = {};
      behaviorData?.forEach(b => {
        pageViews[b.page_path] = (pageViews[b.page_path] || 0) + 1;
      });
      
      const popularPages = Object.entries(pageViews)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      // User journey funnel
      const funnelSteps: Record<string, number> = {};
      conversionData?.forEach(c => {
        funnelSteps[c.funnel_step] = (funnelSteps[c.funnel_step] || 0) + 1;
      });

      const userJourney = [
        { step: 'Page Visit', count: uniqueSessions, stage: 0 },
        { step: 'View Pricing', count: funnelSteps['view_pricing'] || 0, stage: 1 },
        { step: 'Start Checkout', count: funnelSteps['start_checkout'] || 0, stage: 2 },
        { step: 'Complete Purchase', count: funnelSteps['complete_purchase'] || 0, stage: 3 }
      ];

      setData({
        totalUsers: uniqueUsers,
        totalSessions: uniqueSessions,
        conversionRate: Number(conversionRate.toFixed(2)),
        popularPages,
        userJourney,
        abTests: (abTests || []).map(test => ({
          ...test,
          variants: Array.isArray(test.variants) ? test.variants : []
        }))
      });
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createABTest = async () => {
    try {
      await supabase.from('ab_tests').insert({
        test_name: 'pricing_cta_test',
        description: 'Test different pricing page CTA buttons',
        variants: ['Get Started Now', 'Start Free Trial', 'Begin Creating'],
        active: true
      });
      
      fetchAnalyticsData(); // Refresh data
    } catch (error) {
      console.error('Failed to create AB test:', error);
    }
  };

  // Show admin-only message for non-admin users
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-warning/50 bg-warning/5">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="text-warning text-6xl">🔒</div>
                <h3 className="text-xl font-semibold">Analytics Dashboard</h3>
                <p className="text-muted-foreground">
                  This page provides analytics insights for administrators. Regular users can explore our other features.
                </p>
                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link to="/" className="inline-flex items-center gap-2">
                      Go to Image Generator
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <Badge variant="outline" className="text-sm">
                  Admin-Only Feature
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="h-20 bg-gray-200 animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Advanced insights and conversion optimization</p>
          </div>
          
          <div className="flex gap-4">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <Button onClick={createABTest} className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              Create A/B Test
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{data?.totalUsers || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MousePointer className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{data?.totalSessions || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{data?.conversionRate || 0}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active A/B Tests</p>
                  <p className="text-2xl font-bold text-gray-900">{data?.abTests.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analysis */}
        <Tabs defaultValue="funnel" className="space-y-6">
          <TabsList>
            <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
            <TabsTrigger value="pages">Popular Pages</TabsTrigger>
            <TabsTrigger value="tests">A/B Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="funnel">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data?.userJourney}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="step" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pages">
            <Card>
              <CardHeader>
                <CardTitle>Popular Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={data?.popularPages}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ page, percent }) => `${page} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="views"
                    >
                      {data?.popularPages.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests">
            <Card>
              <CardHeader>
                <CardTitle>A/B Tests Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.abTests.map((test, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{test.test_name}</h3>
                        <Badge variant={test.active ? "default" : "secondary"}>
                          {test.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{test.description}</p>
                      <div className="flex gap-2">
                        {(test.variants as string[]).map((variant, vIndex) => (
                          <Badge key={vIndex} variant="outline">{variant}</Badge>
                        ))}
                      </div>
                    </div>
                  )) || (
                    <p className="text-gray-500 text-center py-8">
                      No A/B tests configured. Click "Create A/B Test" to get started.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}