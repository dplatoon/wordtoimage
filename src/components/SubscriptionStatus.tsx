
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { format } from 'date-fns';
import { Crown, Settings, RefreshCw } from 'lucide-react';

export const SubscriptionStatus = () => {
  const { subscribed, planName, currentPeriodEnd, isLoading, checkSubscription, openCustomerPortal } = useSubscription();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getPlanBadgeVariant = (plan: string) => {
    switch (plan) {
      case 'Standard':
        return 'default';
      case 'Pro':
        return 'default';
      case 'Business':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {subscribed && <Crown className="h-5 w-5 text-yellow-600" />}
            Subscription Status
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={checkSubscription}
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Current Plan:</span>
          <Badge variant={getPlanBadgeVariant(planName)}>{planName}</Badge>
        </div>
        
        {subscribed && currentPeriodEnd && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Renews:</span>
            <span className="text-sm font-medium">{formatDate(currentPeriodEnd)}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status:</span>
          <Badge variant={subscribed ? 'default' : 'secondary'}>
            {subscribed ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        {subscribed && (
          <Button
            variant="outline"
            onClick={openCustomerPortal}
            className="w-full mt-4"
          >
            <Settings className="h-4 w-4 mr-2" />
            Manage Subscription
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
