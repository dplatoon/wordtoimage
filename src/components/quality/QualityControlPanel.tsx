
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Settings,
  CheckCircle2
} from 'lucide-react';
import { PromptOptimizer } from '@/components/prompts/PromptOptimizer';
import { StyleGuidanceOptimizer } from '@/components/prompts/StyleGuidanceOptimizer';
import { usePromptOptimization } from '@/hooks/usePromptOptimization';
import { cn } from '@/lib/utils';

interface QualityControlPanelProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onNegativePromptChange?: (negative: string) => void;
  onGuidanceScaleChange?: (scale: number) => void;
  onQualitySettingsChange?: (settings: any) => void;
  className?: string;
}

export function QualityControlPanel({
  prompt,
  onPromptChange,
  onNegativePromptChange,
  onGuidanceScaleChange,
  onQualitySettingsChange,
  className
}: QualityControlPanelProps) {
  const [activeTab, setActiveTab] = useState('prompt');
  const [qualityMode, setQualityMode] = useState<'auto' | 'manual'>('auto');

  const {
    analysis,
    enhancedPrompt,
    negativePrompt,
    suggestions,
    isProcessing,
    qualityScore,
    analyzePromptDebounced,
    enhancePrompt,
    getOptimalGuidanceScale
  } = usePromptOptimization({
    autoAnalyze: true,
    onAnalysisComplete: (analysis) => {
      if (qualityMode === 'auto' && onGuidanceScaleChange) {
        onGuidanceScaleChange(analysis.recommendedGuidanceScale);
      }
    }
  });

  // Auto-analyze when prompt changes
  React.useEffect(() => {
    analyzePromptDebounced(prompt);
  }, [prompt, analyzePromptDebounced]);

  const qualityLevel = React.useMemo(() => {
    if (qualityScore >= 80) return { level: 'excellent', color: 'text-green-600', bg: 'bg-green-50' };
    if (qualityScore >= 60) return { level: 'good', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (qualityScore >= 40) return { level: 'fair', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'needs improvement', color: 'text-red-600', bg: 'bg-red-50' };
  }, [qualityScore]);

  const handleQuickOptimize = async () => {
    const result = await enhancePrompt(prompt, {
      emphasizeQuality: true,
      includeNegatives: true,
      preserveOriginal: false
    });

    if (result) {
      onPromptChange(result.enhanced);
      if (onNegativePromptChange) {
        onNegativePromptChange(result.negative);
      }
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-violet-600" />
            Quality Control Center
          </CardTitle>
          
          <div className="flex items-center gap-3">
            {analysis && (
              <div className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                qualityLevel.bg,
                qualityLevel.color
              )}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  Quality: {qualityScore}/100 ({qualityLevel.level})
                </div>
              </div>
            )}
            
            <Button
              size="sm"
              onClick={handleQuickOptimize}
              disabled={!prompt.trim() || isProcessing}
              className="bg-gradient-to-r from-violet-600 to-purple-600"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Quick Optimize
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        {analysis && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-violet-600">
                {analysis.complexity.charAt(0).toUpperCase() + analysis.complexity.slice(1)}
              </div>
              <div className="text-xs text-gray-600">Complexity</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-violet-600 capitalize">
                {analysis.estimatedStyle}
              </div>
              <div className="text-xs text-gray-600">Detected Style</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-violet-600">
                {analysis.recommendedGuidanceScale.toFixed(1)}
              </div>
              <div className="text-xs text-gray-600">Rec. Guidance</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-violet-600">
                {suggestions.length}
              </div>
              <div className="text-xs text-gray-600">Suggestions</div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="prompt" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Prompt
            </TabsTrigger>
            <TabsTrigger value="guidance" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Guidance
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prompt" className="mt-6">
            <PromptOptimizer
              initialPrompt={prompt}
              onPromptChange={onPromptChange}
              onNegativePromptChange={onNegativePromptChange}
              onGuidanceScaleChange={onGuidanceScaleChange}
            />
          </TabsContent>

          <TabsContent value="guidance" className="mt-6">
            <StyleGuidanceOptimizer
              currentSettings={{
                scale: analysis?.recommendedGuidanceScale || 7.5,
                steps: 25,
                strength: 0.8,
                scheduler: 'DPMSolverMultistep'
              }}
              onSettingsChange={(settings) => {
                if (onGuidanceScaleChange && settings.scale) {
                  onGuidanceScaleChange(settings.scale);
                }
                onQualitySettingsChange?.(settings);
              }}
              promptComplexity={analysis?.complexity}
              detectedStyle={analysis?.estimatedStyle}
            />
          </TabsContent>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              {/* Quality Overview */}
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-violet-600" />
                  Quality Assessment
                </h3>
                
                {analysis ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Strengths */}
                    {analysis.strengths.length > 0 && (
                      <div>
                        <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                        <div className="space-y-2">
                          {analysis.strengths.map((strength, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span>{strength}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Improvement Areas */}
                    {analysis.suggestions.length > 0 && (
                      <div>
                        <h4 className="font-medium text-blue-700 mb-2">Suggestions</h4>
                        <div className="space-y-2">
                          {analysis.suggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <Settings className="h-4 w-4 text-blue-500" />
                              <span>{suggestion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Enter a prompt to see quality assessment
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('prompt')}
                  className="h-16 flex-col gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Optimize Prompt</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('guidance')}
                  className="h-16 flex-col gap-2"
                >
                  <Target className="h-5 w-5" />
                  <span>Tune Guidance</span>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
