
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PaymentFlowTester } from './PaymentFlowTester';
import { EnhancedWebVitalsMonitor } from '../performance/EnhancedWebVitalsMonitor';
import { MobilePerformanceIndicator } from './MobilePerformanceIndicator';
import { PerformanceTestPanel } from './PerformanceTestPanel';
import { Activity, CreditCard, Smartphone, BarChart3, Settings } from 'lucide-react';

export const ComprehensiveDashboard = () => {
  const [activeTab, setActiveTab] = useState('payment');

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Development & Performance Dashboard
        </h1>
        <p className="text-gray-600">
          Comprehensive testing and monitoring tools for payment flows, performance optimization, and user experience.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment Testing
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Core Web Vitals
          </TabsTrigger>
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Mobile Performance
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payment" className="space-y-6">
          <PaymentFlowTester />
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Flow Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Stripe Integration</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>✓ Checkout session creation</li>
                    <li>✓ Customer portal access</li>
                    <li>✓ Subscription status tracking</li>
                    <li>✓ Error handling & validation</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">User Experience</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>✓ Payment confirmation flow</li>
                    <li>✓ Loading states & feedback</li>
                    <li>✓ Error message display</li>
                    <li>✓ Mobile responsiveness</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <EnhancedWebVitalsMonitor />
          <PerformanceTestPanel />
        </TabsContent>

        <TabsContent value="mobile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mobile Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Monitor mobile-specific performance metrics and optimizations.
              </p>
              <MobilePerformanceIndicator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Implementation Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Payment Flows</span>
                    <span className="text-sm font-medium text-green-600">✓ Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Visual Hierarchy</span>
                    <span className="text-sm font-medium text-green-600">✓ Enhanced</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Core Web Vitals</span>
                    <span className="text-sm font-medium text-blue-600">⚡ Monitoring</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Mobile Optimization</span>
                    <span className="text-sm font-medium text-green-600">✓ Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">LCP Target</span>
                    <span className="text-sm font-medium">&lt; 2.5s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">FID Target</span>
                    <span className="text-sm font-medium">&lt; 100ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">CLS Target</span>
                    <span className="text-sm font-medium">&lt; 0.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bundle Size</span>
                    <span className="text-sm font-medium">&lt; 500KB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• Monitor real user metrics</div>
                  <div>• A/B test payment flows</div>
                  <div>• Optimize critical path</div>
                  <div>• Review mobile UX</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
