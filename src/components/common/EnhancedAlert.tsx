
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedAlertProps {
  status: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const EnhancedAlert = ({
  status,
  title,
  children,
  className,
  dismissible = false,
  onDismiss
}: EnhancedAlertProps) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  };

  const statusStyles = {
    success: 'border-green-200 bg-green-50 text-green-800',
    error: 'border-red-200 bg-red-50 text-red-800', 
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    info: 'border-blue-200 bg-blue-50 text-blue-800'
  };

  const IconComponent = icons[status];

  return (
    <Alert className={cn(statusStyles[status], className)}>
      <div className="flex items-start gap-3">
        <IconComponent className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          {title && (
            <div className="font-semibold text-sm mb-1">{title}</div>
          )}
          <AlertDescription className="text-sm">
            {children}
          </AlertDescription>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="text-current opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </Alert>
  );
};
