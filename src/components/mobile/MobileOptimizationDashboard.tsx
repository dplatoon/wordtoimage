import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Wifi, 
  WifiOff, 
  Download, 
  Upload, 
  Zap, 
  Battery,
  Signal,
  Cpu,
  HardDrive,
  Activity,
  RefreshCw,
  Settings,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/utils/analytics';

interface DeviceMetrics {
  deviceType: 'mobile' | 'tablet' | 'desktop';
  screenSize: { width: number; height: number };
  pixelRatio: number;
  connection: {
    type: string;
    downlink: number;
    rtt: number;
    effectiveType: string;
  };
  performance: {
    memory: number;
    processorCores: number;
    storageEstimate: number;
  };
  battery?: {
    level: number;
    charging: boolean;
  };
  capabilities: {
    webgl: boolean;
    webworkers: boolean;
    serviceWorker: boolean;
    localStorage: boolean;
    indexedDB: boolean;
  };
}

interface OptimizationSettings {
  imageQuality: 'auto' | 'low' | 'medium' | 'high';
  cacheStrategy: 'aggressive' | 'moderate' | 'minimal';
  prefetchEnabled: boolean;
  offlineMode: boolean;
  reducedMotion: boolean;
  compressTransfer: boolean;
}

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionToNextPaint: number;
  cumulativeLayoutShift: number;
  largestContentfulPaint: number;
  firstContentfulPaint: number;
}

