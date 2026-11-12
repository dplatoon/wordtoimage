
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp } from 'lucide-react';

interface TrendingPost {
  id: string;
  image: string;
  title: string;
  author: string;
  likes: number;
  trending: boolean;
}

interface FeaturedSectionProps {
  trendingPosts: TrendingPost[];
  onViewPost: (postId: string) => void;
}

export const FeaturedSection = ({
  trendingPosts,
  onViewPost,
}: FeaturedSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Trending Posts */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
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
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  {index === 0 && (
                    <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                      #1 Trending
                    </Badge>
                  )}
                </div>
                <div className="mt-2">
                  <p className="font-medium text-sm truncate text-foreground">{post.title}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>AI example</span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current text-primary" aria-hidden="true" />
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
