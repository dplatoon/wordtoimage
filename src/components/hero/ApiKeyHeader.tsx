
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ApiKeyHeaderProps {
  tempApiKey: string;
  onUpdateApiKey: () => void;
}

export const ApiKeyHeader = ({ tempApiKey, onUpdateApiKey }: ApiKeyHeaderProps) => (
  <div className="mb-3 flex items-center justify-between">
    <div className="flex items-center text-sm text-gray-600">
      <Shield className="h-4 w-4 mr-1 text-green-500" />
      <span>Powered by OpenAI DALL-E 3</span>
    </div>
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={onUpdateApiKey}
      className="text-xs"
    >
      {tempApiKey ? 'Update API Key' : 'Add API Key'}
    </Button>
  </div>
);
