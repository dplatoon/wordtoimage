
import { useImageGenerationForm } from '@/hooks/useImageGenerationForm';
import { AuthModalDialog } from './AuthModalDialog';
import { GenerationControls } from './form/GenerationControls';
import { PromptInput } from './form/PromptInput';
import { GenerateButton } from './form/GenerateButton';
import { FreeGenerationCounter } from './form/FreeGenerationCounter';
import { ApiKeySection } from './form/ApiKeySection';
import { FormLayout } from './form/FormLayout';

interface ImageGenerationFormProps {
  onImageGenerated: (url: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onError: (error: string | null) => void;
  onNewGalleryRow?: (images: { url: string; prompt: string, style?: string, resolution?: string }[]) => void;
}

export const ImageGenerationForm = ({
  onImageGenerated,
  onGeneratingChange,
  onError,
  onNewGalleryRow
}: ImageGenerationFormProps) => {
  const {
    prompt,
    setPrompt,
    showApiKeyForm,
    tempApiKey,
    setTempApiKey,
    isCheckingServerKey,
    authModalOpen,
    setAuthModalOpen,
    generationCount,
    style,
    setStyle,
    resolution,
    setResolution,
    count,
    setCount,
    user,
    authLoading,
    state,
    canGenerate,
    handleProtectedGenerate,
  } = useImageGenerationForm({
    onImageGenerated,
    onGeneratingChange,
    onError,
    onNewGalleryRow
  });

  if (authLoading || isCheckingServerKey) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-1">
        <div className="bg-white rounded-xl p-5 w-full">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading generator...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <FormLayout onSubmit={handleProtectedGenerate}>
        <ApiKeySection 
          showApiKeyForm={showApiKeyForm}
          onApiKeySubmit={setTempApiKey}
        />

        <PromptInput 
          prompt={prompt}
          onChange={setPrompt}
        />

        <GenerationControls
          style={style}
          resolution={resolution}
          count={count}
          onStyleChange={setStyle}
          onResolutionChange={setResolution}
          onCountChange={(value) => setCount(Number(value))}
        />

        <GenerateButton 
          isGenerating={state.isGenerating}
          isDisabled={!canGenerate}
          generationCount={generationCount}
          maxFreeGenerations={3}
          user={user}
        />
        
        {!user && (
          <FreeGenerationCounter 
            generationCount={generationCount}
            maxFreeGenerations={3}
            onSignUpClick={() => setAuthModalOpen(true)}
          />
        )}
      </FormLayout>
      
      <AuthModalDialog 
        open={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
};
