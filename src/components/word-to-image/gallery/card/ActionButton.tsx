
import React from 'react';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  tooltipText: string;
  onClick?: () => void;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
  rounded?: boolean;
  active?: boolean;
}

export function ActionButton({ 
  icon: Icon, 
  label, 
  tooltipText, 
  onClick, 
  variant = 'secondary',
  rounded = false,
  active = false
}: ActionButtonProps) {
  const baseClasses = "transition-all duration-300 hover:scale-105";
  const standardClasses = "bg-white/90 hover:bg-white text-gray-800 shadow-md";
  const roundedClasses = "rounded-full h-8 w-8 p-0";
  const activeClasses = "bg-red-100 text-red-500";
  
  const buttonClasses = `${baseClasses} ${rounded ? roundedClasses : ''} ${active ? activeClasses : standardClasses}`;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            size="sm" 
            variant={variant}
            className={buttonClasses}
            onClick={onClick}
          >
            <Icon className={`h-4 w-4 ${active ? 'fill-red-500' : ''}`} />
            {!rounded && <span className="sr-only md:not-sr-only md:ml-2">{label}</span>}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
