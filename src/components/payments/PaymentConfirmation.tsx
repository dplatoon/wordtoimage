
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { EnhancedAlert } from '@/components/common/EnhancedAlert';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface PaymentStatus {
  status: 'success' | 'failed' | 'pending' | 'cancelled';
  message: string;
  transactionId?: string;
  amount?: string;
}

export const PaymentConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    status: 'pending',
    message: 'Processing your payment...'
  });

  useEffect(() => {
    // Check URL parameters for payment status
    const success = searchParams.get('success');
    const cancelled = searchParams.get('cancelled');
    const sessionId = searchParams.get('session_id');
    const paymentIntent = searchParams.get('payment_intent');

    if (success === 'true') {
      setPaymentStatus({
        status: 'success',
        message: 'Your payment was successful! Thank you for your purchase.',
        transactionId: sessionId || paymentIntent || undefined
      });
    } else if (cancelled === 'true') {
      setPaymentStatus({
        status: 'cancelled',
        message: 'Payment was cancelled. You can try again anytime.'
      });
    } else if (success === 'false') {
      setPaymentStatus({
        status: 'failed',
        message: 'Payment failed. Please check your payment details and try again.'
      });
    }

    // Auto-redirect after successful payment
    if (success === 'true') {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, navigate]);

  const getIcon = () => {
    switch (paymentStatus.status) {
      case 'success':
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case 'failed':
        return <XCircle className="h-12 w-12 text-red-500" />;
      case 'cancelled':
        return <XCircle className="h-12 w-12 text-gray-500" />;
      default:
        return <Clock className="h-12 w-12 text-blue-500 animate-spin" />;
    }
  };

  const getAlertStatus = () => {
    switch (paymentStatus.status) {
      case 'success':
        return 'success';
      case 'failed':
        return 'error';
      case 'cancelled':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getIcon()}
          </div>
          <CardTitle className="text-2xl">
            {paymentStatus.status === 'success' && 'Payment Successful!'}
            {paymentStatus.status === 'failed' && 'Payment Failed'}
            {paymentStatus.status === 'cancelled' && 'Payment Cancelled'}
            {paymentStatus.status === 'pending' && 'Processing Payment...'}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <EnhancedAlert status={getAlertStatus()}>
            {paymentStatus.message}
          </EnhancedAlert>

          {paymentStatus.transactionId && (
            <div className="text-sm text-gray-600 text-center">
              Transaction ID: {paymentStatus.transactionId}
            </div>
          )}

          {paymentStatus.status === 'success' && (
            <div className="text-center text-sm text-gray-600">
              Redirecting to dashboard in 5 seconds...
            </div>
          )}

          <div className="flex gap-2 pt-4">
            {paymentStatus.status === 'success' ? (
              <PrimaryButton
                onClick={() => navigate('/dashboard')}
                className="w-full"
              >
                Go to Dashboard
              </PrimaryButton>
            ) : (
              <>
                <PrimaryButton
                  onClick={() => navigate('/pricing')}
                  className="flex-1"
                >
                  Try Again
                </PrimaryButton>
                <PrimaryButton
                  onClick={() => navigate('/')}
                  className="flex-1"
                  variant="outline"
                >
                  Home
                </PrimaryButton>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
