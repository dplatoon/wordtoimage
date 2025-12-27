
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Award, TrendingUp, Users } from 'lucide-react';

interface FeaturedArtist {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  featuredImage: string;
  badge: string;
}

interface TrendingPost {
  id: string;
  image: string;
  title: string;
  author: string;
  likes: number;
  trending: boolean;
}

interface FeaturedSectionProps {
  featuredArtist: FeaturedArtist;
  trendingPosts: TrendingPost[];
  onViewProfile: (userId: string) => void;
  onViewPost: (postId: string) => void;
}

export const FeaturedSection = ({ 
  featuredArtist, 
  trendingPosts, 
  onViewProfile, 
  onViewPost 
}: FeaturedSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Featured Artist */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            Featured Artist
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={featuredArtist.avatar} alt={featuredArtist.name} />
              <AvatarFallback>{featuredArtist.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{featuredArtist.name}</h3>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  <Award className="h-3 w-3 mr-1" />
                  {featuredArtist.badge}
                </Badge>
              </div>
              <p className="text-gray-600">@{featuredArtist.username}</p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                <span>{featuredArtist.followers.toLocaleString()} followers</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 text-sm">{featuredArtist.bio}</p>
          
          <div className="rounded-lg overflow-hidden">
            <img 
              src={featuredArtist.featuredImage} 
              alt="Featured work" 
              className="w-full h-48 object-cover"
            />
          </div>
          
          <Button 
            onClick={() => onViewProfile(featuredArtist.id)}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            View Profile
          </Button>
        </CardContent>
      </Card>

      {/* Trending Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {trendingPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="relative group cursor-pointer"
                onClick={() => onViewPost(post.id)}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  {index === 0 && (
                    <Badge className="absolute top-2 left-2 bg-primary">
                      #1 Trending
                    </Badge>
                  )}
                </div>
                <div className="mt-2">
                  <p className="font-medium text-sm truncate">{post.title}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>by {post.author}</span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      {post.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
