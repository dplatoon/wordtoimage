
import React, { useState } from 'react';
import { GalleryGrid } from '@/components/hero/gallery/GalleryGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Heart, Eye, MessageSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CommunityImage {
  url: string;
  prompt: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  likes: number;
  views: number;
  comments: number;
  tags: string[];
  createdAt: string;
  featured?: boolean;
}

// Mock data for demonstration
const MOCK_GALLERY_IMAGES: CommunityImage[] = [
  {
    url: '/placeholder.svg',
    prompt: 'A mystical forest with glowing trees and magical creatures',
    author: {
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg',
      username: 'sarahj'
    },
    likes: 234,
    views: 1456,
    comments: 23,
    tags: ['fantasy', 'nature', 'magical'],
    createdAt: '2024-01-15',
    featured: true
  },
  {
    url: '/placeholder.svg',
    prompt: 'Futuristic city skyline with flying cars at sunset',
    author: {
      name: 'Alex Chen',
      avatar: '/placeholder.svg',
      username: 'alexc'
    },
    likes: 189,
    views: 892,
    comments: 15,
    tags: ['sci-fi', 'cityscape', 'futuristic'],
    createdAt: '2024-01-14'
  },
  // Add more mock images...
];

const FILTER_OPTIONS = [
  { label: 'Most Recent', value: 'recent' },
  { label: 'Most Liked', value: 'liked' },
  { label: 'Most Viewed', value: 'viewed' },
  { label: 'Most Commented', value: 'commented' },
];

const TAG_CATEGORIES = [
  'fantasy', 'sci-fi', 'nature', 'portrait', 'abstract', 
  'landscape', 'animals', 'architecture', 'art', 'digital'
];

export const CommunityGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('recent');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const toggleFavorite = (imageUrl: string) => {
    setFavorites(prev => 
      prev.includes(imageUrl)
        ? prev.filter(url => url !== imageUrl)
        : [...prev, imageUrl]
    );
  };

  const filteredImages = MOCK_GALLERY_IMAGES.filter(image => {
    const matchesSearch = image.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => image.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const handleDownload = (imageUrl: string) => {
    console.log('Download image:', imageUrl);
  };

  const handleShare = (imageUrl: string) => {
    console.log('Share image:', imageUrl);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by prompt, artist, or style..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Sort by: {FILTER_OPTIONS.find(opt => opt.value === selectedFilter)?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {FILTER_OPTIONS.map((option) => (
                <DropdownMenuItem 
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Tag Filters */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Filter by tags:</h3>
          <div className="flex flex-wrap gap-2">
            {TAG_CATEGORIES.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Images</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div key={index} className="group relative">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  
                  {/* Overlay with stats */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      {image.featured && (
                        <Badge className="bg-yellow-500">Featured</Badge>
                      )}
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full bg-white/90"
                        onClick={() => toggleFavorite(image.url)}
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(image.url) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-4 text-white text-sm">
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {image.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {image.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {image.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Image info */}
                <div className="mt-3 space-y-2">
                  <p className="text-sm font-medium line-clamp-2">{image.prompt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={image.author.avatar}
                        alt={image.author.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-600">@{image.author.username}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(image.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {image.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          <div className="text-center py-8">
            <p className="text-gray-500">Featured images will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="following" className="mt-6">
          <div className="text-center py-8">
            <p className="text-gray-500">Images from people you follow will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
