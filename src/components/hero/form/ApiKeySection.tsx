
import { ApiKeyForm } from '@/components/ApiKeyForm';
import { InfoAlert } from '../InfoAlert';

interface ApiKeySectionProps {
  showApiKeyForm: boolean;
  onApiKeySubmit: (key: string) => void;
}

export const ApiKeySection = ({ showApiKeyForm, onApiKeySubmit }: ApiKeySectionProps) => {
  return (
    <>
      <InfoAlert usingServerKey={!showApiKeyForm} />
      {showApiKeyForm && (
        <ApiKeyForm 
          onSubmit={onApiKeySubmit} 
          serviceName="OpenAI" 
          keyPlaceholder="Enter your OpenAI API key" 
        />
      )}
    </>
  );
};
