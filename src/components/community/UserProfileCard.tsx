
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Award, Camera, Heart, MessageSquare } from 'lucide-react';

interface UserStats {
  posts: number;
  followers: number;
  following: number;
  likes: number;
}

interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  badges: string[];
  stats: UserStats;
  isFollowing?: boolean;
  isOwn?: boolean;
}

interface UserProfileCardProps {
  profile: UserProfile;
  onFollow?: () => void;
  onMessage?: () => void;
}

export const UserProfileCard = ({ profile, onFollow, onMessage }: UserProfileCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-gray-600">@{profile.username}</p>
              <div className="flex gap-2 mt-2">
                {profile.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {!profile.isOwn && (
            <div className="flex gap-2">
              <Button
                variant={profile.isFollowing ? "outline" : "default"}
                size="sm"
                onClick={onFollow}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                {profile.isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onMessage}
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Message
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700">{profile.bio}</p>
          
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1">
                <Camera className="h-4 w-4 text-gray-500" />
                <span className="font-semibold">{profile.stats.posts}</span>
              </div>
              <p className="text-xs text-gray-500">Posts</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="font-semibold">{profile.stats.followers}</span>
              </div>
              <p className="text-xs text-gray-500">Followers</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="font-semibold">{profile.stats.following}</span>
              </div>
              <p className="text-xs text-gray-500">Following</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <Heart className="h-4 w-4 text-gray-500" />
                <span className="font-semibold">{profile.stats.likes}</span>
              </div>
              <p className="text-xs text-gray-500">Likes</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
