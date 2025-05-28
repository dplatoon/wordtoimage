import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, Settings, Grid3X3, Palette } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptInput } from './PromptInput';
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
        // You would map styleId to actual style prompts here
        return styleId.replace('-', ' ');
      }).join(', ');
      finalPrompt = `${finalPrompt}, ${stylePrompts}`;
    }
    
    setCurrentPrompt(finalPrompt);
    setTotalImages(1);
    setCompletedImages(0);
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

  return (
    <div className="w-full space-y-6">
      <Card className="shadow-sm border-gray-200">
        <CardContent className={cn(
          "pt-6",
          isMobile ? "px-4 py-4" : "px-6 py-6"
        )}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={cn(
              "grid w-full grid-cols-4 mb-6",
              isMobile ? "h-12" : "h-14"
            )}>
              <TabsTrigger value="single" className="flex items-center gap-1">
                <Wand2 className="h-4 w-4" />
                <span className={isMobile ? "hidden" : "inline"}>Single</span>
              </TabsTrigger>
              <TabsTrigger value="styles" className="flex items-center gap-1">
                <Palette className="h-4 w-4" />
                <span className={isMobile ? "hidden" : "inline"}>Styles</span>
              </TabsTrigger>
              <TabsTrigger value="batch" className="flex items-center gap-1">
                <Grid3X3 className="h-4 w-4" />
                <span className={isMobile ? "hidden" : "inline"}>Batch</span>
              </TabsTrigger>
              <TabsTrigger value="examples" className="flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                <span className={isMobile ? "hidden" : "inline"}>Examples</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="space-y-6">
              <div className={cn(
                "space-y-4",
                isMobile && "space-y-3"
              )}>
                <div className="flex items-center">
                  <Wand2 className="text-blue-600 mr-2 h-5 w-5" />
                  <h2 className={cn(
                    "font-medium text-gray-800",
                    isMobile ? "text-lg" : "text-xl"
                  )}>
                    Describe Your Image
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit} className={cn(
                  "space-y-4",
                  isMobile && "space-y-3"
                )}>
                  <PromptInput 
                    prompt={prompt}
                    onPromptChange={setPrompt}
                  />
                  
                  {selectedStyles.length > 0 && (
                    <div className={cn(
                      "p-3 bg-blue-50 rounded-lg",
                      isMobile && "p-2"
                    )}>
                      <p className={cn(
                        "text-blue-700 mb-2",
                        isMobile ? "text-xs" : "text-sm"
                      )}>
                        Selected styles will be applied: {selectedStyles.join(', ')}
                      </p>
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    disabled={!prompt.trim() || isGenerating || prompt.trim().length < 10}
                    className={cn(
                      "w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg transition-all duration-200",
                      isMobile ? "py-4 text-base h-14 mt-4" : "py-6 text-lg h-16 mt-6"
                    )}
                  >
                    {isGenerating ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin mr-3 h-5 w-5 border-b-2 border-white rounded-full" />
                        Creating Your Image...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Sparkles className="mr-3 h-5 w-5" />
                        Generate Image
                      </span>
                    )}
                  </Button>
                </form>
              </div>
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
