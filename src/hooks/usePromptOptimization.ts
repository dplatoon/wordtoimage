
import { useState, useCallback, useRef } from 'react';
import { promptEnhancement, PromptAnalysis, EnhancementOptions } from '@/services/promptEnhancementService';
import { toast } from 'sonner';

interface OptimizationState {
  isAnalyzing: boolean;
  analysis: PromptAnalysis | null;
  suggestions: string[];
  enhancedPrompt: string;
  negativePrompt: string;
  isEnhancing: boolean;
}

interface UsePromptOptimizationOptions {
  autoAnalyze?: boolean;
  debounceMs?: number;
  onAnalysisComplete?: (analysis: PromptAnalysis) => void;
  onEnhancementComplete?: (enhanced: string, negative: string) => void;
}

export function usePromptOptimization(options: UsePromptOptimizationOptions = {}) {
  const {
    autoAnalyze = true,
    debounceMs = 500,
    onAnalysisComplete,
    onEnhancementComplete
  } = options;

  const [state, setState] = useState<OptimizationState>({
    isAnalyzing: false,
    analysis: null,
    suggestions: [],
    enhancedPrompt: '',
    negativePrompt: '',
    isEnhancing: false
  });

  const debounceRef = useRef<NodeJS.Timeout>(undefined);

  const analyzePrompt = useCallback(async (prompt: string) => {
    if (!prompt.trim()) {
      setState(prev => ({
        ...prev,
        analysis: null,
        suggestions: []
      }));
      return null;
    }

    setState(prev => ({ ...prev, isAnalyzing: true }));

    try {
      const [analysis, suggestions] = await Promise.all([
        promptEnhancement.analyzePrompt(prompt),
        promptEnhancement.getOptimizationSuggestions(prompt)
      ]);

      setState(prev => ({
        ...prev,
        analysis,
        suggestions,
        isAnalyzing: false
      }));

      onAnalysisComplete?.(analysis);
      return analysis;
    } catch (error) {
      console.error('Prompt analysis failed:', error);
      setState(prev => ({ ...prev, isAnalyzing: false }));
      toast.error('Failed to analyze prompt');
      return null;
    }
  }, [onAnalysisComplete]);

  const analyzePromptDebounced = useCallback((prompt: string) => {
    if (!autoAnalyze) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      analyzePrompt(prompt);
    }, debounceMs);
  }, [analyzePrompt, autoAnalyze, debounceMs]);

  const enhancePrompt = useCallback(async (
    prompt: string, 
    enhancementOptions: EnhancementOptions = {}
  ) => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt to enhance');
      return null;
    }

    setState(prev => ({ ...prev, isEnhancing: true }));

    try {
      const result = await promptEnhancement.enhancePrompt(prompt, enhancementOptions);
      
      setState(prev => ({
        ...prev,
        enhancedPrompt: result.enhanced,
        negativePrompt: result.negative,
        analysis: result.analysis,
        isEnhancing: false
      }));

      onEnhancementComplete?.(result.enhanced, result.negative);
      
      toast.success('Prompt enhanced successfully!', {
        description: `Quality score: ${result.analysis.score}/100`
      });

      return result;
    } catch (error) {
      console.error('Prompt enhancement failed:', error);
      setState(prev => ({ ...prev, isEnhancing: false }));
      toast.error('Failed to enhance prompt');
      return null;
    }
  }, [onEnhancementComplete]);

  const getOptimalGuidanceScale = useCallback((
    prompt?: string,
    complexity?: string,
    style?: string
  ) => {
    if (state.analysis) {
      return state.analysis.recommendedGuidanceScale;
    }

    // Fallback calculation
    let baseScale = 7.5;
    
    if (complexity === 'simple') baseScale = 6.0;
    else if (complexity === 'complex') baseScale = 9.0;
    
    if (style?.includes('photo') || style?.includes('realistic')) {
      baseScale += 1.0;
    } else if (style?.includes('artistic') || style?.includes('creative')) {
      baseScale -= 0.5;
    }
    
    return Math.min(12, Math.max(3, baseScale));
  }, [state.analysis]);

  const batchOptimize = useCallback(async (
    prompts: string[],
    options: EnhancementOptions = {}
  ) => {
    if (prompts.length === 0) return [];

    setState(prev => ({ ...prev, isEnhancing: true }));

    try {
      const results = await promptEnhancement.optimizeBatch(prompts, options);
      
      setState(prev => ({ ...prev, isEnhancing: false }));
      
      toast.success(`Optimized ${results.length} prompts successfully!`);
      return results;
    } catch (error) {
      console.error('Batch optimization failed:', error);
      setState(prev => ({ ...prev, isEnhancing: false }));
      toast.error('Failed to optimize prompts');
      return [];
    }
  }, []);

  const clearResults = useCallback(() => {
    setState({
      isAnalyzing: false,
      analysis: null,
      suggestions: [],
      enhancedPrompt: '',
      negativePrompt: '',
      isEnhancing: false
    });
  }, []);

  return {
    // State
    ...state,
    
    // Actions
    analyzePrompt,
    analyzePromptDebounced,
    enhancePrompt,
    batchOptimize,
    clearResults,
    getOptimalGuidanceScale,
    
    // Computed values
    hasResults: !!(state.analysis || state.enhancedPrompt),
    qualityScore: state.analysis?.score || 0,
    isProcessing: state.isAnalyzing || state.isEnhancing
  };
}
