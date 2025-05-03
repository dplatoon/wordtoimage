
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function ConfigErrorAlert() {
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4 mr-2" />
      <AlertDescription>
        Supabase configuration is missing. Please set up your environment variables.
      </AlertDescription>
    </Alert>
  );
}
