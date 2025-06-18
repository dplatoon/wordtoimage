
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const ComparisonFooter = () => {
  const { user } = useAuth();

  return (
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
  );
};
