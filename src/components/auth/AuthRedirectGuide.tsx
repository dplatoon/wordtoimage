import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, AlertTriangle, CheckCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface AuthRedirectGuideProps {
  isVisible: boolean;
  onClose: () => void;
}

export function AuthRedirectGuide({ isVisible, onClose }: AuthRedirectGuideProps) {
  const [currentDomain, setCurrentDomain] = useState('');
  
  useEffect(() => {
    setCurrentDomain(window.location.origin);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  if (!isVisible) return null;

  const projectId = 'itkfghwxbodjlmpgydsq'; // From Supabase config
  const authUrl = `https://supabase.com/dashboard/project/${projectId}/auth/url-configuration`;

  return (
    <Card className="w-full max-w-2xl mx-auto border-amber-200 bg-amber-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-800">
          <AlertTriangle className="h-5 w-5" />
          Authentication Setup Required
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            To fix authentication redirect issues, your Supabase project needs proper URL configuration.
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <h4 className="font-semibold text-amber-800">Required Supabase URL Configuration:</h4>
          
          <div className="space-y-2">
            <div className="bg-white p-3 rounded border">
              <p className="text-sm font-medium text-gray-700 mb-1">Site URL:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-gray-100 p-2 rounded text-sm">{currentDomain}</code>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(currentDomain)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="bg-white p-3 rounded border">
              <p className="text-sm font-medium text-gray-700 mb-1">Redirect URLs (add both):</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-100 p-2 rounded text-sm">{currentDomain}/auth</code>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard(`${currentDomain}/auth`)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-100 p-2 rounded text-sm">{currentDomain}/**</code>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard(`${currentDomain}/**`)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h5 className="font-medium text-blue-800 mb-2">Setup Steps:</h5>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Open the Supabase dashboard link below</li>
              <li>Set the Site URL to your domain (copy from above)</li>
              <li>Add both redirect URLs to the allowed list</li>
              <li>Save the configuration</li>
              <li>Wait 1-2 minutes for changes to propagate</li>
              <li>Try authentication again</li>
            </ol>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={() => window.open(authUrl, '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Open Supabase Auth Settings
          </Button>
          <Button variant="outline" onClick={onClose}>
            I'll do this later
          </Button>
        </div>

        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
          <p><strong>Common Error Messages This Fixes:</strong></p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>"requested path is invalid"</li>
            <li>Redirected to localhost:3000</li>
            <li>"redirect_uri_mismatch"</li>
            <li>Google OAuth not completing</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}