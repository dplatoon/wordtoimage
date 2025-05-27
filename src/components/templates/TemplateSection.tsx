import { useState, useMemo } from 'react';
import { ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TemplateCard } from './TemplateCard';
import { CategoryNavigation } from './CategoryNavigation';
import { TemplatePreviewModal } from './TemplatePreviewModal';
import { TemplateGalleryHero } from './TemplateGalleryHero';
import { useToast } from '@/hooks/use-toast';

export const TemplateSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { toast } = useToast();

  // Enhanced template categories with better organization
  const categories = [
    { name: 'Social Media', count: 24, color: 'bg-blue-100', description: 'Perfect for Instagram, TikTok, and social posts' },
    { name: 'Art Styles', count: 18, color: 'bg-purple-100', description: 'Professional artistic techniques and filters' },
    { name: 'Photography', count: 15, color: 'bg-pink-100', description: 'Photo-realistic styles and effects' },
    { name: 'Landscapes', count: 12, color: 'bg-green-100', description: 'Nature scenes and environmental art' }
  ];

  // Enhanced template data with better descriptions and accessibility
  const allTemplates = [
    { 
      id: 1, 
      title: 'Neon Cyberpunk City', 
      description: 'Futuristic urban landscape with vibrant neon lighting, perfect for sci-fi and gaming content',
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
      style: 'Cyberpunk',
      category: 'Art Styles',
      tags: ['futuristic', 'neon', 'urban', 'sci-fi'],
      isPro: false,
      isNew: true,
      isPopular: false,
      usage: 'Gaming art, sci-fi illustrations, digital wallpapers, tech presentations',
      difficulty: 'Medium' as const,
      prompt: 'A futuristic cyberpunk cityscape at night with vibrant neon lights, towering skyscrapers, and flying vehicles in the sky, digital art style with high contrast and glowing effects'
    },
    { 
      id: 2, 
      title: 'Serene Mountain Lake', 
      description: 'Peaceful mountain landscape with crystal clear reflections, ideal for meditation and wellness content',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80',
      style: 'Natural Photography',
      category: 'Landscapes',
      tags: ['nature', 'peaceful', 'mountains', 'water'],
      isPro: false,
      isNew: false,
      isPopular: true,
      usage: 'Meditation apps, nature photography, relaxation content, wellness blogs',
      difficulty: 'Easy' as const,
      prompt: 'A serene mountain landscape with a perfectly still lake reflecting snow-capped peaks under a clear blue sky, natural photography style with soft lighting'
    },
    { 
      id: 3, 
      title: 'Abstract Geometric Art', 
      description: 'Vibrant geometric abstract art with flowing shapes and bold colors, suitable for modern art and design projects',
      image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
      style: 'Abstract',
      category: 'Art Styles',
      tags: ['geometric', 'colorful', 'modern', 'artistic'],
      isPro: true,
      isNew: false,
      isPopular: false,
      usage: 'Modern art projects, brand designs, creative backgrounds, website headers',
      difficulty: 'Advanced' as const,
      prompt: 'Abstract geometric patterns with vibrant colors flowing in organic shapes, modern digital art style with gradient overlays and dynamic composition'
    },
    { 
      id: 4, 
      title: 'Stylized Digital Portrait', 
      description: 'Artistic portrait with digital effects and artistic filters, ideal for profile pictures and character art',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&w=1000&q=80',
      style: 'Digital Art',
      category: 'Art Styles',
      tags: ['portrait', 'digital', 'artistic', 'stylized'],
      isPro: true,
      isNew: false,
      isPopular: true,
      usage: 'Profile pictures, character art, digital painting practice, social media avatars',
      difficulty: 'Medium' as const,
      prompt: 'A stylized digital portrait with artistic effects, vibrant colors, and modern digital painting techniques, semi-realistic style'
    },
    {
      id: 5,
      title: 'Trendy Social Media Post',
      description: 'Instagram-ready template with perfect composition and trending aesthetics, great for influencers and brands',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&w=1000&q=80',
      style: 'Social Media',
      category: 'Social Media',
      tags: ['instagram', 'trendy', 'aesthetic', 'square'],
      isPro: false,
      isNew: false,
      isPopular: true,
      usage: 'Instagram posts, social media content, influencer marketing, brand promotions',
      difficulty: 'Easy' as const,
      prompt: 'A trendy social media post design with aesthetic composition perfect for Instagram, clean layout with engaging visual elements'
    },
    {
      id: 6,
      title: 'Professional Business Headshot',
      description: 'Clean, professional portrait perfect for LinkedIn and business use, suitable for corporate websites and business cards',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=1000&q=80',
      style: 'Professional',
      category: 'Photography',
      tags: ['professional', 'business', 'clean', 'portrait'],
      isPro: false,
      isNew: false,
      isPopular: false,
      usage: 'LinkedIn profiles, business cards, corporate websites, professional portfolios',
      difficulty: 'Easy' as const,
      prompt: 'A professional business headshot with clean lighting and neutral background, corporate photography style'
    }
  ];

  // Extract all unique tags
  const availableTags = useMemo(() => {
    const tags = allTemplates.flatMap(template => template.tags || []);
    return [...new Set(tags)].sort();
  }, [allTemplates]);

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
  }, [activeCategory, searchQuery, selectedTags, allTemplates]);

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
      description: `Using "${template.title}" template. Now enter your own text to customize it!`,
    });
    
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
    <main className="py-16 md:py-20" role="main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TemplateGalleryHero />
        
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
        
        {/* Enhanced results summary with better accessibility */}
        <div className="mt-8 mb-6">
          <p className="text-sm text-brand-slate-600 font-medium" role="status" aria-live="polite">
            Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
            {activeCategory && ` in ${activeCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
        
        {/* Optimized templates grid with better performance */}
        <section aria-label="Template gallery">
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
        </section>

        {/* Enhanced empty state */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16" role="region" aria-label="No templates found">
            <p className="text-brand-slate-500 mb-6 text-lg">No templates found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveCategory(null);
                setSearchQuery('');
                setSelectedTags([]);
              }}
              className="border-brand-slate-200 hover:bg-brand-slate-50 font-medium rounded-xl focus:ring-2 focus:ring-brand-purple"
              aria-label="Clear all filters and show all templates"
            >
              Clear Filters
            </Button>
          </div>
        )}
        
        {/* Enhanced CTA section */}
        <div className="mt-16 text-center">
          <Link to="/text-to-image">
            <Button 
              variant="outline" 
              className="border-brand-purple text-brand-purple hover:bg-brand-purple/5 hover:border-brand-purple/60 font-semibold rounded-xl shadow-subtle transition-all duration-200 focus:ring-2 focus:ring-brand-purple"
              aria-label="Create your own custom template"
            >
              Create Your Own
              <ImagePlus className="h-4 w-4 ml-2" aria-hidden="true" />
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
    </main>
  );
};
