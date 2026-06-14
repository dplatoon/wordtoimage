import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CommunityFeed = () => {
  return (
    <div className="space-y-6">
      <Card className="glass-card border-primary/20">
        <CardContent className="py-16 text-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mx-auto">
            <Users className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Community feed coming soon</h3>
          <p className="text-muted-foreground max-w-sm mx-auto text-sm">
            Share your AI creations, comment on others' work, and connect with fellow creators. Sign up to be notified when it launches.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button variant="neon" asChild>
              <Link to="/auth?tab=signup">
                <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
                Create free account
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/text-to-image">Start generating</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
