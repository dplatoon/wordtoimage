
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ImageIcon, Image as ImageLucide, Wand2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PromptInput } from './PromptInput';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ImageUploader } from '@/components/hero/form/controls/ImageUploader';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface TextToImageFormProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export function TextToImageForm({ onGenerate, isGenerating }: TextToImageFormProps) {
  const [prompt, setPrompt] = useState('');
  const [sourceImage, setSourceImage] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const handleImageSelected = (imageData: string) => {
    setSourceImage(imageData);
    setSelectedTemplate('');
  };
  
  const handleTemplateSelect = (templateUrl: string) => {
    setSelectedTemplate(templateUrl);
    setSourceImage(templateUrl);
  };
  
  // Template options
  const templates = [
    {
      id: 'template1',
      url: '/placeholder.svg',
      label: 'Portrait Style',
    },
    {
      id: 'template2',
      url: '/placeholder.svg',
      label: 'Landscape',
    },
    {
      id: 'template3',
      url: '/placeholder.svg', 
      label: 'Square Format',
    }
  ];

  return (
    <Card className="shadow-sm border-gray-200">
      <CardContent className={cn("pt-6", isMobile ? "px-3" : "")}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Prompt Input */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Wand2 className="text-blue-600 mr-2 h-5 w-5" />
              <h2 className="text-xl font-medium text-gray-800">Describe Your Image</h2>
            </div>
            
            <PromptInput 
              prompt={prompt}
              onPromptChange={setPrompt}
            />
            
            <p className={cn(
              "text-gray-500",
              isMobile ? "text-xs" : "text-sm"
            )}>
              The more detailed your description, the better your result will be
            </p>
          </div>
          
          {/* Advanced Options Toggle */}
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <div className="flex items-center">
              <CollapsibleTrigger asChild>
                <Button 
                  type="button"
                  variant="ghost" 
                  className="text-sm text-blue-600 hover:text-blue-800 p-0 h-auto"
                >
                  {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                </Button>
              </CollapsibleTrigger>
              <Separator className="flex-1 mx-4" />
            </div>
            
            <CollapsibleContent className="pt-4">
              <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 p-4 rounded-xl">
                <div className="flex items-center mb-4">
                  <ImageLucide className="text-blue-600 h-5 w-5 mr-2" />
                  <h3 className="text-lg font-medium text-gray-800">Image-to-Image Generation</h3>
                </div>
                
                <ImageUploader 
                  onImageSelected={handleImageSelected}
                  disabled={isGenerating}
                />
                
                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-3 text-gray-700">Start with a Template</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {templates.map((template) => (
                      <button 
                        key={template.id}
                        type="button"
                        onClick={() => handleTemplateSelect(template.url)}
                        className={cn(
                          "cursor-pointer rounded-md overflow-hidden border-2 transition-all hover:shadow-md",
                          selectedTemplate === template.url 
                            ? "border-blue-500 shadow-md ring-2 ring-blue-200" 
                            : "border-gray-200 hover:border-blue-300"
                        )}
                      >
                        <div className="aspect-square bg-gray-100 flex items-center justify-center">
                          <img 
                            src={template.url} 
                            alt={template.label} 
                            className="object-cover h-full w-full"
                          />
                        </div>
                        <div className="text-xs p-2 text-center bg-white text-gray-600 font-medium">
                          {template.label}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {(sourceImage || selectedTemplate) && (
                    <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-800">
                      ✓ Source image selected. Your generated image will be based on this reference.
                    </div>
                  )}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Generate Button */}
          <Button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className={cn(
              "w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg transition-all duration-200",
              isMobile ? "py-4 text-base h-12" : "py-6 text-lg h-14",
              (!prompt.trim() || isGenerating) && "opacity-50 cursor-not-allowed"
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
          
          {/* Help Text */}
          {!isGenerating && (
            <div className="text-center">
              <p className={cn(
                "text-gray-500",
                isMobile ? "text-xs" : "text-sm"
              )}>
                Press Enter or click the button to generate your image
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
