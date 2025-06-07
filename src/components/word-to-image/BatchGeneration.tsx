
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Minus, Grid3X3, Zap } from 'lucide-react';

interface BatchPrompt {
  id: string;
  text: string;
  variations: number;
}

interface BatchGenerationProps {
  onBatchGenerate: (prompts: BatchPrompt[], applyStyles: boolean) => void;
  selectedStyles: string[];
  isGenerating: boolean;
}

export function BatchGeneration({ onBatchGenerate, selectedStyles, isGenerating }: BatchGenerationProps) {
  const [prompts, setPrompts] = useState<BatchPrompt[]>([
    { id: '1', text: '', variations: 4 }
  ]);
  const [applyStylesToAll, setApplyStylesToAll] = useState(true);

  const addPrompt = () => {
    const newId = Date.now().toString();
    setPrompts(prev => [...prev, { id: newId, text: '', variations: 4 }]);
  };

  const removePrompt = (id: string) => {
    if (prompts.length > 1) {
      setPrompts(prev => prev.filter(p => p.id !== id));
    }
  };

  const updatePrompt = (id: string, text: string) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, text } : p));
  };

  const updateVariations = (id: string, variations: number[]) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, variations: variations[0] } : p));
  };

  const totalImages = prompts.reduce((sum, prompt) => {
    if (!prompt.text.trim()) return sum;
    const baseImages = prompt.variations;
    const styleMultiplier = applyStylesToAll && selectedStyles.length > 0 ? selectedStyles.length : 1;
    return sum + (baseImages * styleMultiplier);
  }, 0);

  const handleGenerate = () => {
    const validPrompts = prompts.filter(p => p.text.trim());
    if (validPrompts.length > 0) {
      onBatchGenerate(validPrompts, applyStylesToAll);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Grid3X3 className="h-5 w-5" />
          Batch Generation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="apply-styles" className="text-sm font-medium">
            Apply selected styles to all prompts
          </Label>
          <Switch
            id="apply-styles"
            checked={applyStylesToAll}
            onCheckedChange={setApplyStylesToAll}
          />
        </div>

        {selectedStyles.length > 0 && applyStylesToAll && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700 mb-2">
              Each prompt will be generated with {selectedStyles.length} different styles:
            </p>
            <div className="flex flex-wrap gap-1">
              {selectedStyles.slice(0, 3).map(styleId => (
                <Badge key={styleId} variant="secondary" className="text-xs">
                  {styleId}
                </Badge>
              ))}
              {selectedStyles.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{selectedStyles.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {prompts.map((prompt, index) => (
            <div
              key={prompt.id}
              className="border rounded-lg p-4 space-y-3 animate-fade-in"
            >
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Prompt {index + 1}
                </Label>
                {prompts.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePrompt(prompt.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <Textarea
                placeholder="Enter your image description..."
                value={prompt.text}
                onChange={(e) => updatePrompt(prompt.id, e.target.value)}
                className="min-h-[80px]"
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Variations per prompt</Label>
                  <Badge variant="outline">{prompt.variations}</Badge>
                </div>
                <Slider
                  value={[prompt.variations]}
                  onValueChange={(value) => updateVariations(prompt.id, value)}
                  max={8}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={addPrompt}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Prompt
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="text-sm text-gray-500">
            Total images: <strong>{totalImages}</strong>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || totalImages === 0}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              Generating {totalImages} images...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Generate {totalImages} Images
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
