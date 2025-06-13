
import React from 'react';
import { Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PlanHeaderProps {
  name: string;
  description: string;
  popular?: boolean;
  badge?: string;
  isCurrentPlan: boolean;
}

export const PlanHeader = ({ name, description, popular, badge, isCurrentPlan }: PlanHeaderProps) => {
  return (
    <div className="relative">
      {/* Header badges */}
      {(popular || badge) && !isCurrentPlan && (
        <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Badge 
            variant="default" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 text-xs font-semibold"
          >
            {badge || 'Most Popular'}
          </Badge>
        </div>
      )}
      
      {isCurrentPlan && (
        <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Badge 
            variant="default" 
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 text-xs font-semibold flex items-center gap-1"
          >
            <Crown className="h-3 w-3" />
            Your Plan
          </Badge>
        </div>
      )}

      {/* Plan name and description */}
      <div className="text-center mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
