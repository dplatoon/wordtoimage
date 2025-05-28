
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { TabNavigation } from './TabNavigation';
import { SingleImageTab } from './SingleImageTab';
import { ExamplePromptsSection } from './ExamplePromptsSection';
import { GenerationFeedback } from './GenerationFeedback';
import { StyleGallery } from './StyleGallery';
import { BatchGeneration } from './BatchGeneration';
import { ExamplePrompts } from './ExamplePrompts';
import { GenerationProgress } from './GenerationProgress';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';

interface TextToImageFormProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

interface BatchPrompt {
  id: string;
  text: string;
  variations: number;
}

export function TextToImageForm({ onGenerate, isGenerating }: TextToImageFormProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('single');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [totalImages, setTotalImages] = useState(0);
  const [completedImages, setCompletedImages] = useState(0);
  const [lastGenerationTime, setLastGenerationTime] = useState<number | null>(null);
  const [generatedImagesCount, setGeneratedImagesCount] = useState(0);
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error("Please enter a description for your image");
      return;
    }
    
    if (prompt.trim().length < 10) {
      toast.error("Please provide a more detailed description (at least 10 characters)");
      return;
    }
    
    // Apply selected styles to the prompt
    let finalPrompt = prompt.trim();
    if (selectedStyles.length > 0) {
      const stylePrompts = selectedStyles.map(styleId => {
        return styleId.replace('-', ' ');
      }).join(', ');
      finalPrompt = `${finalPrompt}, ${stylePrompts}`;
    }
    
    setCurrentPrompt(finalPrompt);
    setTotalImages(1);
    setCompletedImages(0);
    setLastGenerationTime(Date.now());
    setGeneratedImagesCount(prev => prev + 1);
    onGenerate(finalPrompt);
  };

  const handleBatchGenerate = (prompts: BatchPrompt[], applyStyles: boolean) => {
    const totalCount = prompts.reduce((sum, p) => {
      if (!p.text.trim()) return sum;
      const baseImages = p.variations;
      const styleMultiplier = applyStyles && selectedStyles.length > 0 ? selectedStyles.length : 1;
      return sum + (baseImages * styleMultiplier);
    }, 0);

    setTotalImages(totalCount);
    setCompletedImages(0);

    // Generate each prompt with variations
    prompts.forEach(promptData => {
      if (promptData.text.trim()) {
        let finalPrompt = promptData.text.trim();
        
        if (applyStyles && selectedStyles.length > 0) {
          selectedStyles.forEach(styleId => {
            const styledPrompt = `${finalPrompt}, ${styleId.replace('-', ' ')}`;
            setCurrentPrompt(styledPrompt);
            
            for (let i = 0; i < promptData.variations; i++) {
              setTimeout(() => {
                onGenerate(styledPrompt);
                setCompletedImages(prev => prev + 1);
              }, Math.random() * 1000);
            }
          });
        } else {
          setCurrentPrompt(finalPrompt);
          for (let i = 0; i < promptData.variations; i++) {
            setTimeout(() => {
              onGenerate(finalPrompt);
              setCompletedImages(prev => prev + 1);
            }, Math.random() * 1000);
          }
        }
      }
    });
  };

  const handleStyleToggle = (styleId: string) => {
    setSelectedStyles(prev =>
      prev.includes(styleId)
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    );
  };

  const handleApplyStyle = (stylePrompt: string) => {
    if (prompt) {
      setPrompt(`${prompt}, ${stylePrompt}`);
    } else {
      setPrompt(stylePrompt);
    }
    toast.success('Style applied to prompt!');
  };

  const handleSelectPrompt = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    setActiveTab('single');
    toast.success('Example prompt loaded!');
  };

  const handleGenerateExample = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    setCurrentPrompt(examplePrompt);
    setTotalImages(1);
    setCompletedImages(0);
    onGenerate(examplePrompt);
  };

  const generationTime = lastGenerationTime ? ((Date.now() - lastGenerationTime) / 1000).toFixed(1) : null;

  return (
    <div className="w-full space-y-6">
      <Card className="shadow-sm border-gray-200">
        <CardContent className={cn(
          "pt-6",
          isMobile ? "px-3 py-4" : "px-6 py-6"
        )}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabNavigation activeTab={activeTab} />

            <TabsContent value="single" className="space-y-6">
              <SingleImageTab
                prompt={prompt}
                onPromptChange={setPrompt}
                selectedStyles={selectedStyles}
                onSubmit={handleSubmit}
                isGenerating={isGenerating}
              />
              
              <ExamplePromptsSection
                onPromptSelect={setPrompt}
                isGenerating={isGenerating}
                generatedImagesCount={generatedImagesCount}
              />
              
              <GenerationFeedback
                isGenerating={isGenerating}
                generationTime={generationTime}
              />
            </TabsContent>

            <TabsContent value="styles">
              <StyleGallery
                selectedStyles={selectedStyles}
                onStyleToggle={handleStyleToggle}
                onApplyStyle={handleApplyStyle}
              />
            </TabsContent>

            <TabsContent value="batch">
              <BatchGeneration
                onBatchGenerate={handleBatchGenerate}
                selectedStyles={selectedStyles}
                isGenerating={isGenerating}
              />
            </TabsContent>

            <TabsContent value="examples">
              <ExamplePrompts
                onSelectPrompt={handleSelectPrompt}
                onGenerateExample={handleGenerateExample}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Generation Progress */}
      <GenerationProgress
        isGenerating={isGenerating}
        currentPrompt={currentPrompt}
        totalImages={totalImages}
        completedImages={completedImages}
      />
    </div>
  );
}
