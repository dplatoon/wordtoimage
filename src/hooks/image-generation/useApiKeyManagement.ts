
import { useState, useEffect } from 'react';
import { ApiKeyService } from '@/services/apiKeyService';
import { toast } from 'sonner';
import { trackEvent } from '@/utils/analytics';

export const useApiKeyManagement = () => {
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [isCheckingServerKey, setIsCheckingServerKey] = useState(true);

  useEffect(() => {
    const checkServerKey = async () => {
      try {
        const isAvailable = await ApiKeyService.checkServerKeyAvailability();
        
        if (isAvailable) {
          setShowApiKeyForm(false);
        } else {
          toast.warning("OpenAI API Key Required", {
            description: "Please enter your OpenAI API key to generate images",
            duration: 8000
          });
          setShowApiKeyForm(true);
          trackEvent('api_key_required');
        }
      } catch (error) {
        console.error('Error checking server key:', error);
        setShowApiKeyForm(true);
      } finally {
        setIsCheckingServerKey(false);
      }
    };

    checkServerKey();
  }, []);

  return {
    showApiKeyForm,
    tempApiKey,
    setTempApiKey,
    isCheckingServerKey
  };
};
