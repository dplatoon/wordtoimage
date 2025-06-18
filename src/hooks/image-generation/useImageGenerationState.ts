
import { useState } from 'react';
import { AdvancedStyleSettings } from '@/components/premium/AdvancedStyleControls';

export interface ImageGenerationState {
  style: string;
  resolution: string;
  count: number;
  sourceImage: string;
  authModalOpen: boolean;
  isGenerating: boolean;
  // Premium features
  advancedSettings?: AdvancedStyleSettings;
  batchMode: boolean;
}

export const useImageGenerationState = () => {
  const [state, setState] = useState<ImageGenerationState>({
    style: 'auto',
    resolution: '1024x1024',
    count: 1,
    sourceImage: '',
    authModalOpen: false,
    isGenerating: false,
    batchMode: false
  });

  const setStyle = (style: string) => {
    setState(prev => ({ ...prev, style }));
  };

  const setResolution = (resolution: string) => {
    setState(prev => ({ ...prev, resolution }));
  };

  const setCount = (count: number) => {
    setState(prev => ({ ...prev, count }));
  };

  const setSourceImage = (sourceImage: string) => {
    setState(prev => ({ ...prev, sourceImage }));
  };

  const setAuthModalOpen = (authModalOpen: boolean) => {
    setState(prev => ({ ...prev, authModalOpen }));
  };

  const setAdvancedSettings = (advancedSettings: AdvancedStyleSettings) => {
    setState(prev => ({ ...prev, advancedSettings }));
  };

  const setBatchMode = (batchMode: boolean) => {
    setState(prev => ({ ...prev, batchMode }));
  };

  return {
    state,
    setStyle,
    setResolution,
    setCount,
    setSourceImage,
    setAuthModalOpen,
    setAdvancedSettings,
    setBatchMode
  };
};
