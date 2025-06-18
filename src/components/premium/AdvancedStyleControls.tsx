
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PremiumFeatureGate } from './PremiumFeatureGate';
import { Palette, Sliders, Wand2, Settings } from 'lucide-react';

interface AdvancedStyleControlsProps {
  onStyleChange: (settings: AdvancedStyleSettings) => void;
  currentSettings: AdvancedStyleSettings;
}

export interface AdvancedStyleSettings {
  colorVibrance: number;
  contrast: number;
  saturation: number;
  lighting: 'natural' | 'dramatic' | 'soft' | 'moody';
  composition: 'centered' | 'rule-of-thirds' | 'dynamic' | 'minimalist';
  texture: 'smooth' | 'detailed' | 'painterly' | 'photorealistic';
  mood: 'energetic' | 'calm' | 'mysterious' | 'cheerful' | 'dramatic';
  artMovement: 'none' | 'impressionist' | 'surreal' | 'abstract' | 'pop-art';
}

const defaultSettings: AdvancedStyleSettings = {
  colorVibrance: 50,
  contrast: 50,
  saturation: 50,
  lighting: 'natural',
  composition: 'centered',
  texture: 'detailed',
  mood: 'cheerful',
  artMovement: 'none'
};

export const AdvancedStyleControls = ({ 
  onStyleChange, 
  currentSettings = defaultSettings 
}: AdvancedStyleControlsProps) => {
  const [settings, setSettings] = useState<AdvancedStyleSettings>(currentSettings);

  const updateSetting = <K extends keyof AdvancedStyleSettings>(
    key: K, 
    value: AdvancedStyleSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onStyleChange(newSettings);
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    onStyleChange(defaultSettings);
  };

  return (
    <PremiumFeatureGate
      feature="Advanced Style Controls"
      requiredPlan="pro"
      description="Fine-tune every aspect of your image generation with professional-grade controls"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sliders className="h-5 w-5" />
            Advanced Style Controls
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">Pro</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="color" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="color" className="flex items-center gap-1">
                <Palette className="h-4 w-4" />
                Color
              </TabsTrigger>
              <TabsTrigger value="composition" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="style" className="flex items-center gap-1">
                <Wand2 className="h-4 w-4" />
                Style
              </TabsTrigger>
              <TabsTrigger value="mood" className="flex items-center gap-1">
                <Palette className="h-4 w-4" />
                Mood
              </TabsTrigger>
            </TabsList>

            <TabsContent value="color" className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Color Vibrance</Label>
                  <Slider
                    value={[settings.colorVibrance]}
                    onValueChange={(value) => updateSetting('colorVibrance', value[0])}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                  <div className="text-xs text-gray-500 mt-1">{settings.colorVibrance}%</div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Contrast</Label>
                  <Slider
                    value={[settings.contrast]}
                    onValueChange={(value) => updateSetting('contrast', value[0])}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                  <div className="text-xs text-gray-500 mt-1">{settings.contrast}%</div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Saturation</Label>
                  <Slider
                    value={[settings.saturation]}
                    onValueChange={(value) => updateSetting('saturation', value[0])}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                  <div className="text-xs text-gray-500 mt-1">{settings.saturation}%</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="composition" className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Lighting Style</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['natural', 'dramatic', 'soft', 'moody'].map((option) => (
                    <Button
                      key={option}
                      variant={settings.lighting === option ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateSetting('lighting', option as any)}
                      className="text-xs"
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Composition</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['centered', 'rule-of-thirds', 'dynamic', 'minimalist'].map((option) => (
                    <Button
                      key={option}
                      variant={settings.composition === option ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateSetting('composition', option as any)}
                      className="text-xs"
                    >
                      {option.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="style" className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Texture Style</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['smooth', 'detailed', 'painterly', 'photorealistic'].map((option) => (
                    <Button
                      key={option}
                      variant={settings.texture === option ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateSetting('texture', option as any)}
                      className="text-xs"
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Art Movement</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['none', 'impressionist', 'surreal', 'abstract', 'pop-art'].map((option) => (
                    <Button
                      key={option}
                      variant={settings.artMovement === option ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateSetting('artMovement', option as any)}
                      className="text-xs"
                    >
                      {option === 'none' ? 'Default' : 
                       option.split('-').map(word => 
                         word.charAt(0).toUpperCase() + word.slice(1)
                       ).join(' ')}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mood" className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Mood & Atmosphere</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['energetic', 'calm', 'mysterious', 'cheerful', 'dramatic'].map((option) => (
                    <Button
                      key={option}
                      variant={settings.mood === option ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateSetting('mood', option as any)}
                      className="text-xs"
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between mt-6 pt-4 border-t">
            <Button variant="outline" size="sm" onClick={resetToDefaults}>
              Reset to Defaults
            </Button>
            <Badge variant="outline" className="text-xs">
              Pro Feature
            </Badge>
          </div>
        </CardContent>
      </Card>
    </PremiumFeatureGate>
  );
};
