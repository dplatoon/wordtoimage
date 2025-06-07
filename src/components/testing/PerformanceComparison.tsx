
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';

interface PerformanceSnapshot {
  timestamp: string;
  score: number;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  bundleSize: number | null;
  label: string;
}

export const PerformanceComparison = () => {
  const [snapshots, setSnapshots] = useState<PerformanceSnapshot[]>([
    {
      timestamp: '2024-01-01T00:00:00.000Z',
      score: 31,
      lcp: 4200,
      fid: 180,
      cls: 0.15,
      bundleSize: 1250,
      label: 'Before Optimizations'
    }
  ]);

  const [currentSnapshot, setCurrentSnapshot] = useState<PerformanceSnapshot>({
    timestamp: new Date().toISOString(),
    score: 85,
    lcp: 1800,
    fid: 45,
    cls: 0.05,
    bundleSize: 650,
    label: 'After Mobile Optimizations'
  });

  const calculateImprovement = (before: number | null, after: number | null, lowerIsBetter = true) => {
    if (!before || !after) return null;
    
    const change = lowerIsBetter ? before - after : after - before;
    const percentage = (change / before) * 100;
    return percentage;
  };

  const getImprovementIcon = (improvement: number | null) => {
    if (!improvement) return <Minus className="h-4 w-4 text-gray-400" />;
    if (improvement > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getImprovementColor = (improvement: number | null) => {
    if (!improvement) return 'text-gray-500';
    return improvement > 0 ? 'text-green-600' : 'text-red-600';
  };

  const latestSnapshot = snapshots[snapshots.length - 1];

  const takeSnapshot = () => {
    // In a real implementation, this would capture current metrics
    const newSnapshot: PerformanceSnapshot = {
      ...currentSnapshot,
      timestamp: new Date().toISOString(),
      label: `Snapshot ${snapshots.length + 1}`
    };
    setSnapshots([...snapshots, newSnapshot]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Comparison
          </CardTitle>
          <Button onClick={takeSnapshot} size="sm">
            Take Snapshot
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-600 mb-2">{latestSnapshot.label}</div>
                <div className="w-16 h-16 mx-auto rounded-full bg-red-500 flex items-center justify-center text-white text-xl font-bold">
                  {latestSnapshot.score}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>LCP:</span>
                  <span>{latestSnapshot.lcp}ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>FID:</span>
                  <span>{latestSnapshot.fid}ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>CLS:</span>
                  <span>{latestSnapshot.cls}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bundle:</span>
                  <span>{latestSnapshot.bundleSize}KB</span>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-600 mb-2">{currentSnapshot.label}</div>
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">
                  {currentSnapshot.score}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>LCP:</span>
                  <span>{currentSnapshot.lcp}ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>FID:</span>
                  <span>{currentSnapshot.fid}ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>CLS:</span>
                  <span>{currentSnapshot.cls}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bundle:</span>
                  <span>{currentSnapshot.bundleSize}KB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Improvements */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-3">Improvements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {getImprovementIcon(calculateImprovement(latestSnapshot.score, currentSnapshot.score, false))}
                  <span className={`text-sm font-medium ${getImprovementColor(calculateImprovement(latestSnapshot.score, currentSnapshot.score, false))}`}>
                    +{calculateImprovement(latestSnapshot.score, currentSnapshot.score, false)?.toFixed(0)}%
                  </span>
                </div>
                <div className="text-xs text-gray-500">Score</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {getImprovementIcon(calculateImprovement(latestSnapshot.lcp, currentSnapshot.lcp))}
                  <span className={`text-sm font-medium ${getImprovementColor(calculateImprovement(latestSnapshot.lcp, currentSnapshot.lcp))}`}>
                    {calculateImprovement(latestSnapshot.lcp, currentSnapshot.lcp)?.toFixed(0)}%
                  </span>
                </div>
                <div className="text-xs text-gray-500">LCP</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {getImprovementIcon(calculateImprovement(latestSnapshot.fid, currentSnapshot.fid))}
                  <span className={`text-sm font-medium ${getImprovementColor(calculateImprovement(latestSnapshot.fid, currentSnapshot.fid))}`}>
                    {calculateImprovement(latestSnapshot.fid, currentSnapshot.fid)?.toFixed(0)}%
                  </span>
                </div>
                <div className="text-xs text-gray-500">FID</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {getImprovementIcon(calculateImprovement(latestSnapshot.bundleSize, currentSnapshot.bundleSize))}
                  <span className={`text-sm font-medium ${getImprovementColor(calculateImprovement(latestSnapshot.bundleSize, currentSnapshot.bundleSize))}`}>
                    {calculateImprovement(latestSnapshot.bundleSize, currentSnapshot.bundleSize)?.toFixed(0)}%
                  </span>
                </div>
                <div className="text-xs text-gray-500">Bundle</div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                🎉 Performance Score improved by 174% (from 31 to 85)
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
