import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Zap } from 'lucide-react';

interface LoadingProgressProps {
  isVisible: boolean;
  progress?: number;
  message?: string;
  className?: string;
}

export const LoadingProgress = ({ 
  isVisible, 
  progress = 0, 
  message = "Generating your image...", 
  className 
}: LoadingProgressProps) => {
  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 animate-fade-in",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={`${message} ${progress}% complete`}
    >
      <div className="space-y-4">
        {/* Header with icon */}
        <div className="flex items-center justify-center">
          <div className="relative mr-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <Sparkles className="absolute top-0 left-0 h-6 w-6 text-blue-400 animate-pulse" />
          </div>
          <span className="text-blue-800 font-medium">{message}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Progress text */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-blue-700">{Math.round(progress)}% complete</span>
          <span className="text-blue-600">Usually takes 3-5 seconds</span>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

interface ErrorStateProps {
  error: string | null;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorState = ({ 
  error, 
  onRetry, 
  onDismiss, 
  className 
}: ErrorStateProps) => {
  if (!error) return null;

  return (
    <div 
      className={cn(
        "mt-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg border border-red-200 animate-fade-in",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-sm font-bold">!</span>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-red-800 font-medium mb-1">Generation Failed</h4>
          <p className="text-red-700 text-sm mb-3">{error}</p>
          
          <div className="flex space-x-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                <Zap className="w-4 h-4 mr-1" />
                Try Again
              </button>
            )}
            
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-sm text-red-600 hover:text-red-800 underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SuccessStateProps {
  isVisible: boolean;
  generationTime?: string | null;
  onDownload?: () => void;
  onShare?: () => void;
  className?: string;
}

export const SuccessState = ({ 
  isVisible, 
  generationTime, 
  onDownload, 
  onShare, 
  className 
}: SuccessStateProps) => {
  if (!isVisible || !generationTime) return null;

  return (
    <div 
      className={cn(
        "mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 animate-fade-in",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center text-green-800">
          <Zap className="h-5 w-5 mr-2 text-green-600" />
          <span className="font-medium">Generated in {generationTime}s! Your image is ready.</span>
        </div>
        
        <div className="flex space-x-2">
          {onDownload && (
            <button
              onClick={onDownload}
              className="inline-flex items-center px-3 py-1.5 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Download
            </button>
          )}
          
          {onShare && (
            <button
              onClick={onShare}
              className="inline-flex items-center px-3 py-1.5 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
};