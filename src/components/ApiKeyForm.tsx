
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';

interface ApiKeyFormProps {
  onSubmit: (apiKey: string) => void;
  serviceName?: string;
  keyPlaceholder?: string;
}

export const ApiKeyForm = ({ 
  onSubmit, 
  serviceName = "API", 
  keyPlaceholder = "Enter API key"
}: ApiKeyFormProps) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey);
      // Store temporarily in localStorage for development only
      localStorage.setItem(`temp_${serviceName.toLowerCase().replace(' ', '_')}_key`, apiKey);
      toast.success(`${serviceName} API Key saved temporarily`);
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  return (
    <div className="mb-4 p-4 border border-gray-200 rounded-lg">
      <div className="mb-2">
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
          {serviceName} API Key (stored only for this session)
        </label>
        <div className="flex gap-2">
          <Input 
            type="password" 
            id="apiKey" 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)} 
            placeholder={keyPlaceholder} 
            className="flex-1"
          />
          <Button type="button" onClick={handleSubmit}>Save</Button>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        This key will be stored temporarily in your browser's memory only.
        For production use, we recommend using a server-side proxy with Supabase.
      </p>
    </div>
  );
};
