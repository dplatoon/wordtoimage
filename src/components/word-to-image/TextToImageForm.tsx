
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, Castle, Mountain, Contact, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PromptInput } from './PromptInput';

interface TextToImageFormProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export function TextToImageForm({ onGenerate, isGenerating }: TextToImageFormProps) {
  const [prompt, setPrompt] = useState('');
  
  const examplePrompts = [
    { text: 'Astronaut in Space', icon: <Rocket className="h-4 w-4 mr-2" /> },
    { text: 'Medieval Castle', icon: <Castle className="h-4 w-4 mr-2" /> },
    { text: 'Volcanic Eruption', icon: <Mountain className="h-4 w-4 mr-2" /> }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const handleExampleClick = (text: string) => {
    setPrompt(text);
  };

  return (
    <Card className="mb-6 shadow-sm border-gray-200">
      <CardContent className="pt-6">
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
            
            <p className="text-sm text-gray-500">
              Be specific with details like style, lighting, and perspective
            </p>
          </div>
          
          <div className="space-y-3">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                type="button"
                className="w-full flex items-center justify-center py-3 px-4 bg-gray-50 hover:bg-gray-100 
                  rounded-full text-gray-700 font-medium transition-colors"
                onClick={() => handleExampleClick(example.text)}
              >
                {example.icon}
                {example.text}
              </button>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-500 flex items-center">
              <span>Issues?</span>
              <Button variant="ghost" size="sm" className="text-blue-600 font-medium pl-2">
                <Contact className="h-4 w-4 mr-1.5" />
                Contact
              </Button>
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium text-lg"
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
