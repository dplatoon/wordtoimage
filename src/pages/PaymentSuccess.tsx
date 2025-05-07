
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/utils/analytics';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Track the payment success event
    trackEvent('payment_success');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your subscription has been activated and you can now enjoy all the premium features.
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/text-to-image')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Start Creating Images
            </Button>
            
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline" 
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
