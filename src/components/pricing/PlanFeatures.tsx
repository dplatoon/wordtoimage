
import React from 'react';
import { Check, X } from 'lucide-react';

interface Feature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

interface PlanFeaturesProps {
  features: Feature[];
}

export const PlanFeatures = ({ features }: PlanFeaturesProps) => {
  // Show only first 5 features on mobile, all on desktop
  const displayFeatures = features.slice(0, 5);
  const hasMoreFeatures = features.length > 5;

  return (
    <ul className="space-y-3 mb-6 md:mb-8" role="list">
      {displayFeatures.map((feature, index) => (
        <li key={index} className="flex items-start" role="listitem">
          {feature.included ? (
            <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
          ) : (
            <X className="h-4 w-4 md:h-5 md:w-5 text-gray-300 shrink-0 mt-0.5" aria-hidden="true" />
          )}
          <span 
            className={`ml-3 text-sm leading-relaxed ${
              feature.included ? 'text-gray-700' : 'text-gray-400'
            } ${feature.highlight ? 'font-semibold' : ''}`}
          >
            {feature.name}
          </span>
        </li>
      ))}
      {hasMoreFeatures && (
        <li className="flex items-start md:hidden">
          <span className="ml-6 text-xs text-gray-500 italic">
            +{features.length - 5} more features
          </span>
        </li>
      )}
    </ul>
  );
};
