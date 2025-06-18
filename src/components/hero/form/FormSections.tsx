
import { DemoMode } from '../DemoMode';
import { FreeVsProComparison } from '../FreeVsProComparison';
import { CameraUpload } from '../CameraUpload';
import { ApiKeySection } from './ApiKeySection';
import { GenerationControls } from './controls/GenerationControls';
import { PromptInput } from './PromptInput';
import { ExamplePrompts } from './ExamplePrompts';
import { GenerateButton } from './GenerateButton';
import { FreeGenerationCounter } from './FreeGenerationCounter';
import { useIsMobile } from '@/hooks/use-mobile';

interface FormSectionsProps {
  // Demo mode
  showDemoMode: boolean;
  generationCount: number;
  onDemoGenerate: (prompt: string, style: string) => void;
  isGenerating: boolean;
  
  // Free vs Pro
  showFreeVsPro: boolean;
  onUpgradeClick: () => void;
  user: any;
  
  // Camera upload
  sourceImage: string;
  onCameraCapture: (imageData: string) => void;
  
  // API Key
  showApiKeyForm: boolean;
  onApiKeySubmit: (key: string) => void;
  
  // Generation controls
  style: string;
  resolution: string;
  count: number;
  onStyleChange: (style: string) => void;
  onResolutionChange: (resolution: string) => void;
  onCountChange: (count: number) => void;
  onSourceImageChange: (imageData: string) => void;
  
  // Prompt
  prompt: string;
  onPromptChange: (prompt: string) => void;
  
  // Generate button
  canGenerate: boolean;
  dailyGenerationsLeft: number;
  isFirstDay: boolean;
  
  // Auth
  onAuthModalOpen: () => void;
}

const MAX_FREE_ANONYMOUS_GENERATIONS = 1;

export const FormSections = ({
  showDemoMode,
  generationCount,
  onDemoGenerate,
  isGenerating,
  showFreeVsPro,
  onUpgradeClick,
  user,
  sourceImage,
  onCameraCapture,
  showApiKeyForm,
  onApiKeySubmit,
  style,
  resolution,
  count,
  onStyleChange,
  onResolutionChange,
  onCountChange,
  onSourceImageChange,
  prompt,
  onPromptChange,
  canGenerate,
  dailyGenerationsLeft,
  isFirstDay,
  onAuthModalOpen
}: FormSectionsProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Demo Mode - Show at top for immediate engagement */}
      {showDemoMode && generationCount === 0 && (
        <DemoMode 
          onDemoGenerate={onDemoGenerate}
          isGenerating={isGenerating}
        />
      )}

      {/* Free vs Pro Comparison - Show after first generation or for returning users */}
      {showFreeVsPro && (generationCount > 0 || !showDemoMode) && (
        <FreeVsProComparison 
          onUpgradeClick={onUpgradeClick}
          className="mb-4"
        />
      )}

      {/* Camera Upload for Mobile - Show when source image needed */}
      {isMobile && !sourceImage && (
        <div className="mb-4">
          <CameraUpload 
            onImageCapture={onCameraCapture}
            disabled={isGenerating}
          />
        </div>
      )}

      {/* Regular form components */}
      <ApiKeySection 
        showApiKeyForm={showApiKeyForm}
        onApiKeySubmit={onApiKeySubmit}
      />

      <GenerationControls 
        style={style}
        resolution={resolution}
        count={count}
        onStyleChange={onStyleChange}
        onResolutionChange={onResolutionChange}
        onCountChange={onCountChange}
        onSourceImageChange={onSourceImageChange}
      />

      <PromptInput 
        prompt={prompt}
        onChange={onPromptChange}
      />

      {/* Show example prompts only if demo mode is hidden */}
      {!showDemoMode && (
        <ExamplePrompts 
          onSelect={onPromptChange}
        />
      )}

      <GenerateButton 
        isGenerating={isGenerating}
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
          onSignUpClick={onAuthModalOpen}
        />
      )}
    </>
  );
};
