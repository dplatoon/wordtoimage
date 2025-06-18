
import { FormLayout } from './form/FormLayout';
import { FormSections } from './form/FormSections';
import { FormModals } from './form/FormModals';
import { useFormState } from './form/FormState';
import { AIAssistantAura } from '../engagement/AIAssistantAura';

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
    // Auth loading states
    authLoading,
    isCheckingServerKey,
    
    // Form state
    prompt,
    setPrompt,
    showApiKeyForm,
    tempApiKey,
    setTempApiKey,
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
    state,
    canGenerate,
    handleProtectedGenerate,
    isFirstDay,
    dailyGenerationsLeft,
    
    // Component visibility state
    showDemoMode,
    showCameraUpload,
    showFreeVsPro,
    showStyleQuiz,
    
    // Event handlers
    handleDemoGenerate,
    handleCameraCapture,
    handleUpgradeClick,
    handleStyleQuizComplete,
    handleQuizStart,
    handleGenerateClick
  } = useFormState({
    onImageGenerated,
    onGeneratingChange,
    onError,
    onNewGalleryRow
  });

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
      <FormModals
        showStyleQuiz={showStyleQuiz}
        onStyleQuizComplete={handleStyleQuizComplete}
        onStyleQuizClose={() => setAuthModalOpen(false)}
        authModalOpen={authModalOpen}
        onAuthModalClose={() => setAuthModalOpen(false)}
      />

      {/* AI Assistant Aura */}
      <AIAssistantAura 
        onQuizStart={handleQuizStart}
        onGenerateClick={handleGenerateClick}
        currentPage={generationCount > 0 ? "afterGeneration" : "homepage"}
      />

      <FormLayout onSubmit={handleProtectedGenerate}>
        <FormSections
          showDemoMode={showDemoMode}
          generationCount={generationCount}
          onDemoGenerate={handleDemoGenerate}
          isGenerating={state.isGenerating}
          showFreeVsPro={showFreeVsPro}
          onUpgradeClick={handleUpgradeClick}
          user={user}
          sourceImage={sourceImage}
          onCameraCapture={handleCameraCapture}
          showApiKeyForm={showApiKeyForm}
          onApiKeySubmit={setTempApiKey}
          style={style}
          resolution={resolution}
          count={count}
          onStyleChange={setStyle}
          onResolutionChange={setResolution}
          onCountChange={setCount}
          onSourceImageChange={setSourceImage}
          prompt={prompt}
          onPromptChange={setPrompt}
          canGenerate={canGenerate}
          dailyGenerationsLeft={dailyGenerationsLeft}
          isFirstDay={isFirstDay}
          onAuthModalOpen={() => setAuthModalOpen(true)}
        />
      </FormLayout>
    </>
  );
};
