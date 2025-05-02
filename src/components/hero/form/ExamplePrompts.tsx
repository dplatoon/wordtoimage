
import React from 'react';
import { Rocket, Castle, Mountain, Contact } from 'lucide-react';

interface ExamplePrompt {
  text: string;
  icon: React.ReactNode;
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

  return (
    <div className="mb-6 flex items-center flex-wrap gap-2 mx-0 my-0">
      <span className="text-sm text-gray-500 mr-1">
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
  );
};
