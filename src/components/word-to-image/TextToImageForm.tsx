
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { TabNavigation } from './TabNavigation';
import { SingleImageTab } from './SingleImageTab';
import { ExamplePromptsSection } from './ExamplePromptsSection';
import { ProfessionalStyleGallery } from './ProfessionalStyleGallery';
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
      toast.error("Please enter a description for your image", {
        description: "Describe what you'd like to create in detail"
      });
      return;
    }
    
    if (prompt.trim().length < 15) {
      toast.error("Please provide more details", {
        description: "Add more descriptive elements for better results (at least 15 characters)"
      });
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
    
    // Professional success feedback
    toast.success("Generation started!", {
      description: selectedStyles.length > 0 
        ? `Creating with ${selectedStyles.length} style${selectedStyles.length > 1 ? 's' : ''}`
        : "Your professional image is being created",
    });
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
    
    toast.success("Batch generation started!", {
      description: "Multiple images are being created with your settings"
    });
  };

  const handleStyleToggle = (styleId: string) => {
    setSelectedStyles(prev =>
      prev.includes(styleId)
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    );
  };

  const handleGenerateWithStyles = (styles: string[]) => {
    if (prompt) {
      let finalPrompt = prompt.trim();
      const stylePrompts = styles.map(styleId => styleId.replace('-', ' ')).join(', ');
      finalPrompt = `${finalPrompt}, ${stylePrompts}`;
      onGenerate(finalPrompt);
      toast.success("Generating with selected styles!", {
        description: `Applied ${styles.length} professional art style${styles.length > 1 ? 's' : ''}`
      });
    } else {
      toast.error("Please enter a description first", {
        description: "Add your image description before applying styles"
      });
    }
  };

  const handleSelectPrompt = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    setActiveTab('single');
    toast.success('Professional prompt loaded!', {
      description: "Example prompt has been added to your description"
    });
  };

  const handleGenerateExample = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    onGenerate(examplePrompt);
    toast.success("Generating example!", {
      description: "Creating image from professional prompt"
    });
  };

  return (
    <div className="w-full space-y-6">
      <Card className="shadow-xl border-gray-200 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm">
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
              <ProfessionalStyleGallery
                selectedStyles={selectedStyles}
                onStyleToggle={handleStyleToggle}
                onGenerateWithStyles={handleGenerateWithStyles}
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
