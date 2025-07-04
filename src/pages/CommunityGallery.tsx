import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Eye, Share2, Search, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';

interface CommunityImage {
  id: string;
  image_url: string;
  prompt: string;
  likes_count: number;
  views_count: number;
  featured: boolean;
  created_at: string;
  user_id: string;
  user_liked?: boolean;
}

export default function CommunityGallery() {
  const { user } = useAuth();
  const [images, setImages] = useState<CommunityImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('recent');

  useEffect(() => {
    fetchCommunityImages();
  }, [selectedTab, user]);

  const fetchCommunityImages = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('image_generations')
        .select('id, image_url, prompt, likes_count, views_count, featured, created_at, user_id')
        .eq('is_public', true);

      // Apply sorting based on selected tab
      switch (selectedTab) {
        case 'featured':
          query = query.eq('featured', true).order('created_at', { ascending: false });
          break;
        case 'popular':
          query = query.order('likes_count', { ascending: false });
          break;
        case 'recent':
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }

      const { data, error } = await query.limit(50);

      if (error) throw error;

      // Check which images current user has liked
      let imagesWithLikes = data || [];
      if (user) {
        const { data: likedImages } = await supabase
          .from('image_likes')
          .select('image_id')
          .eq('user_id', user.id);

        const likedImageIds = new Set(likedImages?.map(like => like.image_id) || []);
        imagesWithLikes = (data || []).map(img => ({
          ...img,
          user_liked: likedImageIds.has(img.id)
        }));
      }

      setImages(imagesWithLikes);
    } catch (error) {
      console.error('Error fetching community images:', error);
      toast.error('Failed to load community gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (imageId: string, currentlyLiked: boolean) => {
    if (!user) {
      toast.error('Please sign in to like images');
      return;
    }

    try {
      if (currentlyLiked) {
        await supabase
          .from('image_likes')
          .delete()
          .eq('user_id', user.id)
          .eq('image_id', imageId);
      } else {
        await supabase
          .from('image_likes')
          .insert({ user_id: user.id, image_id: imageId });
      }

      // Update local state
      setImages(prev => prev.map(img => 
        img.id === imageId 
          ? { 
              ...img, 
              user_liked: !currentlyLiked,
              likes_count: currentlyLiked ? img.likes_count - 1 : img.likes_count + 1
            }
          : img
      ));
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    }
  };

  const handleImageView = async (imageId: string) => {
    try {
      await supabase.rpc('increment_image_views', { image_uuid: imageId });
      
      // Update local view count
      setImages(prev => prev.map(img => 
        img.id === imageId 
          ? { ...img, views_count: img.views_count + 1 }
          : img
      ));
    } catch (error) {
      console.error('Error incrementing view:', error);
    }
  };

  const handleShare = (image: CommunityImage) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this AI-generated image!',
        text: `"${image.prompt}" - Created with WordToImage AI`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const filteredImages = images.filter(img =>
    img.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <EnhancedSEOManager 
        pageContent={{
          h1: "Community Gallery - AI Generated Art Showcase",
          h2Headings: [
            "Discover Amazing AI Art",
            "Featured Creations",
            "Popular AI Artworks"
          ]
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Community Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover incredible AI-generated artwork from our creative community. 
            Get inspired and share your own masterpieces.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search by prompt or style..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Image Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div key={image.id} className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Featured Badge */}
                {image.featured && (
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-yellow-500 text-white">Featured</Badge>
                  </div>
                )}

                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.prompt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 cursor-pointer"
                    onClick={() => handleImageView(image.id)}
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                    {image.prompt}
                  </p>
                  

                  {/* User Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-violet-600">AI</span>
                    </div>
                    <span className="text-xs text-gray-600">Community Creator</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleLike(image.id, image.user_liked || false)}
                        className={`flex items-center gap-1 ${
                          image.user_liked ? 'text-red-500' : 'text-gray-500'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${image.user_liked ? 'fill-current' : ''}`} />
                        <span className="text-xs">{image.likes_count}</span>
                      </Button>
                      
                      <div className="flex items-center gap-1 text-gray-500">
                        <Eye className="h-4 w-4" />
                        <span className="text-xs">{image.views_count}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleShare(image)}
                      className="text-gray-500"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredImages.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'No images found matching your search.' : 'No public images available yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}