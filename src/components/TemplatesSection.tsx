
import { useState, useMemo } from 'react';
import { ImagePlus, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { TemplateCard } from './templates/TemplateCard';
import { CategoryNavigation } from './templates/CategoryNavigation';
import { TemplatePreviewModal } from './templates/TemplatePreviewModal';
import { useToast } from '@/hooks/use-toast';

export const TemplatesSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { toast } = useToast();

  // Sample template categories with enhanced data
  const categories = [
    { name: 'Social Media', count: 24, color: 'bg-blue-100' },
    { name: 'Art Styles', count: 18, color: 'bg-purple-100' },
    { name: 'Photography', count: 15, color: 'bg-pink-100' },
    { name: 'Landscapes', count: 12, color: 'bg-green-100' }
  ];

  // Enhanced template data with tags and pro indicators
  const allTemplates = [
    { 
      id: 1, 
      title: 'Neon City Lights', 
      description: 'Cyberpunk urban landscape with neon colors and futuristic architecture',
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
      style: 'Cyberpunk',
      category: 'Art Styles',
      tags: ['futuristic', 'neon', 'urban', 'sci-fi'],
      isPro: false,
      prompt: 'A futuristic cyberpunk cityscape at night with vibrant neon lights, towering skyscrapers, and flying vehicles in the sky'
    },
    { 
      id: 2, 
      title: 'Serene Nature', 
      description: 'Peaceful mountain landscape with crystal clear lake reflection',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80',
      style: 'Photography',
      category: 'Landscapes',
      tags: ['nature', 'peaceful', 'mountains', 'water'],
      isPro: false,
      prompt: 'A serene mountain landscape with a perfectly still lake reflecting snow-capped peaks under a clear blue sky'
    },
    { 
      id: 3, 
      title: 'Abstract Patterns', 
      description: 'Vibrant geometric abstract art with flowing shapes and bold colors',
      image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
      style: 'Abstract',
      category: 'Art Styles',
      tags: ['geometric', 'colorful', 'modern', 'artistic'],
      isPro: true,
      prompt: 'Abstract geometric patterns with vibrant colors flowing in organic shapes, modern digital art style'
    },
    { 
      id: 4, 
      title: 'Digital Portrait', 
      description: 'Stylized portrait with digital effects and artistic filters',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&w=1000&q=80',
      style: 'Digital Art',
      category: 'Art Styles',
      tags: ['portrait', 'digital', 'artistic', 'stylized'],
      isPro: true,
      prompt: 'A stylized digital portrait with artistic effects, vibrant colors, and modern digital painting techniques'
    },
    {
      id: 5,
      title: 'Social Media Post',
      description: 'Instagram-ready template with perfect composition and trending aesthetics',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&w=1000&q=80',
      style: 'Social Media',
      category: 'Social Media',
      tags: ['instagram', 'trendy', 'aesthetic', 'square'],
      isPro: false,
      prompt: 'A trendy social media post design with aesthetic composition perfect for Instagram'
    },
    {
      id: 6,
      title: 'Professional Headshot',
      description: 'Clean, professional portrait perfect for LinkedIn and business use',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=1000&q=80',
      style: 'Professional',
      category: 'Photography',
      tags: ['professional', 'business', 'clean', 'portrait'],
      isPro: false,
      prompt: 'A professional business headshot with clean lighting and neutral background'
    }
  ];

  // Extract all unique tags
  const availableTags = useMemo(() => {
    const tags = allTemplates.flatMap(template => template.tags || []);
    return [...new Set(tags)].sort();
  }, []);

  // Filter templates based on category, search, and tags
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter(template => {
      const matchesCategory = !activeCategory || template.category === activeCategory;
      const matchesSearch = !searchQuery || 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.style.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => template.tags?.includes(tag));
      
      return matchesCategory && matchesSearch && matchesTags;
    });
  }, [activeCategory, searchQuery, selectedTags]);

  const handleUseTemplate = (template: any) => {
    if (template.isPro) {
      toast({
        title: "Pro Template",
        description: "This template requires a Pro subscription. Upgrade to unlock all templates!",
        variant: "default",
      });
      return;
    }

    toast({
      title: "Template Applied!",
      description: `Using "${template.title}" template. Redirecting to generator...`,
    });
    
    // Here you would typically navigate to the generator with the template data
    console.log('Using template:', template);
  };

  const handlePreviewTemplate = (template: any) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleNavigateTemplate = (direction: 'prev' | 'next') => {
    if (!previewTemplate) return;
    
    const currentIndex = filteredTemplates.findIndex(t => t.id === previewTemplate.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredTemplates.length - 1;
    } else {
      newIndex = currentIndex < filteredTemplates.length - 1 ? currentIndex + 1 : 0;
    }
    
    setPreviewTemplate(filteredTemplates[newIndex]);
  };

  return (
    <section id="templates" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Start with a Template
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our curated collection of templates or start from scratch. Find the perfect starting point for your creative vision.
          </p>
        </div>
        
        <CategoryNavigation
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          availableTags={availableTags}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
        />
        
        {/* Results Summary */}
        <div className="mt-8 mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
            {activeCategory && ` in ${activeCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
        
        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUse={handleUseTemplate}
              onPreview={handlePreviewTemplate}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No templates found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveCategory(null);
                setSearchQuery('');
                setSelectedTags([]);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link to="/text-to-image">
            <Button 
              variant="outline" 
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              Create Your Own
              <ImagePlus className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        <TemplatePreviewModal
          template={previewTemplate}
          allTemplates={filteredTemplates}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          onUse={handleUseTemplate}
          onNavigate={handleNavigateTemplate}
        />
      </div>
    </section>
  );
};
