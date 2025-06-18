
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ComparisonHeader } from './comparison/ComparisonHeader';
import { QuickComparisonCards } from './comparison/QuickComparisonCards';
import { DetailedComparisonTable } from './comparison/DetailedComparisonTable';
import { ComparisonFooter } from './comparison/ComparisonFooter';

interface FreeVsProComparisonProps {
  onUpgradeClick: () => void;
  className?: string;
}

export const FreeVsProComparison = ({ onUpgradeClick, className = "" }: FreeVsProComparisonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={`bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 ${className}`}>
      <CardContent className="p-6">
        <ComparisonHeader />
        <QuickComparisonCards onUpgradeClick={onUpgradeClick} />

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
        {isExpanded && <DetailedComparisonTable />}

        <ComparisonFooter />
      </CardContent>
    </Card>
  );
};
