
import React from 'react';
import { Star } from 'lucide-react';

export const ComparisonHeader = () => {
  return (
    <div className="text-center mb-4">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Star className="h-5 w-5 text-amber-600" />
        <h3 className="text-lg font-semibold text-gray-800">Free vs Pro Features</h3>
      </div>
      <p className="text-sm text-gray-600">
        Compare what's included in your current plan vs Pro benefits
      </p>
    </div>
  );
};
