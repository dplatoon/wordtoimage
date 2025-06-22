
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, TrendingDown, Activity, Zap, Eye, BarChart3 } from 'lucide-react';

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: Date;
  recommendation?: string;
}

interface PerformanceInsight {
  type: 'improvement' | 'warning' | 'critical';
  message: string;
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
}

export const EnhancedWebVitalsMonitor = () => {
  const [metrics, setMetrics] = useState<WebVitalMetric[]>([]);
  const [insights, setInsights] = useState<PerformanceInsight[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [overallScore, setOverallScore] = useState(0);

  const thresholds = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 }
  };

  const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const threshold = thresholds[name as keyof typeof thresholds];
    if (!threshold) return 'good';
    
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const getRecommendation = (name: string, value: number, rating: string): string => {
    if (rating === 'good') return 'Performance is optimal';
    
    switch (name) {
      case 'LCP':
        return value > 4000 
          ? 'Critical: Optimize images, implement resource hints, use CDN'
          : 'Consider image optimization and critical resource prioritization';
      case 'FID':
        return value > 300
          ? 'Critical: Reduce JavaScript execution time, implement code splitting'
          : 'Optimize JavaScript execution and reduce main thread blocking';
      case 'CLS':
        return value > 0.25
          ? 'Critical: Reserve space for dynamic content, avoid layout shifts'
          : 'Minimize layout shifts and ensure stable visual elements';
      case 'FCP':
        return 'Optimize critical rendering path and reduce server response time';
      case 'TTFB':
        return 'Implement caching strategies and optimize server performance';
      default:
        return 'Monitor and optimize this metric for better user experience';
    }
  };

  const generateInsights = (currentMetrics: WebVitalMetric[]): PerformanceInsight[] => {
    const newInsights: PerformanceInsight[] = [];
    
    const poorMetrics = currentMetrics.filter(m => m.rating === 'poor');
    const needsImprovementMetrics = currentMetrics.filter(m => m.rating === 'needs-improvement');
    
    if (poorMetrics.length > 0) {
      newInsights.push({
        type: 'critical',
        message: `${poorMetrics.length} critical performance issues detected`,
        impact: 'high',
        actionable: true
      });
    }
    
    if (needsImprovementMetrics.length > 2) {
      newInsights.push({
        type: 'warning',
        message: `Multiple metrics need improvement for better user experience`,
        impact: 'medium',
        actionable: true
      });
    }
    
    // Check for trends (if we have historical data)
    const lcpMetrics = currentMetrics.filter(m => m.name === 'LCP');
    if (lcpMetrics.length > 1) {
      const latest = lcpMetrics[lcpMetrics.length - 1];
      const previous = lcpMetrics[lcpMetrics.length - 2];
      
      if (latest.value > previous.value * 1.1) {
        newInsights.push({
          type: 'warning',
          message: 'LCP performance is degrading - investigate recent changes',
          impact: 'medium',
          actionable: true
        });
      }
    }
    
    return newInsights;
  };

  const calculateOverallScore = (currentMetrics: WebVitalMetric[]): number => {
    if (currentMetrics.length === 0) return 0;
    
    const scores = currentMetrics.map(metric => {
      switch (metric.rating) {
        case 'good': return 100;
        case 'needs-improvement': return 70;
        case 'poor': return 30;
        default: return 50;
      }
    });
    
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const startMonitoring = () => {
    setIsMonitoring(true);
    
    if (!('PerformanceObserver' in window)) {
      setInsights([{
        type: 'warning',
        message: 'Performance monitoring not supported in this browser',
        impact: 'medium',
        actionable: false
      }]);
      return;
    }

    try {
      // LCP Observer
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        if (lastEntry) {
          const metric: WebVitalMetric = {
            name: 'LCP',
            value: lastEntry.startTime,
            rating: getRating('LCP', lastEntry.startTime),
            timestamp: new Date(),
            recommendation: getRecommendation('LCP', lastEntry.startTime, getRating('LCP', lastEntry.startTime))
          };
          
          setMetrics(prev => [...prev.filter(m => m.name !== 'LCP'), metric]);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FID Observer
      const fidObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          const metric: WebVitalMetric = {
            name: 'FID',
            value: fid,
            rating: getRating('FID', fid),
            timestamp: new Date(),
            recommendation: getRecommendation('FID', fid, getRating('FID', fid))
          };
          
          setMetrics(prev => [...prev.filter(m => m.name !== 'FID'), metric]);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // CLS Observer
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        const metric: WebVitalMetric = {
          name: 'CLS',
          value: clsValue,
          rating: getRating('CLS', clsValue),
          timestamp: new Date(),
          recommendation: getRecommendation('CLS', clsValue, getRating('CLS', clsValue))
        };
        
        setMetrics(prev => [...prev.filter(m => m.name !== 'CLS'), metric]);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

    } catch (error) {
      console.warn('Performance monitoring setup failed:', error);
      setInsights([{
        type: 'warning',
        message: 'Failed to initialize performance monitoring',
        impact: 'low',
        actionable: false
      }]);
    }
  };

  useEffect(() => {
    if (metrics.length > 0) {
      const newInsights = generateInsights(metrics);
      setInsights(newInsights);
      setOverallScore(calculateOverallScore(metrics));
    }
  }, [metrics]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRatingBadgeVariant = (rating: string) => {
    switch (rating) {
      case 'good': return 'default';
      case 'needs-improvement': return 'secondary';
      case 'poor': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Enhanced Core Web Vitals Monitor
          </CardTitle>
          <Button 
            onClick={startMonitoring} 
            disabled={isMonitoring}
            size="sm"
          >
            {isMonitoring ? 'Monitoring...' : 'Start Monitoring'}
          </Button>
        </CardHeader>
        <CardContent>
          {overallScore > 0 && (
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-2xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}
              </div>
              <p className="text-sm text-gray-600 mt-2">Overall Performance Score</p>
            </div>
          )}

          {metrics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {metrics.map((metric) => (
                <Card key={metric.name} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{metric.name}</span>
                    <Badge variant={getRatingBadgeVariant(metric.rating)}>
                      {metric.rating}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mb-2">
                    {metric.name === 'CLS' 
                      ? metric.value.toFixed(3)
                      : `${Math.round(metric.value)}ms`
                    }
                  </div>
                  <p className="text-xs text-gray-600">{metric.recommendation}</p>
                </Card>
              ))}
            </div>
          )}

          {insights.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium">Performance Insights</h3>
              {insights.map((insight, index) => (
                <Alert key={index} className={
                  insight.type === 'critical' ? 'border-red-200 bg-red-50' :
                  insight.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                  'border-blue-200 bg-blue-50'
                }>
                  <div className="flex items-center gap-2">
                    {insight.type === 'critical' && <TrendingDown className="h-4 w-4 text-red-500" />}
                    {insight.type === 'warning' && <Eye className="h-4 w-4 text-yellow-500" />}
                    {insight.type === 'improvement' && <TrendingUp className="h-4 w-4 text-green-500" />}
                    <AlertDescription>{insight.message}</AlertDescription>
                  </div>
                </Alert>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
