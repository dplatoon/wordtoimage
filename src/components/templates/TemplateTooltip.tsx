
import { HelpCircle } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface TemplateTooltipProps {
  title: string;
  description: string;
  usage: string;
}

export const TemplateTooltip = ({ title, description, usage }: TemplateTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2 h-6 w-6 p-0 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <HelpCircle className="h-3 w-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-3" side="left">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">{title}</h4>
            <p className="text-xs text-gray-600">{description}</p>
            <p className="text-xs text-brand-purple font-medium">
              Best for: {usage}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
