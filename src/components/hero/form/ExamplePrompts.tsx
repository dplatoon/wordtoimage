
import React from 'react';
import { Rocket, Castle, Mountain, Contact, Sparkles, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExamplePrompt {
  text: string;
  icon: React.ReactNode;
  detailed?: boolean;
}

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
}

export const ExamplePrompts = ({
  onSelect
}: ExamplePromptsProps) => {
  const examples: ExamplePrompt[] = [
    {
      text: 'Astronaut in Space',
      icon: <Rocket className="h-4 w-4 mr-1.5" />
    }, 
    {
      text: 'Medieval Castle',
      icon: <Castle className="h-4 w-4 mr-1.5" />
    },
    {
      text: 'Volcanic Eruption',
      icon: <Mountain className="h-4 w-4 mr-1.5" />
    }
  ];
  
  const advancedExamples: ExamplePrompt[] = [
    {
      text: 'A confident businesswoman in her 30s, short black hair & tailored navy suit, standing on a Manhattan rooftop at golden hour, low-angle shot, cinematic lighting with realistic skin textures',
      icon: <Sparkles className="h-4 w-4 mr-1.5 text-indigo-500" />,
      detailed: true
    },
    {
      text: 'An abandoned Martian colony under a blood-red sky, towering futuristic spires & rusted domes, wide-angle composition, dramatic volumetric lighting, filmic color grading',
      icon: <Sparkles className="h-4 w-4 mr-1.5 text-indigo-500" />,
      detailed: true
    },
    {
      text: 'A vibrant abstract collage of geometric shapes and paint splatters in vivid neon hues, layered textures with realistic paper edges, perspective depth, golden ratio composition',
      icon: <Sparkles className="h-4 w-4 mr-1.5 text-indigo-500" />,
      detailed: true
    },
    {
      text: 'A lone knight on horseback facing a colossal fire dragon atop a craggy cliff, dynamic composition, backlit sunset with volumetric fog, painterly brushstrokes',
      icon: <Sparkles className="h-4 w-4 mr-1.5 text-indigo-500" />,
      detailed: true
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center flex-wrap gap-2 mx-0 my-0">
        <span className="text-sm text-gray-500 mr-1">
          Quick Prompts:
        </span>
        
        {examples.map((example, index) => (
          <button 
            key={index} 
            onClick={() => onSelect(example.text)} 
            className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 mx-0 my-[8px] text-xs py-[3px] text-justify px-[60px]"
          >
            {example.icon}
            {example.text}
          </button>
        ))}
        
        <div className="ml-auto flex items-center">
          <span className="text-sm text-gray-500 mr-2">Issues?</span>
          <button 
            onClick={() => window.open('/contact', '_blank')} 
            className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium py-0 my-[9px] mx-[7px]"
          >
            <Contact className="h-4 w-4 mr-1.5" />
            Contact
          </button>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex items-center mb-3">
          <FileText className="h-4 w-4 mr-2 text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">Advanced Prompt Examples:</span>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {advancedExamples.map((example, index) => (
            <button 
              key={index} 
              onClick={() => onSelect(example.text)} 
              className={cn(
                "text-left bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100",
                "border border-indigo-100 rounded-lg p-3 transition-all text-sm text-gray-700 shadow-sm"
              )}
            >
              <div className="flex items-center mb-1">
                {example.icon}
                <span className="font-medium">Example {index + 1}</span>
              </div>
              <p className="text-xs line-clamp-2">{example.text}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
