
import React from 'react';
import { 
  Palette, 
  Download, 
  Zap, 
  Shield, 
  Users, 
  Code, 
  Sparkles, 
  Image as ImageIcon,
  Settings,
  Star,
  Globe,
  Heart
} from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: "50+ Art Styles",
    description: "From photorealistic to abstract, choose from our extensive collection of AI art styles.",
    color: "violet"
  },
  {
    icon: Download,
    title: "HD Downloads",
    description: "Download your creations in multiple formats including PNG, JPG, and WebP up to 4K resolution.",
    color: "blue"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate stunning images in seconds with our optimized AI infrastructure.",
    color: "yellow"
  },
  {
    icon: Shield,
    title: "Commercial License",
    description: "Use your generated images for commercial purposes with our flexible licensing options.",
    color: "green"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together with your team using shared workspaces and project management tools.",
    color: "purple"
  },
  {
    icon: Code,
    title: "API Access",
    description: "Integrate our AI generation capabilities into your applications with our robust API.",
    color: "indigo"
  },
  {
    icon: Sparkles,
    title: "Advanced Prompting",
    description: "Use our intelligent prompt suggestions and enhancement tools for better results.",
    color: "pink"
  },
  {
    icon: ImageIcon,
    title: "Batch Generation",
    description: "Generate multiple variations or completely different images in a single request.",
    color: "cyan"
  },
  {
    icon: Settings,
    title: "Fine-tuning Controls",
    description: "Adjust parameters like style strength, color palette, and composition for perfect results.",
    color: "orange"
  },
  {
    icon: Star,
    title: "Priority Queue",
    description: "Skip the line with priority processing for Pro and Business plan subscribers.",
    color: "amber"
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Fast image delivery worldwide with our global content delivery network.",
    color: "teal"
  },
  {
    icon: Heart,
    title: "Community Gallery",
    description: "Share your creations and get inspired by thousands of community-generated images.",
    color: "rose"
  }
];

const getColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string; icon: string; hover: string }> = {
    violet: { bg: 'bg-violet-50', icon: 'text-violet-600', hover: 'hover:bg-violet-100' },
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', hover: 'hover:bg-blue-100' },
    yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-600', hover: 'hover:bg-yellow-100' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', hover: 'hover:bg-green-100' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', hover: 'hover:bg-purple-100' },
    indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', hover: 'hover:bg-indigo-100' },
    pink: { bg: 'bg-pink-50', icon: 'text-pink-600', hover: 'hover:bg-pink-100' },
    cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', hover: 'hover:bg-cyan-100' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-600', hover: 'hover:bg-orange-100' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-600', hover: 'hover:bg-amber-100' },
    teal: { bg: 'bg-teal-50', icon: 'text-teal-600', hover: 'hover:bg-teal-100' },
    rose: { bg: 'bg-rose-50', icon: 'text-rose-600', hover: 'hover:bg-rose-100' }
  };
  return colorMap[color] || colorMap.violet;
};

export const CoreFeaturesGrid = () => {
  return (
    <section className="mobile-section bg-gray-50">
      <div className="mobile-first-container">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="mobile-text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Create
          </h2>
          <p className="mobile-text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools and features designed to bring your creative vision to life
            with the power of artificial intelligence.
          </p>
        </div>

        <div className="mobile-grid mobile-grid-sm-2 mobile-grid-lg-3 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colors = getColorClasses(feature.color);
            
            return (
              <div
                key={index}
                className={`mobile-card group transition-all duration-300 ${colors.hover} cursor-pointer`}
              >
                <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <h3 className="mobile-text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="mobile-text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <p className="mobile-text-sm text-gray-500 mb-4">
            And many more features being added every month
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['AI Enhancement', 'Upscaling', 'Style Transfer', 'Background Removal'].map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full mobile-text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
