import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { BookOpen, Eye, Heart, TrendingUp, Users, MessageSquare } from 'lucide-react';
import { ContentService } from '@/services/contentService';

interface ContentAnalyticsData {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  avgReadTime: number;
  topPosts: Array<{
    title: string;
    views: number;
    likes: number;
    slug: string;
  }>;
  categoryPerformance: Array<{
    category: string;
    posts: number;
    views: number;
    engagement: number;
  }>;
  engagementTrends: Array<{
    date: string;
    views: number;
    likes: number;
    shares: number;
  }>;
}

export const ContentAnalytics = () => {
  const [data, setData] = useState<ContentAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Mock analytics data based on our content service
      const { data: posts } = await ContentService.getAllPosts();
      
      const mockData: ContentAnalyticsData = {
        totalPosts: posts?.length || 0,
        totalViews: posts?.reduce((sum, post) => sum + post.views, 0) || 0,
        totalLikes: posts?.reduce((sum, post) => sum + post.likes, 0) || 0,
        avgReadTime: posts?.reduce((sum, post) => sum + post.read_time, 0) / (posts?.length || 1) || 0,
        topPosts: posts?.sort((a, b) => b.views - a.views).slice(0, 5).map(post => ({
          title: post.title,
          views: post.views,
          likes: post.likes,
          slug: post.slug
        })) || [],
        categoryPerformance: [
          { category: 'Tutorial', posts: 2, views: 4770, engagement: 254 },
          { category: 'Business', posts: 1, views: 1654, engagement: 87 },
          { category: 'Industry', posts: 0, views: 0, engagement: 0 }
        ],
        engagementTrends: [
          { date: '2025-01-01', views: 450, likes: 23, shares: 12 },
          { date: '2025-01-02', views: 520, likes: 31, shares: 15 },
          { date: '2025-01-03', views: 680, likes: 42, shares: 18 },
          { date: '2025-01-04', views: 750, likes: 38, shares: 22 },
          { date: '2025-01-05', views: 890, likes: 55, shares: 28 }
        ]
      };

      setData(mockData);
    } catch (error) {
      console.error('Failed to fetch content analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-6">
      {/* Content Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-violet-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">{data.totalPosts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{data.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Likes</p>
                <p className="text-2xl font-bold text-gray-900">{data.totalLikes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Read Time</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(data.avgReadTime)} min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.topPosts.map((post, index) => (
                    <div key={post.slug} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-2">{post.title}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.likes}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        #{index + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Engagement Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.engagementTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2} />
                    <Line type="monotone" dataKey="likes" stroke="#06b6d4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Content Engagement Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-violet-600">
                    {((data.totalLikes / data.totalViews) * 100).toFixed(1)}%
                  </div>
                  <p className="text-sm text-gray-600">Like Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {(data.totalViews / data.totalPosts).toFixed(0)}
                  </div>
                  <p className="text-sm text-gray-600">Avg. Views per Post</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {(data.totalLikes / data.totalPosts).toFixed(0)}
                  </div>
                  <p className="text-sm text-gray-600">Avg. Likes per Post</p>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.engagementTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="shares" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.categoryPerformance.map((category, index) => (
                    <div key={category.category} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{category.category}</p>
                        <p className="text-sm text-gray-600">{category.posts} posts</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{category.views} views</p>
                        <p className="text-sm text-gray-600">{category.engagement} likes</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Views by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.categoryPerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, views }) => `${category}: ${views}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="views"
                    >
                      {data.categoryPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};