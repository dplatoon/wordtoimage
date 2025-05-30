
import { useState } from "react";
import { ResourcePageTemplate } from "@/components/templates/ResourcePageTemplate";
import { ContentCard } from "@/components/content/ContentCard";
import { ContentSearch } from "@/components/content/ContentSearch";
import { Lightbulb, Palette, Layout, Type } from "lucide-react";

const DesignTips = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const tips = [
    {
      id: "contrasting-colors-text",
      title: "Use Contrasting Colors for Text",
      description: "Ensure your text is readable by using high contrast between text and background colors. Learn about color theory and accessibility standards.",
      category: "Color Theory",
      image: "/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png",
      tags: ["Color", "Contrast", "Accessibility", "Text"],
      icon: Palette,
      featured: true
    },
    {
      id: "consistent-spacing",
      title: "Maintain Consistent Spacing",
      description: "Keep spacing consistent throughout your design for a clean, professional look. Master the principles of white space and visual rhythm.",
      category: "Layout",
      image: "/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png",
      tags: ["Spacing", "Layout", "Professional", "Clean"],
      icon: Layout
    },
    {
      id: "font-selection",
      title: "Limit Your Font Selection",
      description: "Use no more than 2-3 font families in a single design to maintain visual harmony and professional appearance.",
      category: "Typography",
      image: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png",
      tags: ["Fonts", "Typography", "Harmony", "Professional"],
      icon: Type
    },
    {
      id: "visual-hierarchy",
      title: "Focus on Visual Hierarchy",
      description: "Guide the viewer's eye through your design with clear visual hierarchy using size, color, and positioning strategically.",
      category: "Layout",
      image: "/lovable-uploads/8398d1f3-db95-4f78-b05e-1fbba4750e81.png",
      tags: ["Hierarchy", "Visual", "Layout", "Guide"],
      icon: Layout
    },
    {
      id: "mobile-considerations",
      title: "Consider Mobile Users",
      description: "Ensure your designs look good and function well on mobile devices. Learn responsive design principles and mobile-first approaches.",
      category: "Responsive",
      image: "/lovable-uploads/b8bd59bc-46c8-4f5f-9ad8-8eacbf6c7c20.png",
      tags: ["Mobile", "Responsive", "UX", "Accessibility"],
      icon: Layout
    },
    {
      id: "effective-whitespace",
      title: "Use Whitespace Effectively",
      description: "Don't fear empty space — it helps content breathe and improves readability. Master the art of negative space in design.",
      category: "Layout",
      image: "/lovable-uploads/806c4eee-2b54-4f82-8d75-7bd3e7137f5c.png",
      tags: ["Whitespace", "Negative Space", "Readability", "Breathing Room"],
      icon: Layout
    },
    {
      id: "color-psychology",
      title: "Understanding Color Psychology",
      description: "Learn how different colors evoke emotions and influence user behavior to create more effective designs.",
      category: "Color Theory",
      image: "/lovable-uploads/5cc3bb2f-158e-4a9d-8ff5-0efe1c96ab93.png",
      tags: ["Psychology", "Emotions", "Color", "Behavior"],
      icon: Palette
    },
    {
      id: "composition-rules",
      title: "Master Composition Rules",
      description: "Apply the rule of thirds, golden ratio, and other composition techniques to create visually appealing AI-generated images.",
      category: "Composition",
      image: "/lovable-uploads/7f38eaf1-216c-4148-b05c-9a2f87de6ffc.png",
      tags: ["Composition", "Rule of Thirds", "Golden Ratio", "Visual Appeal"],
      icon: Layout
    }
  ];

  const categories = ["Color Theory", "Layout", "Typography", "Responsive", "Composition"];

  const filteredTips = tips.filter(tip => {
    const matchesSearch = !searchQuery || 
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilters.length === 0 || 
      selectedFilters.includes(tip.category);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <ResourcePageTemplate
      title="Professional Design Tips"
      description="Improve your AI-generated images with professional design principles. Learn color theory, composition, typography, and visual hierarchy for stunning AI art."
      seoTitle="Professional Design Tips for AI Art - Visual Design Guide"
      seoDescription="Improve your AI-generated images with professional design principles. Learn color theory, composition, typography, and visual hierarchy for stunning AI art."
      keywords="AI art design tips, visual design principles, AI image composition, design guidelines for AI art, professional AI graphics"
      aiKeywords={[
        'AI art design principles',
        'visual design for AI images',
        'AI art composition tips',
        'professional AI graphics',
        'design theory for AI art'
      ]}
      voiceSearchQueries={[
        'how to make AI art look professional',
        'what are good design principles for AI images',
        'how to improve AI art composition',
        'design tips for AI generated images'
      ]}
      currentPath="/design-tips"
      badge="Pro Tips"
    >
      <ContentSearch
        onSearch={setSearchQuery}
        onFilter={setSelectedFilters}
        categories={categories}
        selectedFilters={selectedFilters}
        placeholder="Search design tips and principles..."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTips.map((tip, index) => (
          <div key={tip.id} className="relative">
            <ContentCard
              id={tip.id}
              title={tip.title}
              description={tip.description}
              image={tip.image}
              category={tip.category}
              tags={tip.tags}
              featured={tip.featured && index === 0}
              contentType="design-tip"
            />
            {/* Icon overlay */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <Lightbulb className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        ))}
      </div>
      
      {filteredTips.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Lightbulb className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No design tips found</h3>
          <p className="text-gray-500">Try adjusting your search or filters to find the tips you need.</p>
        </div>
      )}
    </ResourcePageTemplate>
  );
};

export default DesignTips;
