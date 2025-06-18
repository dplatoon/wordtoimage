
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PremiumFeatureGate } from './PremiumFeatureGate';
import { Brain, Sparkles, TrendingUp, Target, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface StylePreference {
  style: string;
  preference: number; // 0-100
  useCount: number;
}

interface PersonalizationData {
  stylePreferences: StylePreference[];
  commonPromptWords: { word: string; frequency: number }[];
  preferredResolutions: { resolution: string; count: number }[];
  generationTimes: string[];
  totalGenerations: number;
}

interface AISuggestion {
  type: 'style' | 'prompt' | 'timing' | 'workflow';
  title: string;
  description: string;
  confidence: number;
  action?: () => void;
}

export const AIPersonalization = () => {
  const [personalizationData, setPersonalizationData] = useState<PersonalizationData | null>(null);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Mock data for demonstration - in real app this would come from analytics
  const mockPersonalizationData: PersonalizationData = {
    stylePreferences: [
      { style: 'anime', preference: 85, useCount: 45 },
      { style: 'photorealistic', preference: 72, useCount: 28 },
      { style: 'artistic', preference: 58, useCount: 15 },
      { style: 'cartoon', preference: 43, useCount: 8 },
    ],
    commonPromptWords: [
      { word: 'landscape', frequency: 23 },
      { word: 'beautiful', frequency: 19 },
      { word: 'colorful', frequency: 16 },
      { word: 'fantasy', frequency: 14 },
      { word: 'magical', frequency: 12 },
    ],
    preferredResolutions: [
      { resolution: '1024x1024', count: 67 },
      { resolution: '1792x1024', count: 24 },
      { resolution: '1024x1792', count: 15 },
    ],
    generationTimes: ['14:30', '16:45', '20:15'], // Peak usage times
    totalGenerations: 156
  };

  const generateSuggestions = (data: PersonalizationData): AISuggestion[] => {
    const suggestions: AISuggestion[] = [];

    // Style suggestion
    const topStyle = data.stylePreferences[0];
    if (topStyle.preference > 70) {
      suggestions.push({
        type: 'style',
        title: `Optimize for ${topStyle.style} style`,
        description: `You use ${topStyle.style} style ${topStyle.preference}% of the time. Try our enhanced ${topStyle.style} presets for better results.`,
        confidence: topStyle.preference
      });
    }

    // Prompt enhancement suggestion
    const topWords = data.commonPromptWords.slice(0, 3);
    suggestions.push({
      type: 'prompt',
      title: 'Smart prompt suggestions',
      description: `Based on your favorite words (${topWords.map(w => w.word).join(', ')}), we can auto-complete your prompts.`,
      confidence: 78
    });

    // Workflow optimization
    if (data.totalGenerations > 100) {
      suggestions.push({
        type: 'workflow',
        title: 'Batch generation workflow',
        description: 'With your high usage, consider using batch generation to create multiple variations at once.',
        confidence: 85
      });
    }

    // Timing suggestion
    suggestions.push({
      type: 'timing',
      title: 'Optimal generation times',
      description: 'You generate most images around 4-8 PM. Enable notifications for off-peak faster processing.',
      confidence: 65
    });

    return suggestions;
  };

  useEffect(() => {
    // Simulate loading personalization data
    setTimeout(() => {
      setPersonalizationData(mockPersonalizationData);
      setSuggestions(generateSuggestions(mockPersonalizationData));
      setLoading(false);
    }, 1500);
  }, []);

  const handleApplySuggestion = (suggestion: AISuggestion) => {
    // In real app, this would apply the suggestion
    console.log('Applying suggestion:', suggestion);
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <Brain className="h-8 w-8 animate-pulse mx-auto text-purple-600" />
            <p className="text-gray-600">Analyzing your creative patterns...</p>
            <Progress value={66} className="w-48" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <PremiumFeatureGate
      feature="AI Personalization"
      requiredPlan="pro"
      description="Get personalized recommendations based on your creative patterns and preferences"
    >
      <div className="space-y-6">
        {/* Overview Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Your Creative DNA
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">Pro</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {personalizationData && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Style Preferences */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Style Preferences
                  </h3>
                  <div className="space-y-2">
                    {personalizationData.stylePreferences.slice(0, 3).map((style) => (
                      <div key={style.style} className="flex justify-between items-center">
                        <span className="text-sm capitalize">{style.style}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={style.preference} className="w-16 h-2" />
                          <span className="text-xs text-gray-500 w-8">{style.preference}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Words */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Favorite Words
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {personalizationData.commonPromptWords.slice(0, 5).map((word) => (
                      <Badge key={word.word} variant="outline" className="text-xs">
                        {word.word} ({word.frequency})
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Usage Stats */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Usage Stats
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Generations:</span>
                      <span className="font-medium">{personalizationData.totalGenerations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Favorite Resolution:</span>
                      <span className="font-medium">{personalizationData.preferredResolutions[0].resolution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peak Time:</span>
                      <span className="font-medium">{personalizationData.generationTimes[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600">{suggestion.description}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs"
                    >
                      {suggestion.confidence}% confidence
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Progress value={suggestion.confidence} className="w-24 h-2" />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleApplySuggestion(suggestion)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PremiumFeatureGate>
  );
};
