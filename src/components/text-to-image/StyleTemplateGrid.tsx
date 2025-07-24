import { useState } from "react";
import { StyleTemplateCard } from "./StyleTemplateCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StyleTemplate {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prompt: string;
  category: string;
  isPro?: boolean;
}

interface StyleTemplateGridProps {
  onTemplateSelect: (template: StyleTemplate) => void;
  selectedTemplate?: StyleTemplate;
}

const styleTemplates: StyleTemplate[] = [
  {
    id: "photorealistic",
    title: "Photorealistic",
    description: "Ultra-realistic photography style",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    prompt: "photorealistic, ultra detailed, 8k resolution, professional photography",
    category: "photography"
  },
  {
    id: "anime",
    title: "Anime Style",
    description: "Japanese anime and manga inspired art",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    prompt: "anime style, detailed anime art, vibrant colors, manga inspired",
    category: "art"
  },
  {
    id: "oil-painting",
    title: "Oil Painting",
    description: "Classic oil painting technique",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    prompt: "oil painting, classical art style, brush strokes, artistic masterpiece",
    category: "art"
  },
  {
    id: "cyberpunk",
    title: "Cyberpunk",
    description: "Futuristic neon-lit aesthetic",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    prompt: "cyberpunk style, neon lights, futuristic, sci-fi aesthetic, dark atmosphere",
    category: "sci-fi",
    isPro: true
  },
  {
    id: "watercolor",
    title: "Watercolor",
    description: "Soft watercolor painting style",
    imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
    prompt: "watercolor painting, soft colors, artistic brushwork, dreamy atmosphere",
    category: "art"
  },
  {
    id: "portrait",
    title: "Portrait",
    description: "Professional portrait photography",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    prompt: "professional portrait, studio lighting, high quality, detailed facial features",
    category: "photography"
  },
  {
    id: "landscape",
    title: "Landscape",
    description: "Beautiful natural landscapes",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    prompt: "stunning landscape, natural beauty, dramatic lighting, scenic view",
    category: "photography"
  },
  {
    id: "fantasy",
    title: "Fantasy Art",
    description: "Magical and fantastical scenes",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    prompt: "fantasy art, magical atmosphere, mythical creatures, enchanted world",
    category: "art",
    isPro: true
  }
];

const categories = [
  { id: "all", label: "All Styles" },
  { id: "photography", label: "Photography" },
  { id: "art", label: "Art" },
  { id: "sci-fi", label: "Sci-Fi" }
];

export const StyleTemplateGrid = ({ onTemplateSelect, selectedTemplate }: StyleTemplateGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTemplates = selectedCategory === "all" 
    ? styleTemplates 
    : styleTemplates.filter(template => template.category === selectedCategory);

  return (
    <div className="space-y-4">
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-4">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={selectedCategory} className="mt-4">
          <ScrollArea className="h-[400px]">
            <div className="grid grid-cols-2 gap-3 pr-4">
              {filteredTemplates.map((template) => (
                <StyleTemplateCard
                  key={template.id}
                  title={template.title}
                  description={template.description}
                  imageUrl={template.imageUrl}
                  prompt={template.prompt}
                  isSelected={selectedTemplate?.id === template.id}
                  onClick={() => onTemplateSelect(template)}
                  isPro={template.isPro}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};