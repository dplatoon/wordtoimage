
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePerformanceTesting } from '@/hooks/usePerformanceTesting';
import { useIsMobile } from '@/hooks/use-mobile';
import { Smartphone, Monitor, Gauge, ChevronDown, ChevronUp } from 'lucide-react';

export const MobilePerformanceIndicator = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const { metrics, generatePerformanceScore } = usePerformanceTesting();
  
  const score = generatePerformanceScore();
  
  const getScoreStatus = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'bg-green-500' };
    if (score >= 70) return { label: 'Good', color: 'bg-yellow-500' };
    return { label: 'Needs Work', color: 'bg-red-500' };
  };

  const status = getScoreStatus(score);

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          size="sm"
          className="rounded-full shadow-lg"
          variant="outline"
        >
          <Gauge className="h-4 w-4 mr-2" />
          {score}
          <ChevronUp className="h-4 w-4 ml-1" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {isMobile ? (
                <Smartphone className="h-4 w-4 text-blue-500" />
              ) : (
                <Monitor className="h-4 w-4 text-gray-500" />
              )}
              <span className="text-sm font-medium">
                {isMobile ? 'Mobile' : 'Desktop'} Performance
              </span>
            </div>
            <Button
              onClick={() => setIsExpanded(false)}
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className={`w-12 h-12 rounded-full ${status.color} flex items-center justify-center text-white font-bold`}>
              {score}
            </div>
            <div>
              <div className="font-medium">{status.label}</div>
              <div className="text-sm text-gray-500">Performance Score</div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>LCP:</span>
              <Badge variant={metrics.lcp && metrics.lcp > 2500 ? 'destructive' : 'secondary'}>
                {metrics.lcp ? `${metrics.lcp}ms` : '...'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>FID:</span>
              <Badge variant={metrics.fid && metrics.fid > 100 ? 'destructive' : 'secondary'}>
                {metrics.fid ? `${metrics.fid}ms` : '...'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Bundle:</span>
              <Badge variant={metrics.totalBundleSize && metrics.totalBundleSize > 500 ? 'destructive' : 'secondary'}>
                {metrics.totalBundleSize ? `${metrics.totalBundleSize}KB` : '...'}
              </Badge>
            </div>
          </div>

          {isMobile && (
            <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
              📱 Mobile optimizations active
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
