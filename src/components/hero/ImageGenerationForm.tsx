

import { useImageGenerationForm } from '@/hooks/useImageGenerationForm';
import { AuthModalDialog } from './AuthModalDialog';
import { FormLayout } from './form/FormLayout';
import { GenerationControls } from './form/controls/GenerationControls';
import { PromptInput } from './form/PromptInput';
import { GenerateButton } from './form/GenerateButton';
import { ExamplePrompts } from './form/ExamplePrompts';
import { FreeGenerationCounter } from './form/FreeGenerationCounter';
import { ApiKeySection } from './form/ApiKeySection';
import { DemoMode } from './DemoMode';
import { CameraUpload } from './CameraUpload';
import { FreeVsProComparison } from './FreeVsProComparison';
import { StyleDNAQuiz } from '../engagement/StyleDNAQuiz';
import { AIAssistantAura } from '../engagement/AIAssistantAura';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

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
    sourceImage,
    setSourceImage,
    user,
    authLoading,
    state,
    canGenerate,
    handleProtectedGenerate,
    isFirstDay,
    dailyGenerationsLeft,
  } = useImageGenerationForm({
    onImageGenerated,
    onGeneratingChange,
    onError,
    onNewGalleryRow
  });

  const [showDemoMode, setShowDemoMode] = useState(true);
  const [showCameraUpload, setShowCameraUpload] = useState(false);
  const [showFreeVsPro, setShowFreeVsPro] = useState(!user);
  const [showStyleQuiz, setShowStyleQuiz] = useState(false);
  const isMobile = useIsMobile();

  const handleDemoGenerate = (demoPrompt: string, demoStyle: string) => {
    setPrompt(demoPrompt);
    setStyle(demoStyle);
    setShowDemoMode(false);
    // Create a synthetic event for handleProtectedGenerate
    const syntheticEvent = {
      preventDefault: () => {}
    } as React.FormEvent<HTMLFormElement>;
    handleProtectedGenerate(syntheticEvent);
  };

  const handleCameraCapture = (imageData: string) => {
    setSourceImage(imageData);
    setShowCameraUpload(false);
  };

  const handleUpgradeClick = () => {
    setAuthModalOpen(true);
  };

  const handleStyleQuizComplete = (profile: any) => {
    // Use the profile to enhance the prompt and style
    setStyle(profile.primaryStyle);
    const stylePrompt = `A ${profile.primaryStyle} ${profile.roomType} room with ${profile.colorPreference} colors`;
    setPrompt(stylePrompt);
    setShowStyleQuiz(false);
    setShowDemoMode(false);
  };

  const handleQuizStart = () => {
    setShowStyleQuiz(true);
  };

  const handleGenerateClick = () => {
    // Scroll to the generation form if not visible
    const formElement = document.querySelector('.image-generation-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const MAX_FREE_ANONYMOUS_GENERATIONS = 1; // Anonymous users can generate 1 image for free

  if (authLoading || isCheckingServerKey) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-gradient-to-r from-violet-500 to-indigo-600 rounded-2xl shadow-xl p-1">
        <div className="bg-white rounded-xl p-5 w-full">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
            <span className="ml-3 text-gray-600">Loading generator...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Style DNA Quiz Modal */}
      {showStyleQuiz && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <StyleDNAQuiz 
            onComplete={handleStyleQuizComplete}
            onClose={() => setShowStyleQuiz(false)}
          />
        </div>
      )}

      {/* AI Assistant Aura */}
      <AIAssistantAura 
        onQuizStart={handleQuizStart}
        onGenerateClick={handleGenerateClick}
        currentPage={generationCount > 0 ? "afterGeneration" : "homepage"}
      />

      <FormLayout onSubmit={handleProtectedGenerate}>
        {/* Demo Mode - Show at top for immediate engagement */}
        {showDemoMode && generationCount === 0 && (
          <DemoMode 
            onDemoGenerate={handleDemoGenerate}
            isGenerating={state.isGenerating}
          />
        )}

        {/* Free vs Pro Comparison - Show after first generation or for returning users */}
        {showFreeVsPro && (generationCount > 0 || !showDemoMode) && (
          <FreeVsProComparison 
            onUpgradeClick={handleUpgradeClick}
            className="mb-4"
          />
        )}

        {/* Camera Upload for Mobile - Show when source image needed */}
        {isMobile && !sourceImage && (
          <div className="mb-4">
            <CameraUpload 
              onImageCapture={handleCameraCapture}
              disabled={state.isGenerating}
            />
          </div>
        )}

        {/* Regular form components */}
        <ApiKeySection 
          showApiKeyForm={showApiKeyForm}
          onApiKeySubmit={setTempApiKey}
        />

        <GenerationControls 
          style={style}
          resolution={resolution}
          count={count}
          onStyleChange={setStyle}
          onResolutionChange={setResolution}
          onCountChange={setCount}
          onSourceImageChange={setSourceImage}
        />

        <PromptInput 
          prompt={prompt}
          onChange={setPrompt}
        />

        {/* Show example prompts only if demo mode is hidden */}
        {!showDemoMode && (
          <ExamplePrompts 
            onSelect={setPrompt}
          />
        )}

        <GenerateButton 
          isGenerating={state.isGenerating}
          isDisabled={!canGenerate}
          generationCount={generationCount}
          maxFreeGenerations={MAX_FREE_ANONYMOUS_GENERATIONS}
          user={user}
          dailyGenerationsLeft={dailyGenerationsLeft}
          isFirstDay={isFirstDay}
        />
        
        {!user && (
          <FreeGenerationCounter 
            generationCount={generationCount}
            maxFreeGenerations={MAX_FREE_ANONYMOUS_GENERATIONS}
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
