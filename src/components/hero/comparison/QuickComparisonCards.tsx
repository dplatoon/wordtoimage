
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Crown, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface QuickComparisonCardsProps {
  onUpgradeClick: () => void;
}

export const QuickComparisonCards = ({ onUpgradeClick }: QuickComparisonCardsProps) => {
  const { user } = useAuth();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Free Plan */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="bg-gray-100 text-gray-700">Current</Badge>
          <h4 className="font-semibold text-gray-800">Free Plan</h4>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>3 AI generations per day</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Basic styles & resolution</span>
          </li>
          <li className="flex items-center gap-2">
            <X className="h-4 w-4 text-gray-400" />
            <span className="text-gray-500">HD quality downloads</span>
          </li>
          <li className="flex items-center gap-2">
            <X className="h-4 w-4 text-gray-400" />
            <span className="text-gray-500">Premium styles</span>
          </li>
        </ul>
      </div>

      {/* Pro Plan */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-4 text-white relative overflow-hidden">
        <div className="absolute top-2 right-2">
          <Crown className="h-6 w-6 text-yellow-300" />
        </div>
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-yellow-400 text-purple-900 hover:bg-yellow-300">Most Popular</Badge>
          <h4 className="font-semibold">Pro Plan</h4>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-300" />
            <span>Unlimited AI generations</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-300" />
            <span>HD quality + 50+ premium styles</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-300" />
            <span>Priority processing (3x faster)</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-300" />
            <span>Advanced features + API access</span>
          </li>
        </ul>
        
        <Button 
          className="w-full mt-4 bg-white text-purple-600 hover:bg-gray-100"
          onClick={onUpgradeClick}
        >
          <Zap className="h-4 w-4 mr-2" />
          Upgrade to Pro - $9.99/mo
        </Button>
      </div>
    </div>
  );
};
