
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, X } from 'lucide-react';

interface SessionTimeoutWarningProps {
  onExtendSession: () => void;
  timeoutMinutes?: number;
  warningMinutes?: number;
}

export function SessionTimeoutWarning({ 
  onExtendSession, 
  timeoutMinutes = 30,
  warningMinutes = 5 
}: SessionTimeoutWarningProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const updateActivity = useCallback(() => {
    const now = Date.now();
    localStorage.setItem('lastActivity', now.toString());
  }, []);

  const extendSession = useCallback(() => {
    updateActivity();
    onExtendSession();
    setShowWarning(false);
  }, [updateActivity, onExtendSession]);

  useEffect(() => {
    let warningTimer: NodeJS.Timeout;
    let countdownTimer: NodeJS.Timeout;

    const checkActivity = () => {
      const lastActivity = localStorage.getItem('lastActivity');
      if (!lastActivity) {
        updateActivity();
        return;
      }

      const timeSinceActivity = Date.now() - parseInt(lastActivity);
      const warningThreshold = (timeoutMinutes - warningMinutes) * 60 * 1000;
      const timeoutThreshold = timeoutMinutes * 60 * 1000;

      if (timeSinceActivity >= warningThreshold && timeSinceActivity < timeoutThreshold) {
        setShowWarning(true);
        const remaining = timeoutThreshold - timeSinceActivity;
        setTimeLeft(Math.ceil(remaining / 1000));

        countdownTimer = setInterval(() => {
          const newRemaining = timeoutThreshold - (Date.now() - parseInt(lastActivity));
          if (newRemaining <= 0) {
            setShowWarning(false);
            // Let the parent handle the actual timeout
          } else {
            setTimeLeft(Math.ceil(newRemaining / 1000));
          }
        }, 1000);
      }
    };

    // Check activity every minute
    const activityChecker = setInterval(checkActivity, 60000);
    
    // Track user activity
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const handleActivity = () => updateActivity();
    
    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Initial activity update
    updateActivity();

    return () => {
      clearInterval(activityChecker);
      clearTimeout(warningTimer);
      clearInterval(countdownTimer);
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [timeoutMinutes, warningMinutes, updateActivity]);

  if (!showWarning) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div 
      className="fixed top-4 right-4 z-50 max-w-md"
      role="alert"
      aria-live="assertive"
    >
      <Alert className="border-orange-200 bg-orange-50">
        <Clock className="h-4 w-4 text-orange-600" />
        <AlertDescription className="pr-8">
          <div className="font-medium text-orange-800 mb-2">
            Session timeout warning
          </div>
          <p className="text-sm text-orange-700 mb-3">
            Your session will expire in {minutes > 0 && `${minutes}m `}{seconds}s due to inactivity.
          </p>
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={extendSession}
              className="bg-orange-600 hover:bg-orange-700 text-white"
              autoFocus
            >
              Stay signed in
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowWarning(false)}
              className="border-orange-300 text-orange-700 hover:bg-orange-100"
            >
              Dismiss
            </Button>
          </div>
        </AlertDescription>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-6 w-6 p-0 text-orange-600 hover:text-orange-800"
          onClick={() => setShowWarning(false)}
          aria-label="Close warning"
        >
          <X className="h-3 w-3" />
        </Button>
      </Alert>
    </div>
  );
}
