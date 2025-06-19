
import React, { useState } from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { CommunityFeed } from '@/components/community/CommunityFeed';
import { CommunitySidebar } from '@/components/community/CommunitySidebar';
import { CommunityGallery } from '@/components/community/CommunityGallery';
import { CreatePostModal } from '@/components/community/CreatePostModal';
import { FeaturedSection } from '@/components/community/FeaturedSection';
import { ChallengeCard } from '@/components/community/ChallengeCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Users, Camera, Award, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Mock data for featured content
const FEATURED_ARTIST = {
  id: '1',
  name: 'Maya Rodriguez',
  username: 'mayar_ai',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face&auto=format',
  bio: 'Digital artist passionate about AI-generated surreal landscapes and abstract compositions.',
  followers: 2345,
  featuredImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&auto=format',
  badge: 'Verified Artist'
};

const TRENDING_POSTS = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop&auto=format',
    title: 'Cyberpunk Dreams',
    author: 'techartist',
    likes: 156,
    trending: true
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=200&fit=crop&auto=format',
    title: 'Ocean Depths',
    author: 'deepblue',
    likes: 134,
    trending: true
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&auto=format',
    title: 'Mountain Sunrise',
    author: 'naturelover',
    likes: 98,
    trending: true
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop&auto=format',
    title: 'Urban Abstract',
    author: 'cityvibes',
    likes: 87,
    trending: true
  }
];

const ACTIVE_CHALLENGES = [
  {
    id: '1',
    title: 'Retro Futurism Week',
    description: 'Create AI art that blends vintage aesthetics with futuristic elements. Think 80s neon meets space age design.',
    theme: 'Retro Futurism',
    startDate: '2024-01-15',
    endDate: '2024-01-22',
    participants: 156,
    prize: '$500 + Featured Artist Spotlight',
    difficulty: 'intermediate' as const,
    status: 'active' as const
  },
  {
    id: '2',
    title: 'Nature\'s Palette',
    description: 'Capture the beauty of nature using only earth tones and natural color palettes.',
    theme: 'Natural Colors',
    startDate: '2024-01-20',
    endDate: '2024-01-27',
    participants: 89,
    prize: '$300 + Art Supply Package',
    difficulty: 'beginner' as const,
    status: 'upcoming' as const
  }
];

const Community = () => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const { t } = useTranslation();

  const handleViewProfile = (userId: string) => {
    console.log('View profile:', userId);
  };

  const handleViewPost = (postId: string) => {
    console.log('View post:', postId);
  };

  const handleJoinChallenge = (challengeId: string) => {
    console.log('Join challenge:', challengeId);
  };

  const handleViewChallengeEntries = (challengeId: string) => {
    console.log('View challenge entries:', challengeId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-medium mb-4">
            <Users className="w-4 h-4 mr-2" />
            {t('community_page.title')}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('community_page.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {t('community_page.subtitle')}
          </p>
          
          <Button 
            onClick={() => setIsCreatePostModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            {t('community_page.create_post')}
          </Button>
        </div>

        {/* Community Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">12.5K</p>
              <p className="text-sm text-gray-600">{t('community_page.sidebar.members')}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">1.2K</p>
              <p className="text-sm text-gray-600">{t('community_page.sidebar.online')}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Camera className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">450</p>
              <p className="text-sm text-gray-600">{t('community_page.sidebar.posts')}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">23</p>
              <p className="text-sm text-gray-600">{t('community_page.challenges.title')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/80 backdrop-blur-sm p-1 rounded-xl shadow-md">
            <TabsTrigger 
              value="feed" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">{t('community_page.feed')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="gallery" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all"
            >
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">{t('community_page.gallery')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="challenges" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all"
            >
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">{t('community_page.challenges')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="featured" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">{t('community_page.featured')}</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Area */}
            <div className="flex-1">
              <TabsContent value="feed" className="mt-0">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md rounded-xl overflow-hidden">
                  <CardContent className="p-6">
                    <CommunityFeed />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery" className="mt-0">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md rounded-xl overflow-hidden">
                  <CardContent className="p-6">
                    <CommunityGallery />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="challenges" className="mt-0">
                <div className="space-y-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md rounded-xl overflow-hidden">
                    <CardContent className="p-8 text-center">
                      <Award className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                      <h2 className="text-3xl font-bold mb-2">{t('community_page.challenges.title')}</h2>
                      <p className="text-gray-600 text-lg">
                        {t('community_page.challenges.subtitle')}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {ACTIVE_CHALLENGES.map((challenge) => (
                      <ChallengeCard
                        key={challenge.id}
                        challenge={challenge}
                        onJoin={() => handleJoinChallenge(challenge.id)}
                        onViewEntries={() => handleViewChallengeEntries(challenge.id)}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="featured" className="mt-0">
                <div className="grid lg:grid-cols-2 gap-8">
                  <FeaturedSection
                    featuredArtist={FEATURED_ARTIST}
                    trendingPosts={TRENDING_POSTS}
                    onViewProfile={handleViewProfile}
                    onViewPost={handleViewPost}
                  />
                  <div className="space-y-6">
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md rounded-xl overflow-hidden">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">This Week's Highlights</h3>
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                            <h4 className="font-semibold mb-2 text-gray-900">Most Liked Creation</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              "Ethereal Dreams" by @dreamweaver received 1,247 likes this week
                            </p>
                            <img 
                              src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=200&fit=crop&auto=format" 
                              alt="Featured creation" 
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          </div>
                          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-100">
                            <h4 className="font-semibold mb-2 text-gray-900">Rising Star</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              @newartist gained 500+ followers with their amazing portrait series
                            </p>
                            <img 
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=200&fit=crop&auto=format" 
                              alt="Rising star artwork" 
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </div>

            {/* Enhanced Sidebar */}
            <div className="w-full lg:w-1/3">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md rounded-xl overflow-hidden sticky top-6">
                <CardContent className="p-0">
                  <CommunitySidebar />
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
      
      <CreatePostModal 
        isOpen={isCreatePostModalOpen} 
        onClose={() => setIsCreatePostModalOpen(false)} 
      />
      
      <Footer />
    </div>
  );
};

export default Community;
