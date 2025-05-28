
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Palette, Grid3X3, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface TabNavigationProps {
  activeTab: string;
}

export function TabNavigation({ activeTab }: TabNavigationProps) {
  const isMobile = useIsMobile();

  return (
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
  );
}
