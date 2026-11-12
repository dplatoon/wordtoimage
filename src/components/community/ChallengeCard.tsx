
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  theme: string;
  startDate: string;
  endDate: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'upcoming' | 'active' | 'ended';
}

interface ChallengeCardProps {
  challenge: Challenge;
}

const DIFFICULTY_LABEL: Record<Challenge['difficulty'], string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const STATUS_LABEL: Record<Challenge['status'], string> = {
  upcoming: 'Upcoming',
  active: 'Active',
  ended: 'Ended',
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const getDaysRemaining = (endDate: string) => {
  const diff = new Date(endDate).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 3600 * 24));
};

export const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  const daysLeft = getDaysRemaining(challenge.endDate);

  return (
    <Card className="glass-card border-primary/20 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Badge variant={challenge.status === 'active' ? 'default' : 'outline'}>
                {STATUS_LABEL[challenge.status]}
              </Badge>
              <Badge variant="outline">
                {DIFFICULTY_LABEL[challenge.difficulty]}
              </Badge>
            </div>
            <CardTitle className="text-lg text-foreground">{challenge.title}</CardTitle>
            <p className="text-sm text-muted-foreground">Theme: {challenge.theme}</p>
          </div>
          {challenge.status === 'active' && daysLeft > 0 && (
            <div className="text-right text-sm">
              <div className="flex items-center gap-1 text-primary">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span className="font-semibold">{daysLeft} days left</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">{challenge.description}</p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          <span>{formatDate(challenge.startDate)} – {formatDate(challenge.endDate)}</span>
        </div>
      </CardContent>
    </Card>
  );
};