export const MobileOptimizationDashboard = () => {
  const [deviceMetrics, setDeviceMetrics] = useState<DeviceMetrics | null>(null);
  const [optimizationSettings, setOptimizationSettings] = useState<OptimizationSettings>({
    imageQuality: 'auto',
    cacheStrategy: 'moderate',
    prefetchEnabled: true,
    offlineMode: false,
    reducedMotion: false,
    compressTransfer: true
  });
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationScore, setOptimizationScore] = useState(0);

  useEffect(() => {
    detectDeviceCapabilities();
    measurePerformance();
    loadOptimizationSettings();
  }, []);

  const detectDeviceCapabilities = async () => {
    try {
      const deviceType = getDeviceType();
      const screenSize = { width: window.screen.width, height: window.screen.height };
      const pixelRatio = window.devicePixelRatio || 1;

      // Network information
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection || {};
      
      // Performance capabilities
      const memory = (performance as any).memory?.usedJSHeapSize || 0;
      const processorCores = navigator.hardwareConcurrency || 4;
      
      let storageEstimate = 0;
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        storageEstimate = estimate.quota || 0;
      }

      // Battery information
      let battery = null;
      if ('getBattery' in navigator) {
        const batteryManager = await (navigator as any).getBattery();
        battery = {
          level: batteryManager.level,
          charging: batteryManager.charging
        };
      }

      // Feature capabilities
      const capabilities = {
        webgl: !!getWebGLContext(),
        webworkers: typeof Worker !== 'undefined',
        serviceWorker: 'serviceWorker' in navigator,
        localStorage: typeof localStorage !== 'undefined',
        indexedDB: 'indexedDB' in window
      };

      const metrics: DeviceMetrics = {
        deviceType,
        screenSize,
        pixelRatio,
        connection: {
          type: connection.type || 'unknown',
          downlink: connection.downlink || 0,
          rtt: connection.rtt || 0,
          effectiveType: connection.effectiveType || 'unknown'
        },
        performance: {
          memory: memory / 1024 / 1024, // Convert to MB
          processorCores,
          storageEstimate: storageEstimate / 1024 / 1024 / 1024 // Convert to GB
        },
        battery,
        capabilities
      };

      setDeviceMetrics(metrics);
      calculateOptimizationScore(metrics);
      
    } catch (error) {
      console.error('Error detecting device capabilities:', error);
    }
  };

  const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    const width = window.screen.width;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const getWebGLContext = () => {
    try {
      const canvas = document.createElement('canvas');
      return canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    } catch (error) {
      return null;
    }
  };

  const measurePerformance = () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const metrics: PerformanceMetrics = {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        renderTime: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        interactionToNextPaint: 0, // Would need to measure with PerformanceObserver
        cumulativeLayoutShift: 0, // Would need to measure with PerformanceObserver
        largestContentfulPaint: 0, // Would need to measure with PerformanceObserver
        firstContentfulPaint: 0 // Would need to measure with PerformanceObserver
      };

      // Use PerformanceObserver for Web Vitals if available
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
              metrics.largestContentfulPaint = entry.startTime;
            } else if (entry.entryType === 'first-contentful-paint') {
              metrics.firstContentfulPaint = entry.startTime;
            } else if (entry.entryType === 'layout-shift') {
              metrics.cumulativeLayoutShift += (entry as any).value;
            }
          });
          setPerformanceMetrics({ ...metrics });
        });

        try {
          observer.observe({ entryTypes: ['largest-contentful-paint', 'first-contentful-paint', 'layout-shift'] });
        } catch (error) {
          console.log('Some performance metrics not available');
        }
      }

      setPerformanceMetrics(metrics);
    }
  };

  const calculateOptimizationScore = (metrics: DeviceMetrics) => {
    let score = 100;

    // Reduce score based on device limitations
    if (metrics.deviceType === 'mobile') score -= 10;
    if (metrics.connection.effectiveType === 'slow-2g' || metrics.connection.effectiveType === '2g') score -= 30;
    if (metrics.connection.effectiveType === '3g') score -= 15;
    if (metrics.performance.memory < 1000) score -= 20; // Less than 1GB RAM
    if (metrics.performance.processorCores < 4) score -= 10;
    if (metrics.battery && metrics.battery.level < 0.2) score -= 15; // Low battery
    if (!metrics.capabilities.webgl) score -= 10;
    if (!metrics.capabilities.serviceWorker) score -= 5;

    setOptimizationScore(Math.max(0, score));
  };

  const loadOptimizationSettings = () => {
    try {
      const saved = localStorage.getItem('mobileOptimizationSettings');
      if (saved) {
        setOptimizationSettings(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading optimization settings:', error);
    }
  };

  const saveOptimizationSettings = (settings: OptimizationSettings) => {
    localStorage.setItem('mobileOptimizationSettings', JSON.stringify(settings));
    setOptimizationSettings(settings);
    applyOptimizations(settings);
  };

  const applyOptimizations = async (settings: OptimizationSettings) => {
    setIsOptimizing(true);
    
    try {
      // Apply image quality settings
      document.documentElement.style.setProperty('--image-quality', settings.imageQuality);
      
      // Apply reduced motion
      if (settings.reducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      } else {
        document.documentElement.style.removeProperty('--animation-duration');
      }
      
      // Configure service worker for caching strategy
      if ('serviceWorker' in navigator && settings.cacheStrategy !== 'minimal') {
        try {
          await navigator.serviceWorker.register('/sw.js');
          const registration = await navigator.serviceWorker.ready;
          registration.active?.postMessage({
            type: 'CACHE_STRATEGY',
            strategy: settings.cacheStrategy
          });
        } catch (error) {
          console.error('Service worker registration failed:', error);
        }
      }
      
      // Enable/disable prefetching
      const prefetchLinks = document.querySelectorAll('link[rel="prefetch"]');
      prefetchLinks.forEach(link => {
        if (settings.prefetchEnabled) {
          link.removeAttribute('disabled');
        } else {
          link.setAttribute('disabled', 'true');
        }
      });

      trackEvent({
        action: 'mobile_optimization_applied',
        category: 'performance',
        label: 'optimization_settings',
        custom_parameters: settings
      });

      toast.success('Optimization settings applied successfully!');
      
    } catch (error) {
      console.error('Error applying optimizations:', error);
      toast.error('Failed to apply some optimizations');
    } finally {
      setIsOptimizing(false);
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const getConnectionIcon = (effectiveType: string) => {
    switch (effectiveType) {
      case 'slow-2g':
      case '2g':
        return <WifiOff className="h-4 w-4 text-red-500" />;
      case '3g':
        return <Wifi className="h-4 w-4 text-orange-500" />;
      case '4g':
        return <Wifi className="h-4 w-4 text-green-500" />;
      default:
        return <Wifi className="h-4 w-4 text-gray-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  if (!deviceMetrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p>Analyzing device capabilities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              {getDeviceIcon(deviceMetrics.deviceType)}
              <span className="font-medium capitalize">{deviceMetrics.deviceType}</span>
            </div>
            <p className="text-sm text-gray-600">
              {deviceMetrics.screenSize.width}×{deviceMetrics.screenSize.height}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              {getConnectionIcon(deviceMetrics.connection.effectiveType)}
              <span className="font-medium capitalize">{deviceMetrics.connection.effectiveType}</span>
            </div>
            <p className="text-sm text-gray-600">
              {deviceMetrics.connection.downlink}Mbps
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Cpu className="h-4 w-4" />
              <span className="font-medium">{deviceMetrics.performance.processorCores} cores</span>
            </div>
            <p className="text-sm text-gray-600">
              {Math.round(deviceMetrics.performance.memory)}MB RAM
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4" />
              <span className={`font-medium ${getScoreColor(optimizationScore)}`}>
                {optimizationScore}/100
              </span>
            </div>
            <p className="text-sm text-gray-600">Optimization Score</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="optimization" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
        </TabsList>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Optimization Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Image Quality</label>
                <select
                  value={optimizationSettings.imageQuality}
                  onChange={(e) => saveOptimizationSettings({
                    ...optimizationSettings,
                    imageQuality: e.target.value as OptimizationSettings['imageQuality']
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="auto">Auto (Based on device)</option>
                  <option value="low">Low (Faster loading)</option>
                  <option value="medium">Medium (Balanced)</option>
                  <option value="high">High (Best quality)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cache Strategy</label>
                <select
                  value={optimizationSettings.cacheStrategy}
                  onChange={(e) => saveOptimizationSettings({
                    ...optimizationSettings,
                    cacheStrategy: e.target.value as OptimizationSettings['cacheStrategy']
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="aggressive">Aggressive (More storage)</option>
                  <option value="moderate">Moderate (Balanced)</option>
                  <option value="minimal">Minimal (Less storage)</option>
                </select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Prefetch Resources</label>
                  <input
                    type="checkbox"
                    checked={optimizationSettings.prefetchEnabled}
                    onChange={(e) => saveOptimizationSettings({
                      ...optimizationSettings,
                      prefetchEnabled: e.target.checked
                    })}
                    className="rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Offline Mode</label>
                  <input
                    type="checkbox"
                    checked={optimizationSettings.offlineMode}
                    onChange={(e) => saveOptimizationSettings({
                      ...optimizationSettings,
                      offlineMode: e.target.checked
                    })}
                    className="rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Reduce Motion</label>
                  <input
                    type="checkbox"
                    checked={optimizationSettings.reducedMotion}
                    onChange={(e) => saveOptimizationSettings({
                      ...optimizationSettings,
                      reducedMotion: e.target.checked
                    })}
                    className="rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Compress Transfer</label>
                  <input
                    type="checkbox"
                    checked={optimizationSettings.compressTransfer}
                    onChange={(e) => saveOptimizationSettings({
                      ...optimizationSettings,
                      compressTransfer: e.target.checked
                    })}
                    className="rounded"
                  />
                </div>
              </div>

              {isOptimizing && (
                <div className="text-center py-4">
                  <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Applying optimizations...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deviceMetrics.connection.effectiveType === 'slow-2g' || deviceMetrics.connection.effectiveType === '2g' ? (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Slow connection detected:</strong> Consider enabling low image quality and aggressive compression.
                    </p>
                  </div>
                ) : null}

                {deviceMetrics.performance.memory < 1000 ? (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>Limited memory:</strong> Enable minimal cache strategy and reduce motion to improve performance.
                    </p>
                  </div>
                ) : null}

                {deviceMetrics.battery && deviceMetrics.battery.level < 0.2 ? (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Low battery:</strong> Disable prefetching and reduce animations to save power.
                    </p>
                  </div>
                ) : null}

                {!deviceMetrics.capabilities.serviceWorker ? (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>No service worker support:</strong> Offline features and advanced caching won't be available.
                    </p>
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {performanceMetrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Load Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Load Time:</span>
                    <span>{Math.round(performanceMetrics.loadTime)}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Render Time:</span>
                    <span>{Math.round(performanceMetrics.renderTime)}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>First Contentful Paint:</span>
                    <span>{Math.round(performanceMetrics.firstContentfulPaint)}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Largest Contentful Paint:</span>
                    <span>{Math.round(performanceMetrics.largestContentfulPaint)}ms</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Cumulative Layout Shift:</span>
                    <span>{performanceMetrics.cumulativeLayoutShift.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interaction to Next Paint:</span>
                    <span>{Math.round(performanceMetrics.interactionToNextPaint)}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overall Score:</span>
                    <span className={getScoreColor(optimizationScore)}>{optimizationScore}/100</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="capabilities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Device Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Screen Size:</span>
                  <span>{deviceMetrics.screenSize.width}×{deviceMetrics.screenSize.height}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pixel Ratio:</span>
                  <span>{deviceMetrics.pixelRatio}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Processor Cores:</span>
                  <span>{deviceMetrics.performance.processorCores}</span>
                </div>
                <div className="flex justify-between">
                  <span>Memory:</span>
                  <span>{Math.round(deviceMetrics.performance.memory)}MB</span>
                </div>
                {deviceMetrics.battery && (
                  <>
                    <div className="flex justify-between">
                      <span>Battery Level:</span>
                      <span>{Math.round(deviceMetrics.battery.level * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Charging:</span>
                      <span>{deviceMetrics.battery.charging ? 'Yes' : 'No'}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(deviceMetrics.capabilities).map(([feature, supported]) => (
                  <div key={feature} className="flex justify-between">
                    <span className="capitalize">{feature.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <Badge variant={supported ? 'default' : 'destructive'}>
                      {supported ? 'Supported' : 'Not Supported'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};