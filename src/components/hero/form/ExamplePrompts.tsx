
import React from 'react';
import { Rocket, Castle, Mountain, Contact, Sparkles, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExamplePrompt {
  text: string;
  icon: React.ReactNode;
  detailed?: boolean;
  title?: string;
}

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
}

export const ExamplePrompts = ({
  onSelect
}: ExamplePromptsProps) => {
  const isMobile = useIsMobile();
  
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
      title: "Hyper-Realistic Portrait",
      text: "A confident businesswoman in her 30s, short black hair & tailored navy suit, standing on a Manhattan rooftop at golden hour, low-angle shot, cinematic lighting with realistic skin textures, shallow depth of field (85mm lens), ultra-sharp 8K resolution, photorealistic style.",
      icon: <Sparkles className="h-4 w-4 mr-1.5 text-indigo-500" />,
      detailed: true
    },
    {
      title: "Cinematic Sci-Fi Landscape",
      text: "An abandoned Martian colony under a blood-red sky, towering futuristic spires & rusted domes, wide-angle 16:9 composition, dramatic volumetric lighting, filmic color grading (Teal & Orange), ultra-high detail concept art.",
      icon: <Sparkles className="h-4 w-4 mr-1.5 text-indigo-500" />,
      detailed: true
    },
    {
      title: "Abstract Digital Collage",
      text: "A vibrant abstract collage of geometric shapes and paint splatters in vivid neon hues, layered textures with realistic paper edges, perspective depth, golden ratio composition, high-contrast pop art meets cubism.",
      icon: <Sparkles className="h-4 w-4 mr-1.5 text-indigo-500" />,
      detailed: true
    },
    {
      title: "Epic Fantasy Illustration",
      text: "A lone knight on horseback facing a colossal fire dragon atop a craggy cliff, dynamic composition, backlit sunset with volumetric fog, painterly brushstrokes in the style of Frank Frazetta, high fantasy digital painting.",
      icon: <Sparkles className="h-4 w-4 mr-1.5 text-indigo-500" />,
      detailed: true
    }
  ];

  return (
    <div className="mb-6">
      <div className={cn(
        "flex flex-wrap gap-2 mx-0 my-0",
        isMobile ? "items-start flex-col" : "items-center"
      )}>
        <span className="text-sm text-gray-500 mr-1 mb-1">
          Quick Prompts:
        </span>
        
        <div className={cn(
          "flex flex-wrap gap-2",
          isMobile ? "w-full" : ""
        )}>
          {examples.map((example, index) => (
            <button 
              key={index} 
              onClick={() => onSelect(example.text)} 
              className={cn(
                "flex items-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 text-xs py-1 px-3",
                isMobile ? "text-xs" : "text-xs py-[3px] px-[12px]"
              )}
            >
              {example.icon}
              <span className="truncate">{example.text}</span>
            </button>
          ))}
        </div>
        
        {!isMobile && (
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
        )}
      </div>
      
      <div className="mt-6">
        <div className="flex items-center mb-3">
          <FileText className="h-4 w-4 mr-2 text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">Advanced Prompt Examples:</span>
        </div>
        
        <div className={cn(
          "grid gap-3",
          isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        )}>
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
                <span className="font-medium">{example.title || `Example ${index + 1}`}</span>
              </div>
              <p className="text-xs line-clamp-3">{example.text}</p>
            </button>
          ))}
        </div>
      </div>
      
      {isMobile && (
        <div className="mt-4 flex items-center justify-center">
          <span className="text-xs text-gray-500 mr-2">Issues?</span>
          <button 
            onClick={() => window.open('/contact', '_blank')} 
            className="flex items-center text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            <Contact className="h-3 w-3 mr-1" />
            Contact
          </button>
        </div>
      )}
    </div>
  );
};
