
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
import { PlusCircle, Users, Camera, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Mock data for featured content
const FEATURED_ARTIST = {
  id: '1',
  name: 'Maya Rodriguez',
  username: 'mayar_ai',
  avatar: '/placeholder.svg',
  bio: 'Digital artist passionate about AI-generated surreal landscapes and abstract compositions.',
  followers: 2345,
  featuredImage: '/placeholder.svg',
  badge: 'Verified Artist'
};

const TRENDING_POSTS = [
  {
    id: '1',
    image: '/placeholder.svg',
    title: 'Cyberpunk Dreams',
    author: 'techartist',
    likes: 156,
    trending: true
  },
  {
    id: '2',
    image: '/placeholder.svg',
    title: 'Ocean Depths',
    author: 'deepblue',
    likes: 134,
    trending: true
  },
  {
    id: '3',
    image: '/placeholder.svg',
    title: 'Mountain Sunrise',
    author: 'naturelover',
    likes: 98,
    trending: true
  },
  {
    id: '4',
    image: '/placeholder.svg',
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
    <div className="min-h-screen bg-gray-50">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('community_page.title')}
            </h1>
            <p className="text-gray-600">
              Connect with fellow creators, share your art, and get inspired
            </p>
          </div>
          
          <Button 
            onClick={() => setIsCreatePostModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <PlusCircle className="h-5 w-5" />
            {t('community_page.create_post')}
          </Button>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="featured" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Featured
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Area */}
            <div className="flex-1">
              <TabsContent value="feed" className="mt-0">
                <CommunityFeed />
              </TabsContent>

              <TabsContent value="gallery" className="mt-0">
                <CommunityGallery />
              </TabsContent>

              <TabsContent value="challenges" className="mt-0">
                <div className="space-y-6">
                  <div className="text-center py-4">
                    <h2 className="text-2xl font-bold mb-2">Community Challenges</h2>
                    <p className="text-gray-600">
                      Participate in weekly challenges to improve your skills and win prizes
                    </p>
                  </div>
                  
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
                    <h3 className="text-xl font-bold">This Week's Highlights</h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-semibold mb-2">Most Liked Creation</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          "Ethereal Dreams" by @dreamweaver received 1,247 likes this week
                        </p>
                        <img src="/placeholder.svg" alt="Featured" className="w-full h-32 object-cover rounded" />
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-semibold mb-2">Rising Star</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          @newartist gained 500+ followers with their amazing portrait series
                        </p>
                        <img src="/placeholder.svg" alt="Rising star" className="w-full h-32 object-cover rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3">
              <CommunitySidebar />
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
