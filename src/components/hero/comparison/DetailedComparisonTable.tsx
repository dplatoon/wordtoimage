
import React from 'react';
import { Check, X } from 'lucide-react';
import { comparisonFeatures } from './comparisonFeatures';

export const DetailedComparisonTable = () => {
  return (
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
  );
};
