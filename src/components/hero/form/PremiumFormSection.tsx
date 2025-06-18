
import React, { useState } from 'react';
import { AdvancedStyleControls, AdvancedStyleSettings } from '@/components/premium/AdvancedStyleControls';
import { BatchGeneration } from '@/components/premium/BatchGeneration';
import { AIPersonalization } from '@/components/premium/AIPersonalization';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSubscription } from '@/hooks/useSubscription';
import { Wand2, Layers, Brain } from 'lucide-react';

interface PremiumFormSectionProps {
  onStyleSettingsChange: (settings: AdvancedStyleSettings) => void;
  onBatchGenerate: (prompts: string[]) => Promise<string[]>;
}

export const PremiumFormSection = ({ 
  onStyleSettingsChange, 
  onBatchGenerate 
}: PremiumFormSectionProps) => {
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedStyleSettings>();
  const { isPremium } = useSubscription();

  const handleStyleChange = (settings: AdvancedStyleSettings) => {
    setAdvancedSettings(settings);
    onStyleSettingsChange(settings);
  };

  if (!isPremium) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="advanced" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            Advanced
          </TabsTrigger>
          <TabsTrigger value="batch" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Batch
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="advanced" className="mt-4">
          <AdvancedStyleControls
            onStyleChange={handleStyleChange}
            currentSettings={advancedSettings || {
              colorVibrance: 50,
              contrast: 50,
              saturation: 50,
              lighting: 'natural',
              composition: 'centered',
              texture: 'detailed',
              mood: 'cheerful',
              artMovement: 'none'
            }}
          />
        </TabsContent>

        <TabsContent value="batch" className="mt-4">
          <BatchGeneration onGenerate={onBatchGenerate} />
        </TabsContent>

        <TabsContent value="ai" className="mt-4">
          <AIPersonalization />
        </TabsContent>
      </Tabs>
    </div>
  );
};
