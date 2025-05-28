
interface FormFooterProps {
  mode: 'signin' | 'signup';
  isLoading: boolean;
}

export function FormFooter({ mode, isLoading }: FormFooterProps) {
  if (mode === 'signin') {
    return (
      <div className="text-center pt-2">
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          disabled={isLoading}
          aria-label="Get help with forgotten password"
        >
          Forgot your password? Get help here
        </button>
      </div>
    );
  }

  return (
    <div className="text-center pt-2" role="region" aria-label="Terms and conditions">
      <p className="text-xs text-slate-500 leading-relaxed">
        By creating an account, you agree to our{' '}
        <a 
          href="/terms" 
          className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a 
          href="/privacy" 
          className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
