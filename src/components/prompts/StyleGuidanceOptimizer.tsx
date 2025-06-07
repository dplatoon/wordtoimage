
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Target, 
  Zap, 
  Gauge,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GuidanceSettings {
  scale: number;
  steps: number;
  strength: number;
  scheduler: string;
}

interface StyleGuidanceOptimizerProps {
  currentSettings: Partial<GuidanceSettings>;
  onSettingsChange: (settings: Partial<GuidanceSettings>) => void;
  promptComplexity?: 'simple' | 'moderate' | 'complex';
  detectedStyle?: string;
  className?: string;
}

const STYLE_PRESETS = {
  photorealistic: {
    name: 'Photorealistic',
    icon: '📸',
    settings: { scale: 8.5, steps: 30, strength: 0.8, scheduler: 'DPMSolverMultistep' },
    description: 'High guidance for realistic images'
  },
  artistic: {
    name: 'Artistic',
    icon: '🎨',
    settings: { scale: 6.0, steps: 25, strength: 0.7, scheduler: 'EulerAncestralDiscrete' },
    description: 'Balanced creativity and control'
  },
  anime: {
    name: 'Anime',
    icon: '🌸',
    settings: { scale: 7.0, steps: 28, strength: 0.75, scheduler: 'EulerDiscrete' },
    description: 'Optimized for anime styles'
  },
  abstract: {
    name: 'Abstract',
    icon: '🌀',
    settings: { scale: 5.0, steps: 20, strength: 0.6, scheduler: 'DDIM' },
    description: 'Low guidance for creative freedom'
  },
  cinematic: {
    name: 'Cinematic',
    icon: '🎬',
    settings: { scale: 9.0, steps: 35, strength: 0.85, scheduler: 'DPMSolverMultistep' },
    description: 'High quality for movie-like scenes'
  }
};

const SCHEDULERS = [
  { value: 'DPMSolverMultistep', label: 'DPM++ (Recommended)', quality: 'high' },
  { value: 'EulerAncestralDiscrete', label: 'Euler Ancestral', quality: 'balanced' },
  { value: 'EulerDiscrete', label: 'Euler', quality: 'fast' },
  { value: 'DDIM', label: 'DDIM', quality: 'creative' },
  { value: 'PNDM', label: 'PNDM', quality: 'stable' }
];

