import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import { ConversionManager } from '@/components/analytics/ConversionManager';
import { BehavioralAnalytics } from '@/components/analytics/BehavioralAnalytics';
import { UserEngagementTracker } from '@/components/analytics/UserEngagementTracker';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Community from '@/pages/Community';
import Pricing from '@/pages/Pricing';
import NotFound from '@/pages/NotFound';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';

function App() {
  usePerformanceMonitoring();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
            <SubscriptionProvider>
              <ConversionManager />
              <BehavioralAnalytics />
              <UserEngagementTracker />
              <div className="min-h-screen bg-background font-sans antialiased">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </SubscriptionProvider>
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
