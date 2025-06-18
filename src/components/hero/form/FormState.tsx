
import { useState } from 'react';
import { useImageGenerationForm } from '@/hooks/useImageGenerationForm';

interface FormStateProps {
  onImageGenerated: (url: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onError: (error: string | null) => void;
  onNewGalleryRow?: (images: { url: string; prompt: string, style?: string, resolution?: string }[]) => void;
}

export const useFormState = (props: FormStateProps) => {
  const formState = useImageGenerationForm(props);
  
  const [showDemoMode, setShowDemoMode] = useState(true);
  const [showCameraUpload, setShowCameraUpload] = useState(false);
  const [showFreeVsPro, setShowFreeVsPro] = useState(!formState.user);
  const [showStyleQuiz, setShowStyleQuiz] = useState(false);

  const handleDemoGenerate = (demoPrompt: string, demoStyle: string) => {
    formState.setPrompt(demoPrompt);
    formState.setStyle(demoStyle);
    setShowDemoMode(false);
    // Create a synthetic event for handleProtectedGenerate
    const syntheticEvent = {
      preventDefault: () => {}
    } as React.FormEvent<HTMLFormElement>;
    formState.handleProtectedGenerate(syntheticEvent);
  };

  const handleCameraCapture = (imageData: string) => {
    formState.setSourceImage(imageData);
    setShowCameraUpload(false);
  };

  const handleUpgradeClick = () => {
    formState.setAuthModalOpen(true);
  };

  const handleStyleQuizComplete = (profile: any) => {
    // Use the profile to enhance the prompt and style
    formState.setStyle(profile.primaryStyle);
    const stylePrompt = `A ${profile.primaryStyle} ${profile.roomType} room with ${profile.colorPreference} colors`;
    formState.setPrompt(stylePrompt);
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

  return {
    ...formState,
    showDemoMode,
    setShowDemoMode,
    showCameraUpload,
    setShowCameraUpload,
    showFreeVsPro,
    setShowFreeVsPro,
    showStyleQuiz,
    setShowStyleQuiz,
    handleDemoGenerate,
    handleCameraCapture,
    handleUpgradeClick,
    handleStyleQuizComplete,
    handleQuizStart,
    handleGenerateClick
  };
};