export function StyleGuidanceOptimizer({
  currentSettings,
  onSettingsChange,
  promptComplexity = 'moderate',
  detectedStyle = 'general',
  className
}: StyleGuidanceOptimizerProps) {
  const [localSettings, setLocalSettings] = useState<GuidanceSettings>({
    scale: 7.5,
    steps: 25,
    strength: 0.8,
    scheduler: 'DPMSolverMultistep',
    ...currentSettings
  });

  const [autoMode, setAutoMode] = useState(true);

  // Auto-adjust settings based on prompt analysis
  useEffect(() => {
    if (!autoMode) return;

    const autoSettings = calculateOptimalSettings(promptComplexity, detectedStyle);
    setLocalSettings(prev => ({ ...prev, ...autoSettings }));
    onSettingsChange(autoSettings);
  }, [promptComplexity, detectedStyle, autoMode, onSettingsChange]);

  function calculateOptimalSettings(
    complexity: string, 
    style: string
  ): Partial<GuidanceSettings> {
    let baseScale = 7.5;
    let baseSteps = 25;
    let baseStrength = 0.8;

    // Adjust for complexity
    switch (complexity) {
      case 'simple':
        baseScale -= 1.0;
        baseSteps -= 5;
        break;
      case 'complex':
        baseScale += 1.5;
        baseSteps += 10;
        baseStrength += 0.1;
        break;
    }

    // Adjust for style
    if (style.includes('photo') || style.includes('realistic')) {
      baseScale += 1.0;
      baseSteps += 5;
    } else if (style.includes('abstract') || style.includes('artistic')) {
      baseScale -= 1.0;
      baseSteps -= 3;
      baseStrength -= 0.1;
    }

    return {
      scale: Math.max(3, Math.min(12, baseScale)),
      steps: Math.max(15, Math.min(50, baseSteps)),
      strength: Math.max(0.5, Math.min(1.0, baseStrength))
    };
  }

  const handleSettingChange = (key: keyof GuidanceSettings, value: number | string) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange({ [key]: value });
    setAutoMode(false); // Disable auto mode when manual changes are made
  };

  const applyPreset = (presetKey: string) => {
    const preset = STYLE_PRESETS[presetKey as keyof typeof STYLE_PRESETS];
    if (preset) {
      setLocalSettings(prev => ({ ...prev, ...preset.settings }));
      onSettingsChange(preset.settings);
      setAutoMode(false);
    }
  };

  const resetToAuto = () => {
    setAutoMode(true);
    const autoSettings = calculateOptimalSettings(promptComplexity, detectedStyle);
    setLocalSettings(prev => ({ ...prev, ...autoSettings }));
    onSettingsChange(autoSettings);
  };

  const getScaleDescription = (scale: number) => {
    if (scale <= 4) return 'Very Creative - Low adherence to prompt';
    if (scale <= 6) return 'Creative - Balanced freedom and control';
    if (scale <= 8) return 'Balanced - Good prompt following';
    if (scale <= 10) return 'Precise - High prompt adherence';
    return 'Very Precise - Maximum prompt control';
  };

  const getStepsDescription = (steps: number) => {
    if (steps <= 20) return 'Fast - Quick generation, may lack detail';
    if (steps <= 30) return 'Balanced - Good quality and speed';
    if (steps <= 40) return 'High Quality - Better detail, slower';
    return 'Maximum Quality - Best detail, slowest';
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-violet-600" />
            Guidance & Quality Controls
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Badge variant={autoMode ? "default" : "outline"} className="text-xs">
              {autoMode ? 'Auto' : 'Manual'}
            </Badge>
            {!autoMode && (
              <Button size="sm" variant="outline" onClick={resetToAuto}>
                <RotateCcw className="h-3 w-3 mr-1" />
                Auto
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs defaultValue="controls" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="controls">Controls</TabsTrigger>
            <TabsTrigger value="presets">Presets</TabsTrigger>
          </TabsList>

          <TabsContent value="controls" className="space-y-6">
            {/* Guidance Scale */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Guidance Scale
                </label>
                <Badge variant="outline" className="text-xs">
                  {localSettings.scale.toFixed(1)}
                </Badge>
              </div>
              
              <Slider
                value={[localSettings.scale]}
                onValueChange={([value]) => handleSettingChange('scale', value)}
                min={3}
                max={12}
                step={0.5}
                className="w-full"
              />
              
              <p className="text-xs text-gray-600">
                {getScaleDescription(localSettings.scale)}
              </p>
            </div>

            {/* Inference Steps */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Inference Steps
                </label>
                <Badge variant="outline" className="text-xs">
                  {localSettings.steps}
                </Badge>
              </div>
              
              <Slider
                value={[localSettings.steps]}
                onValueChange={([value]) => handleSettingChange('steps', value)}
                min={15}
                max={50}
                step={5}
                className="w-full"
              />
              
              <p className="text-xs text-gray-600">
                {getStepsDescription(localSettings.steps)}
              </p>
            </div>

            {/* Strength */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Strength
                </label>
                <Badge variant="outline" className="text-xs">
                  {(localSettings.strength * 100).toFixed(0)}%
                </Badge>
              </div>
              
              <Slider
                value={[localSettings.strength * 100]}
                onValueChange={([value]) => handleSettingChange('strength', value / 100)}
                min={50}
                max={100}
                step={5}
                className="w-full"
              />
              
              <p className="text-xs text-gray-600">
                Controls how much the model modifies the input
              </p>
            </div>

            {/* Scheduler */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Scheduler Algorithm
              </label>
              
              <div className="grid grid-cols-1 gap-2">
                {SCHEDULERS.map((scheduler) => (
                  <button
                    key={scheduler.value}
                    onClick={() => handleSettingChange('scheduler', scheduler.value)}
                    className={cn(
                      "p-3 text-left border rounded-lg transition-colors",
                      localSettings.scheduler === scheduler.value
                        ? "border-violet-500 bg-violet-50"
                        : "border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{scheduler.label}</div>
                      <Badge 
                        variant={scheduler.quality === 'high' ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {scheduler.quality}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="presets" className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(STYLE_PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{preset.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{preset.name}</div>
                      <div className="text-sm text-gray-600">{preset.description}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Scale: {preset.settings.scale} • Steps: {preset.settings.steps} • Strength: {(preset.settings.strength * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Current Status */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-600">Quality</div>
              <div className="font-semibold">
                {localSettings.steps > 30 ? 'High' : localSettings.steps > 20 ? 'Medium' : 'Fast'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Creativity</div>
              <div className="font-semibold">
                {localSettings.scale < 6 ? 'High' : localSettings.scale > 8 ? 'Low' : 'Balanced'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Speed</div>
              <div className="font-semibold">
                {localSettings.steps < 25 ? 'Fast' : localSettings.steps > 35 ? 'Slow' : 'Medium'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Mode</div>
              <div className="font-semibold">
                {autoMode ? 'Auto' : 'Manual'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
