
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Award, Clock } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  theme: string;
  startDate: string;
  endDate: string;
  participants: number;
  prize: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'upcoming' | 'active' | 'ended';
}

interface ChallengeCardProps {
  challenge: Challenge;
  onJoin?: () => void;
  onViewEntries?: () => void;
}

export const ChallengeCard = ({ challenge, onJoin, onViewEntries }: ChallengeCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'ended': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = () => {
    const endDate = new Date(challenge.endDate);
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Badge className={getStatusColor(challenge.status)}>
                {challenge.status}
              </Badge>
              <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                {challenge.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-lg">{challenge.title}</CardTitle>
            <p className="text-sm text-gray-600">Theme: {challenge.theme}</p>
          </div>
          {challenge.status === 'active' && (
            <div className="text-right text-sm">
              <div className="flex items-center gap-1 text-primary">
                <Clock className="h-4 w-4" />
                <span className="font-semibold">{getDaysRemaining()} days left</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-700">{challenge.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{challenge.participants} participants</span>
            </div>
          </div>
        </div>
        
        {challenge.prize && (
          <div className="flex items-center gap-2 bg-yellow-50 p-3 rounded-lg">
            <Award className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Prize: {challenge.prize}</span>
          </div>
        )}
        
        <div className="flex gap-2 pt-2">
          {challenge.status === 'active' && (
            <Button onClick={onJoin} className="flex-1">
              Join Challenge
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={onViewEntries}
            className="flex-1"
          >
            View Entries
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
