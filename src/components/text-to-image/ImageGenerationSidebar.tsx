import React from 'react';
import { Settings, Palette, Image, Sliders, Info, ChevronDown, RotateCcw } from 'lucide-react';
import { StyleTemplateGrid } from './StyleTemplateGrid';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface StyleTemplate {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prompt: string;
  category: string;
  isPro?: boolean;
}

interface ImageGenerationSidebarProps {
  style: string;
  onStyleChange: (style: string) => void;
  count: number;
  onCountChange: (count: number) => void;
  resolution: string;
  onResolutionChange: (resolution: string) => void;
  prompt: string;
  onPromptChange: (prompt: string) => void;
}

const STYLE_OPTIONS = [
  { value: 'auto', label: 'Auto', description: 'AI chooses best style' },
  { value: 'photorealistic', label: 'Photorealistic', description: 'Ultra realistic photos' },
  { value: 'digital-art', label: 'Digital Art', description: 'Modern digital illustration' },
  { value: 'oil-painting', label: 'Oil Painting', description: 'Classical artistic style' },
  { value: 'watercolor', label: 'Watercolor', description: 'Soft flowing colors' },
  { value: 'cyberpunk', label: 'Cyberpunk', description: 'Futuristic neon style' },
  { value: 'anime', label: 'Anime', description: 'Japanese animation style' },
  { value: 'cinematic', label: 'Cinematic', description: 'Movie-like scenes' },
  { value: 'fantasy-art', label: 'Fantasy Art', description: 'Magical and mystical' },
];

const RESOLUTION_OPTIONS = [
  { value: '512x512', label: 'Square (512x512)', aspect: '1:1' },
  { value: '768x512', label: 'Landscape (768x512)', aspect: '3:2' },
  { value: '512x768', label: 'Portrait (512x768)', aspect: '2:3' },
  { value: '1024x512', label: 'Wide (1024x512)', aspect: '2:1' },
  { value: '1024x1024', label: 'Large Square (1024x1024)', aspect: '1:1' },
];

export function ImageGenerationSidebar({
  style,
  onStyleChange,
  count,
  onCountChange,
  resolution,
  onResolutionChange,
  prompt,
  onPromptChange,
}: ImageGenerationSidebarProps) {
  const [advancedOpen, setAdvancedOpen] = React.useState(false);
  const [qualityMode, setQualityMode] = React.useState('standard');
  const [promptMagic, setPromptMagic] = React.useState(true);
  const [selectedTemplate, setSelectedTemplate] = React.useState<StyleTemplate | undefined>();

  const handleTemplateSelect = (template: StyleTemplate) => {
    setSelectedTemplate(template);
    // Enhance the current prompt with the template's style
    const enhancedPrompt = prompt ? `${prompt}, ${template.prompt}` : template.prompt;
    onPromptChange(enhancedPrompt);
  };

  return (
    <Sidebar className="border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Palette className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Image Generator</h2>
            <p className="text-xs text-muted-foreground">v1.0</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        {/* Generation Mode */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
            Generation Mode
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="quality-mode" className="text-sm">Quality</Label>
                <Badge variant={qualityMode === 'standard' ? 'default' : 'secondary'} className="text-xs">
                  {qualityMode === 'standard' ? 'Standard' : 'Quality'}
                </Badge>
              </div>
              <div className="flex gap-1">
                <Button
                  variant={qualityMode === 'standard' ? 'default' : 'ghost'}
                  size="sm"
                  className="flex-1 h-8"
                  onClick={() => setQualityMode('standard')}
                >
                  Standard
                </Button>
                <Button
                  variant={qualityMode === 'quality' ? 'default' : 'ghost'}
                  size="sm"
                  className="flex-1 h-8"
                  onClick={() => setQualityMode('quality')}
                >
                  Quality
                </Button>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Style Templates */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
            Style Templates
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <StyleTemplateGrid 
              onTemplateSelect={handleTemplateSelect}
              selectedTemplate={selectedTemplate}
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Style Selection */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
            Style
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Select value={style} onValueChange={onStyleChange}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Choose style..." />
              </SelectTrigger>
              <SelectContent>
                {STYLE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-xs text-muted-foreground">{option.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Image Settings */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <Image className="h-3 w-3" />
            Image Settings
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-4">
            {/* Resolution */}
            <div className="space-y-2">
              <Label className="text-sm">Resolution</Label>
              <Select value={resolution} onValueChange={onResolutionChange}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RESOLUTION_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{option.label}</span>
                        <Badge variant="outline" className="text-xs ml-2">
                          {option.aspect}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Image Quantity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Quantity</Label>
                <span className="text-sm font-medium">{count}</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {[1, 2, 3, 4].map((num) => (
                  <Button
                    key={num}
                    variant={count === num ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8"
                    onClick={() => onCountChange(num)}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Prompt Magic */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
            Prompt Magic
            <Badge className="ml-2 text-xs">
              {promptMagic ? 'On' : 'Off'}
            </Badge>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm">Auto-enhance prompts</Label>
                <p className="text-xs text-muted-foreground">
                  AI improves your prompts automatically
                </p>
              </div>
              <Switch
                checked={promptMagic}
                onCheckedChange={setPromptMagic}
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Advanced Config */}
        <SidebarGroup>
          <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer hover:bg-accent/50 rounded px-2 py-1 -mx-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Sliders className="h-3 w-3" />
                  Advanced Config
                </div>
                <ChevronDown className={`h-3 w-3 transition-transform ${advancedOpen ? 'rotate-180' : ''}`} />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4">
              <SidebarGroupContent className="space-y-4 pt-2">
                {/* Guidance Scale */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Guidance Scale</Label>
                    <span className="text-sm text-muted-foreground">7.5</span>
                  </div>
                  <Slider
                    defaultValue={[7.5]}
                    max={20}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    How closely to follow the prompt
                  </p>
                </div>

                {/* Steps */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Steps</Label>
                    <span className="text-sm text-muted-foreground">20</span>
                  </div>
                  <Slider
                    defaultValue={[20]}
                    max={50}
                    min={10}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    More steps = higher quality
                  </p>
                </div>

                {/* Seed */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Seed</Label>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    Random
                  </div>
                  <p className="text-xs text-muted-foreground">
                    For reproducible results
                  </p>
                </div>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Additional Features */}
        <SidebarGroup className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="flex items-center gap-2 text-sm">
                <Info className="h-4 w-4" />
                <span>Help & Tips</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}