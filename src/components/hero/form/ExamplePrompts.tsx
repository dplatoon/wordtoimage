
import React from 'react';
import { Astronaut, Castle, Volcano, Contact } from 'lucide-react';

interface ExamplePrompt {
  text: string;
  icon: React.ReactNode;
}

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
}

export const ExamplePrompts = ({ onSelect }: ExamplePromptsProps) => {
  const examples: ExamplePrompt[] = [
    {
      text: 'Astronaut in Space',
      icon: <Astronaut className="h-4 w-4 mr-1.5" />
    },
    {
      text: 'Medieval Castle',
      icon: <Castle className="h-4 w-4 mr-1.5" />
    },
    {
      text: 'Volcanic Eruption',
      icon: <Volcano className="h-4 w-4 mr-1.5" />
    }
  ];

  return (
    <div className="mb-6 flex items-center flex-wrap gap-2">
      <span className="text-sm text-gray-500 mr-1">Try these:</span>
      
      {examples.map((example, index) => (
        <button
          key={index}
          onClick={() => onSelect(example.text)}
          className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
        >
          {example.icon}
          {example.text}
        </button>
      ))}
      
      <div className="ml-auto flex items-center">
        <span className="text-sm text-gray-500 mr-2">Encountering Issues?</span>
        <button 
          className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          onClick={() => window.open('/contact', '_blank')}
        >
          <Contact className="h-4 w-4 mr-1.5" />
          Contact Us
        </button>
      </div>
    </div>
  );
};
