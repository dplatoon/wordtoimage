
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Clock, CreditCard, Users, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthState } from '@/hooks/useAuthState';
import { toast } from '@/components/ui/sonner';

interface TestResult {
  step: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  timestamp: Date;
}

export const PaymentFlowTester = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const { session } = useAuthState();

  const addResult = (step: string, status: 'pending' | 'success' | 'error', message: string) => {
    setResults(prev => [...prev, { step, status, message, timestamp: new Date() }]);
  };

  const runPaymentFlowTest = async () => {
    setIsRunning(true);
    setResults([]);

    // Test 1: Authentication Check
    addResult('Authentication', 'pending', 'Checking authentication status...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!session?.access_token) {
      addResult('Authentication', 'error', 'User not authenticated - please log in first');
      setIsRunning(false);
      return;
    }
    addResult('Authentication', 'success', 'User authenticated successfully');

    // Test 2: Create Checkout Session (Standard Plan)
    addResult('Checkout Creation', 'pending', 'Testing checkout session creation...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId: 'prod_SGdyRu7i1RabBb' }, // Standard plan
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        addResult('Checkout Creation', 'error', `Checkout creation failed: ${error.message}`);
      } else if (data?.url) {
        addResult('Checkout Creation', 'success', 'Checkout session created successfully');
        
        // Test 3: URL Validation
        addResult('URL Validation', 'pending', 'Validating checkout URL...');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (data.url.includes('checkout.stripe.com')) {
          addResult('URL Validation', 'success', 'Valid Stripe checkout URL generated');
        } else {
          addResult('URL Validation', 'error', 'Invalid checkout URL format');
        }
      } else {
        addResult('Checkout Creation', 'error', 'No checkout URL returned');
      }
    } catch (err) {
      addResult('Checkout Creation', 'error', `Checkout creation error: ${err}`);
    }

    // Test 4: Subscription Check
    addResult('Subscription Check', 'pending', 'Testing subscription status check...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        addResult('Subscription Check', 'error', `Subscription check failed: ${error.message}`);
      } else {
        addResult('Subscription Check', 'success', `Subscription status: ${data?.subscribed ? 'Active' : 'Inactive'}`);
      }
    } catch (err) {
      addResult('Subscription Check', 'error', `Subscription check error: ${err}`);
    }

    // Test 5: Customer Portal (if subscribed)
    addResult('Customer Portal', 'pending', 'Testing customer portal access...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        addResult('Customer Portal', 'error', `Customer portal failed: ${error.message}`);
      } else if (data?.url) {
        addResult('Customer Portal', 'success', 'Customer portal URL generated successfully');
      } else {
        addResult('Customer Portal', 'error', 'No customer portal URL returned');
      }
    } catch (err) {
      addResult('Customer Portal', 'error', `Customer portal error: ${err}`);
    }

    setIsRunning(false);
    toast.success('Payment flow test completed');
  };

  const getStatusIcon = (status: 'pending' | 'success' | 'error') => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: 'pending' | 'success' | 'error') => {
    switch (status) {
      case 'pending':
        return 'border-blue-200 bg-blue-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Flow End-to-End Tester
        </CardTitle>
        <p className="text-sm text-gray-600">
          Comprehensive testing of payment flows in sandbox environment
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!session && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please log in to test the payment flows. Authentication is required for payment testing.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-4">
          <Button 
            onClick={runPaymentFlowTest} 
            disabled={isRunning || !session}
            className="flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <Clock className="h-4 w-4 animate-spin" />
                Running Tests...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                Start Payment Flow Test
              </>
            )}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-lg">Test Results</h3>
            {results.map((result, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-lg ${getStatusColor(result.status)}`}
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <div className="font-medium text-sm">{result.step}</div>
                    <div className="text-sm text-gray-600">{result.message}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {result.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Test Coverage</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>✓ User authentication validation</div>
            <div>✓ Checkout session creation</div>
            <div>✓ Stripe URL validation</div>
            <div>✓ Subscription status check</div>
            <div>✓ Customer portal access</div>
            <div>✓ Error handling verification</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
