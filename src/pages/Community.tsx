import React, { useState } from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { CommunityFeed } from '@/components/community/CommunityFeed';
import { CommunitySidebar } from '@/components/community/CommunitySidebar';
import { CommunityGallery } from '@/components/community/CommunityGallery';
import { FeaturedSection } from '@/components/community/FeaturedSection';
import { WeeklyTopCreations } from '@/components/community/WeeklyTopCreations';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Camera, Award, TrendingUp, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { StructuredData } from '@/components/seo/components/StructuredData';
import { InternalLink } from '@/components/seo/InternalLink';

// Curated example images for the trending section
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


const Community = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const { t } = useTranslation();

  const handleViewPost = (postId: string) => {
    console.log('View post:', postId);
  };

  const communityStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "WordToImage Community - AI Art Gallery",
    "description": "Join thousands of AI artists sharing their creations, participating in challenges, and learning together",
    "url": "https://wordtoimage.com/community",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Weekly Top AI Art Creations",
      "numberOfItems": 10,
      "itemListElement": TRENDING_POSTS.map((post, index) => ({
        "@type": "CreativeWork",
        "position": index + 1,
        "name": post.title,
        "creator": post.author,
        "image": post.image,
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/LikeAction",
          "userInteractionCount": post.likes
        }
      }))
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "AI Artists and Creators"
    }
  };

  return (
    <div className="min-h-dvh bg-background">
      <StructuredData data={communityStructuredData} />
      
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Users className="w-4 h-4 mr-2" />
            {t('community_page.title')}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            AI Art Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A place to share AI-generated art, learn prompting techniques, and connect with other creators.
            Browse inspiration below, or check out our <InternalLink to="/prompt-guide">prompt guide</InternalLink> and
            <InternalLink to="/templates"> professional templates</InternalLink>.
          </p>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Social features coming soon — create a free account to be notified
          </div>
        </div>

        {/* Weekly Top Creations - Public Section */}
        <WeeklyTopCreations />

        {/* Community features summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Users, label: 'Community feed', detail: 'Share & discuss creations' },
            { icon: Camera, label: 'Gallery', detail: 'Browse AI-generated art' },
            { icon: Award, label: 'Challenges', detail: 'Weekly creative prompts' },
          ].map(({ icon: Icon, label, detail }) => (
            <Card key={label} className="glass-card border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Icon className="h-8 w-8 text-primary mx-auto mb-2" aria-hidden="true" />
                <p className="font-semibold text-foreground">{label}</p>
                <p className="text-sm text-muted-foreground mt-1">{detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/80 backdrop-blur-sm p-1 rounded-xl shadow-md">
            <TabsTrigger 
              value="feed" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">{t('community_page.feed')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="gallery" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">{t('community_page.gallery')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="challenges" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">{t('community_page.challenges')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="featured" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">{t('community_page.featured')}</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Area */}
            <div className="flex-1">
              <TabsContent value="feed" className="mt-0">
                <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md rounded-xl overflow-hidden">
                  <CardContent className="p-6">
                    <CommunityFeed />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery" className="mt-0">
                <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md rounded-xl overflow-hidden">
                  <CardContent className="p-6">
                    <CommunityGallery />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="challenges" className="mt-0">
                <Card className="glass-card border-primary/20">
                  <CardContent className="py-20 text-center space-y-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mx-auto">
                      <Award className="h-8 w-8 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Weekly challenges coming soon</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                      Themed creative prompts, community voting, and winner spotlights — launching with the community feed.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <InternalLink to="/auth?tab=signup">Get notified</InternalLink>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="featured" className="mt-0">
                <div className="grid lg:grid-cols-2 gap-8">
                  <FeaturedSection
                    trendingPosts={TRENDING_POSTS}
                    onViewPost={handleViewPost}
                  />
                  <Card className="glass-card border-primary/20">
                    <CardContent className="py-16 text-center space-y-4">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mx-auto">
                        <TrendingUp className="h-8 w-8 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Featured creators coming soon</h3>
                      <p className="text-muted-foreground max-w-xs mx-auto text-sm">
                        We'll spotlight community members and their work once the social feed launches.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <InternalLink to="/auth?tab=signup">Get notified</InternalLink>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>

            {/* Enhanced Sidebar */}
            <div className="w-full lg:w-1/3">
              <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md rounded-xl overflow-hidden sticky top-6">
                <CardContent className="p-0">
                  <CommunitySidebar />
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Community;
