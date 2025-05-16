
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, Castle, Mountain, Contact, Sparkles, ImageIcon, Image as ImageLucide } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PromptInput } from './PromptInput';
import { ExamplePrompts } from '@/components/hero/form/ExamplePrompts';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ImageUploader } from '@/components/hero/form/controls/ImageUploader';
import { Separator } from '@/components/ui/separator';

interface TextToImageFormProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export function TextToImageForm({ onGenerate, isGenerating }: TextToImageFormProps) {
  const [prompt, setPrompt] = useState('');
  const [sourceImage, setSourceImage] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const handleExampleClick = (text: string) => {
    setPrompt(text);
    
    // Scroll to input for better mobile UX
    if (isMobile) {
      setTimeout(() => {
        const textareaElement = document.querySelector('textarea');
        if (textareaElement) {
          textareaElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleImageSelected = (imageData: string) => {
    setSourceImage(imageData);
    setSelectedTemplate('');
    // Here you would normally pass this to the onGenerate function
    // For now we're just storing it in state
  };
  
  const handleTemplateSelect = (templateUrl: string) => {
    setSelectedTemplate(templateUrl);
    setSourceImage(templateUrl);
    // Clear any uploaded image when selecting a template
  };
  
  // Template options
  const templates = [
    {
      id: 'template1',
      url: '/placeholder.svg',
      label: 'Minimal',
    },
    {
      id: 'template2',
      url: '/placeholder.svg',
      label: 'Portrait',
    },
    {
      id: 'template3',
      url: '/placeholder.svg', 
      label: 'Landscape',
    }
  ];

  return (
    <Card className="mb-6 shadow-sm border-gray-200">
      <CardContent className={cn("pt-6", isMobile ? "px-3" : "")}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-blue-600 mr-2">✏️</span>
              <h2 className="text-xl font-medium text-gray-800">Description</h2>
            </div>
            
            <PromptInput 
              prompt={prompt}
              onPromptChange={setPrompt}
            />
            
            <p className={cn(
              "text-gray-500",
              isMobile ? "text-xs" : "text-sm"
            )}>
              Be specific with details like style, lighting, and perspective
            </p>
          </div>
          
          <ExamplePrompts onSelect={handleExampleClick} />
          
          <div className="pt-2">
            <div className="flex items-center mb-4">
              <ImageLucide className="text-blue-600 h-5 w-5 mr-2" />
              <h2 className="text-xl font-medium text-gray-800">Image-to-Image Generation</h2>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 p-4 rounded-xl">
              <ImageUploader 
                onImageSelected={handleImageSelected}
                disabled={isGenerating}
              />
              
              <div className="mt-6">
                <h3 className="text-sm font-bold mb-3 text-gray-700">Start with a Template</h3>
                <div className="grid grid-cols-3 gap-3">
                  {templates.map((template) => (
                    <div 
                      key={template.id}
                      onClick={() => handleTemplateSelect(template.url)}
                      className={cn(
                        "cursor-pointer rounded-md overflow-hidden border-2 transition-all",
                        selectedTemplate === template.url 
                          ? "border-blue-500 shadow-md" 
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
                      <div className="text-xs p-1 text-center bg-white text-gray-600">{template.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className={cn(
              "w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium",
              isMobile ? "py-4 text-base" : "py-6 text-lg"
            )}
          >
            {isGenerating ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2 h-5 w-5 border-b-2 border-white rounded-full" />
                Generating...
              </span>
            ) : (
              <span className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Creating
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
