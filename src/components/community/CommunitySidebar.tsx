
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const TRENDING_TOPICS = [
  'AI Design',
  'Social Media Tips',
  'Branding',
  'Color Theory',
  'Typography'
];

export const CommunitySidebar = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Trending Topics */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" aria-hidden="true" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {TRENDING_TOPICS.map((topic, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">#{index + 1}</span>
                <span className="text-sm text-foreground">{topic}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community — Coming Soon */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" aria-hidden="true" />
            Community
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-center">
            <Sparkles className="h-6 w-6 text-primary mx-auto mb-2" aria-hidden="true" />
            <p className="text-sm font-medium text-foreground">Social features coming soon</p>
            <p className="text-xs text-muted-foreground mt-1">
              Follow creators, share your work, and join the conversation.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link to="/auth?tab=signup">Create free account</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
