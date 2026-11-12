
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Lock, Sparkles } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

interface PremiumFeatureGateProps {
  feature: string;
  requiredPlan?: 'standard' | 'pro' | 'business';
  children: React.ReactNode;
  fallback?: React.ReactNode;
  description?: string;
}

export const PremiumFeatureGate = ({ 
  feature, 
  requiredPlan = 'standard', 
  children, 
  fallback,
  description 
}: PremiumFeatureGateProps) => {
  const { currentPlan, upgradeToPlane, isPremium } = useSubscription();
  
  const hasAccess = () => {
    const planHierarchy = ['free', 'standard', 'pro', 'business'];
    const currentLevel = planHierarchy.indexOf(currentPlan.id);
    const requiredLevel = planHierarchy.indexOf(requiredPlan);
    return currentLevel >= requiredLevel;
  };

  if (hasAccess()) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <Card className="border-2 border-dashed border-border bg-gradient-to-br from-primary to-accent">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 p-3 bg-gradient-to-br from-primary to-accent rounded-full w-fit">
          <Crown className="h-6 w-6 text-purple-600" />
        </div>
        <CardTitle className="flex items-center justify-center gap-2">
          <Lock className="h-5 w-5 text-purple-600" />
          Premium Feature
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
          {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)} Plan Required
        </Badge>
        
        <div>
          <h3 className="font-semibold text-foreground">{feature}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={() => upgradeToPlane(requiredPlan)}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Upgrade to {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)}
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Unlock this feature and many more with a premium plan
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
