
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Zap, Crown, Star, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface FreeVsProComparisonProps {
  onUpgradeClick: () => void;
  className?: string;
}

const comparisonFeatures = [
  {
    category: 'Image Generation',
    features: [
      { name: 'Basic AI generation', free: true, pro: true },
      { name: 'HD quality (2K+)', free: false, pro: true },
      { name: 'Watermark removal', free: false, pro: true },
      { name: 'Unlimited generations', free: false, pro: true },
      { name: 'Priority processing', free: false, pro: true },
    ]
  },
  {
    category: 'Styles & Features',
    features: [
      { name: 'Basic styles (5)', free: true, pro: false },
      { name: 'Premium styles (50+)', free: false, pro: true },
      { name: 'Custom style upload', free: false, pro: true },
      { name: 'Batch generation', free: false, pro: true },
      { name: 'Image-to-image transform', free: false, pro: true },
    ]
  },
  {
    category: 'Storage & Export',
    features: [
      { name: 'Gallery storage (10 images)', free: true, pro: false },
      { name: 'Unlimited gallery storage', free: false, pro: true },
      { name: 'High-res downloads', free: false, pro: true },
      { name: 'Bulk export', free: false, pro: true },
      { name: 'Cloud sync', free: false, pro: true },
    ]
  }
];

export const FreeVsProComparison = ({ onUpgradeClick, className = "" }: FreeVsProComparisonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();

  return (
    <Card className={`bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 ${className}`}>
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-5 w-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-gray-800">Free vs Pro Features</h3>
          </div>
          <p className="text-sm text-gray-600">
            Compare what's included in your current plan vs Pro benefits
          </p>
        </div>

        {/* Quick comparison cards */}
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

        {/* Detailed comparison toggle */}
        <div className="text-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-amber-700 hover:bg-amber-100"
          >
            {isExpanded ? 'Hide' : 'Show'} detailed comparison
            <ArrowRight className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </Button>
        </div>

        {/* Detailed comparison table */}
        {isExpanded && (
          <div className="mt-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-800">Feature</th>
                    <th className="text-center p-3 font-medium text-gray-800">Free</th>
                    <th className="text-center p-3 font-medium text-purple-600">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category) => (
                    <React.Fragment key={category.category}>
                      <tr className="bg-gray-25">
                        <td colSpan={3} className="p-3 font-semibold text-gray-700 bg-gray-50">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, index) => (
                        <tr key={index} className="border-t border-gray-100">
                          <td className="p-3 text-gray-700">{feature.name}</td>
                          <td className="p-3 text-center">
                            {feature.free ? (
                              <Check className="h-4 w-4 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-gray-400 mx-auto" />
                            )}
                          </td>
                          <td className="p-3 text-center">
                            {feature.pro ? (
                              <Check className="h-4 w-4 text-purple-600 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-gray-400 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-600 mb-2">
            ⚡ 7-day free trial • Cancel anytime • No setup fees
          </p>
          {!user && (
            <p className="text-xs text-amber-700">
              💡 <strong>Limited time:</strong> Get 50% off your first month with signup
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
