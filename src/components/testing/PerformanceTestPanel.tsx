
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePerformanceTesting } from '@/hooks/usePerformanceTesting';
import { Activity, Clock, Zap, Database, Wifi, Download } from 'lucide-react';

export const PerformanceTestPanel = () => {
  const { 
    metrics, 
    isTestingComplete, 
    runPerformanceTest, 
    generatePerformanceScore,
    exportResults,
    generateRecommendations
  } = usePerformanceTesting();

  const score = generatePerformanceScore();
  const recommendations = generateRecommendations();

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getMetricColor = (value: number, good: number, poor: number) => {
    if (value <= good) return 'text-green-600';
    if (value <= poor) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Performance Test Results
          </CardTitle>
          <Button onClick={runPerformanceTest} size="sm">
            Re-run Test
          </Button>
        </CardHeader>
        <CardContent>
          {!isTestingComplete ? (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              Running performance analysis...
            </div>
          ) : (
            <div className="space-y-4">
              {/* Performance Score */}
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-white text-2xl font-bold ${getScoreColor(score)}`}>
                  {score}
                </div>
                <p className="text-sm text-gray-600 mt-2">Performance Score</p>
              </div>

              {/* Core Web Vitals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">LCP</span>
                    </div>
                    <div className={`text-2xl font-bold ${metrics.lcp ? getMetricColor(metrics.lcp, 2500, 4000) : ''}`}>
                      {metrics.lcp ? `${metrics.lcp}ms` : 'Measuring...'}
                    </div>
                    <p className="text-xs text-gray-500">Largest Contentful Paint</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4" />
                      <span className="text-sm font-medium">FID</span>
                    </div>
                    <div className={`text-2xl font-bold ${metrics.fid ? getMetricColor(metrics.fid, 100, 300) : ''}`}>
                      {metrics.fid ? `${metrics.fid}ms` : 'Measuring...'}
                    </div>
                    <p className="text-xs text-gray-500">First Input Delay</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4" />
                      <span className="text-sm font-medium">CLS</span>
                    </div>
                    <div className={`text-2xl font-bold ${metrics.cls ? getMetricColor(metrics.cls * 1000, 100, 250) : ''}`}>
                      {metrics.cls ? metrics.cls.toFixed(3) : 'Measuring...'}
                    </div>
                    <p className="text-xs text-gray-500">Cumulative Layout Shift</p>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold">{metrics.fcp ? `${metrics.fcp}ms` : '...'}</div>
                  <div className="text-xs text-gray-500">FCP</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{metrics.ttfb ? `${metrics.ttfb}ms` : '...'}</div>
                  <div className="text-xs text-gray-500">TTFB</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{metrics.totalBundleSize ? `${metrics.totalBundleSize}KB` : '...'}</div>
                  <div className="text-xs text-gray-500">Bundle Size</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{metrics.resourceCount || '...'}</div>
                  <div className="text-xs text-gray-500">Resources</div>
                </div>
              </div>

              {/* Memory Usage */}
              {metrics.memoryUsage && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="h-4 w-4" />
                      <span className="text-sm font-medium">Memory Usage</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-semibold">{metrics.memoryUsage.used}MB</div>
                        <div className="text-gray-500">Used</div>
                      </div>
                      <div>
                        <div className="font-semibold">{metrics.memoryUsage.total}MB</div>
                        <div className="text-gray-500">Total</div>
                      </div>
                      <div>
                        <div className="font-semibold">{metrics.memoryUsage.limit}MB</div>
                        <div className="text-gray-500">Limit</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Connection Info */}
              {metrics.connectionType && (
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4" />
                  <span className="text-sm">Connection: </span>
                  <Badge variant="outline">{metrics.connectionType}</Badge>
                </div>
              )}

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Export Button */}
              <Button onClick={exportResults} variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Results to Console
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
