import { useState } from 'react';
import { PostCard } from './PostCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';

// Mock data for demonstration
const MOCK_POSTS = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg',
    },
    content: 'Just created an amazing social media graphic using WordToImage! The AI-generated result exceeded my expectations. #DesignMagic',
    image: '/placeholder.svg',
    likes: 42,
    comments: 8,
    timestamp: '2 hours ago',
    category: 'showcase',
  },
  {
    id: '2',
    author: {
      name: 'Michael Chen',
      avatar: '/placeholder.svg',
    },
    content: 'Does anyone have tips for creating eye-catching Instagram stories? Looking for design advice that stands out!',
    image: '',
    likes: 15,
    comments: 23,
    timestamp: '4 hours ago',
    category: 'question',
  },
  {
    id: '3',
    author: {
      name: 'Priya Patel',
      avatar: '/placeholder.svg',
    },
    content: 'Here\'s a tutorial on how to create stunning gradients for your social media posts. The secret is in the color harmony!',
    image: '/placeholder.svg',
    likes: 67,
    comments: 12,
    timestamp: '1 day ago',
    category: 'tutorial',
  },
  {
    id: '4',
    author: {
      name: 'James Wilson',
      avatar: '/placeholder.svg',
    },
    content: 'Just discovered how powerful the text-to-image feature is for creating promotional content. Saved me hours of design work!',
    image: '/placeholder.svg',
    likes: 31,
    comments: 5,
    timestamp: '2 days ago',
    category: 'feedback',
  },
];

const CATEGORIES = [
  { name: 'all', label: 'categories.all' },
  { name: 'showcase', label: 'categories.showcase', color: 'bg-purple-500' },
  { name: 'question', label: 'categories.question', color: 'bg-blue-500' },
  { name: 'tutorial', label: 'categories.tutorial', color: 'bg-green-500' },
  { name: 'feedback', label: 'categories.feedback', color: 'bg-amber-500' },
];

export const CommunityFeed = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { t } = useTranslation();
  
  const filteredPosts = activeCategory === 'all' 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(post => post.category === activeCategory);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="trending">{t('community_page.trending')}</TabsTrigger>
          <TabsTrigger value="recent">{t('community_page.recent')}</TabsTrigger>
          <TabsTrigger value="following">{t('community_page.following')}</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((category) => (
            <Badge 
              key={category.name}
              variant={activeCategory === category.name ? "default" : "outline"}
              className={`cursor-pointer ${activeCategory === category.name ? category.color || '' : ''}`}
              onClick={() => setActiveCategory(category.name)}
            >
              {t(`community_page.${category.label}`)}
            </Badge>
          ))}
        </div>
        
        <TabsContent value="trending" className="mt-0">
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0">
          <div className="space-y-6">
            {[...filteredPosts].reverse().map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="following" className="mt-0">
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-gray-500 text-center">
              Follow users to see their posts here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
