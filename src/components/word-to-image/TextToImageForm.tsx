
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { TabNavigation } from './TabNavigation';
import { SingleImageTab } from './SingleImageTab';
import { ExamplePromptsSection } from './ExamplePromptsSection';
import { StyleGallery } from './StyleGallery';
import { BatchGeneration } from './BatchGeneration';
import { ExamplePrompts } from './ExamplePrompts';
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
    
    let finalPrompt = prompt.trim();
    if (selectedStyles.length > 0) {
      const stylePrompts = selectedStyles.map(styleId => {
        return styleId.replace('-', ' ');
      }).join(', ');
      finalPrompt = `${finalPrompt}, ${stylePrompts}`;
    }
    
    setGeneratedImagesCount(prev => prev + 1);
    onGenerate(finalPrompt);
  };

  const handleBatchGenerate = (prompts: BatchPrompt[], applyStyles: boolean) => {
    prompts.forEach(promptData => {
      if (promptData.text.trim()) {
        let finalPrompt = promptData.text.trim();
        
        if (applyStyles && selectedStyles.length > 0) {
          selectedStyles.forEach(styleId => {
            const styledPrompt = `${finalPrompt}, ${styleId.replace('-', ' ')}`;
            
            for (let i = 0; i < promptData.variations; i++) {
              setTimeout(() => {
                onGenerate(styledPrompt);
              }, Math.random() * 1000);
            }
          });
        } else {
          for (let i = 0; i < promptData.variations; i++) {
            setTimeout(() => {
              onGenerate(finalPrompt);
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
    onGenerate(examplePrompt);
  };

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
    </div>
  );
}
