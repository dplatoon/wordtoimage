
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Lightbulb, 
  Wand2, 
  Target, 
  TrendingUp, 
  Sparkles,
  Copy,
  RefreshCw,
  Settings
} from 'lucide-react';
import { promptEnhancement, PromptAnalysis, EnhancementOptions } from '@/services/promptEnhancementService';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface PromptOptimizerProps {
  initialPrompt?: string;
  onPromptChange: (prompt: string) => void;
  onNegativePromptChange?: (negative: string) => void;
  onGuidanceScaleChange?: (scale: number) => void;
  className?: string;
}

export function PromptOptimizer({ 
  initialPrompt = '',
  onPromptChange,
  onNegativePromptChange,
  onGuidanceScaleChange,
  className 
}: PromptOptimizerProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [options, setOptions] = useState<EnhancementOptions>({
    emphasizeQuality: true,
    includeNegatives: true,
    preserveOriginal: false
  });

  // Real-time analysis with debouncing
  useEffect(() => {
    if (!prompt.trim()) {
      setAnalysis(null);
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsAnalyzing(true);
      try {
        const [analysisResult, suggestionsList] = await Promise.all([
          promptEnhancement.analyzePrompt(prompt),
          promptEnhancement.getOptimizationSuggestions(prompt)
        ]);
        
        setAnalysis(analysisResult);
        setSuggestions(suggestionsList);
      } catch (error) {
        console.error('Analysis failed:', error);
        toast.error('Failed to analyze prompt');
      } finally {
        setIsAnalyzing(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [prompt]);

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    onPromptChange(value);
  };

  const handleEnhance = async () => {
    if (!prompt.trim()) return;

    setIsAnalyzing(true);
    try {
      const result = await promptEnhancement.enhancePrompt(prompt, options);
      
      setEnhancedPrompt(result.enhanced);
      setNegativePrompt(result.negative);
      setAnalysis(result.analysis);
      
      // Update guidance scale if callback provided
      if (onGuidanceScaleChange) {
        onGuidanceScaleChange(result.analysis.recommendedGuidanceScale);
      }
      
      toast.success('Prompt enhanced successfully!', {
        description: `Quality score: ${result.analysis.score}/100`
      });
    } catch (error) {
      console.error('Enhancement failed:', error);
      toast.error('Failed to enhance prompt');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplyEnhancement = () => {
    if (enhancedPrompt) {
      handlePromptChange(enhancedPrompt);
      if (onNegativePromptChange && negativePrompt) {
        onNegativePromptChange(negativePrompt);
      }
      toast.success('Enhanced prompt applied!');
    }
  };

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  const qualityColor = useMemo(() => {
    if (!analysis) return 'bg-gray-200';
    if (analysis.score >= 80) return 'bg-green-500';
    if (analysis.score >= 60) return 'bg-yellow-500';
    if (analysis.score >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  }, [analysis]);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-violet-600" />
          AI Prompt Optimizer
          {isAnalyzing && <RefreshCw className="h-4 w-4 animate-spin" />}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Prompt Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Prompt</label>
          <Textarea
            value={prompt}
            onChange={(e) => handlePromptChange(e.target.value)}
            placeholder="Describe what you want to create..."
            className="min-h-[100px] resize-y"
          />
          
          {/* Real-time Quality Score */}
          {analysis && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Quality Score:</span>
                <Progress value={analysis.score} className="w-20 h-2" />
                <Badge variant={analysis.score >= 60 ? "default" : "destructive"}>
                  {analysis.score}/100
                </Badge>
              </div>
              <Badge variant="outline" className="text-xs">
                {analysis.complexity} complexity
              </Badge>
              <Badge variant="outline" className="text-xs">
                {analysis.estimatedStyle} style
              </Badge>
            </div>
          )}
        </div>

        {/* Real-time Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Quick Suggestions</span>
            </div>
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhancement Options */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="text-sm font-medium">Enhancement Options</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.emphasizeQuality}
                onChange={(e) => setOptions(prev => ({ 
                  ...prev, 
                  emphasizeQuality: e.target.checked 
                }))}
                className="rounded"
              />
              <span className="text-sm">Emphasize Quality</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.includeNegatives}
                onChange={(e) => setOptions(prev => ({ 
                  ...prev, 
                  includeNegatives: e.target.checked 
                }))}
                className="rounded"
              />
              <span className="text-sm">Add Negative Prompts</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.preserveOriginal}
                onChange={(e) => setOptions(prev => ({ 
                  ...prev, 
                  preserveOriginal: e.target.checked 
                }))}
                className="rounded"
              />
              <span className="text-sm">Preserve Original</span>
            </label>
          </div>
        </div>

        {/* Enhancement Button */}
        <Button 
          onClick={handleEnhance}
          disabled={!prompt.trim() || isAnalyzing}
          className="w-full"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {isAnalyzing ? 'Analyzing...' : 'Enhance Prompt'}
        </Button>

        {/* Results Tabs */}
        {(analysis || enhancedPrompt) && (
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="enhanced">Enhanced</TabsTrigger>
              <TabsTrigger value="negative">Negative</TabsTrigger>
            </TabsList>

            <TabsContent value="analysis" className="space-y-4">
              {analysis && (
                <>
                  {/* Strengths */}
                  {analysis.strengths.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-green-700 mb-2">Strengths</h4>
                      <div className="space-y-1">
                        {analysis.strengths.map((strength, index) => (
                          <div key={index} className="text-sm text-green-600 bg-green-50 p-2 rounded">
                            ✅ {strength}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Weaknesses */}
                  {analysis.weaknesses.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-red-700 mb-2">Areas for Improvement</h4>
                      <div className="space-y-1">
                        {analysis.weaknesses.map((weakness, index) => (
                          <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                            ⚠️ {weakness}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-sm font-medium text-blue-700">Recommended Guidance Scale</div>
                      <div className="text-lg font-bold text-blue-800">
                        {analysis.recommendedGuidanceScale}
                      </div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <div className="text-sm font-medium text-purple-700">Detected Style</div>
                      <div className="text-lg font-bold text-purple-800 capitalize">
                        {analysis.estimatedStyle}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="enhanced" className="space-y-4">
              {enhancedPrompt && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Enhanced Prompt</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyToClipboard(enhancedPrompt, 'Enhanced prompt')}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleApplyEnhancement}
                      >
                        <Target className="h-3 w-3 mr-1" />
                        Apply
                      </Button>
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded text-sm border-l-4 border-green-400">
                    {enhancedPrompt}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="negative" className="space-y-4">
              {negativePrompt && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Negative Prompt</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyToClipboard(negativePrompt, 'Negative prompt')}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-red-50 p-3 rounded text-sm border-l-4 border-red-400">
                    {negativePrompt}
                  </div>
                  <div className="text-xs text-gray-500">
                    Negative prompts help avoid unwanted elements in your generated images.
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
