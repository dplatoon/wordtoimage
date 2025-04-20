
import { Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ApiKeyHeaderProps {
  tempApiKey: string;
  onUpdateApiKey: () => void;
}

export const ApiKeyHeader = ({ tempApiKey, onUpdateApiKey }: ApiKeyHeaderProps) => (
  <div className="mb-3 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Shield className="h-4 w-4 mr-1 text-green-500" />
      <span className="text-sm text-gray-600">Powered by OpenAI DALL-E 3</span>
      {tempApiKey && (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs flex items-center gap-1">
          <Check className="h-3 w-3" /> API Key Set
        </Badge>
      )}
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
