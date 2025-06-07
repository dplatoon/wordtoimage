
import { Zap, Palette, Download, Shield, Users, Sparkles, Image, Clock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Generation",
    description: "Create stunning images in seconds, not hours. Our optimized AI models deliver professional results instantly.",
    benefits: ["Under 10 second generation", "Batch processing available", "Real-time preview"]
  },
  {
    icon: Palette,
    title: "Multiple Art Styles",
    description: "From photorealistic to abstract, watercolor to digital art - choose from dozens of artistic styles.",
    benefits: ["50+ art styles", "Custom style mixing", "Style intensity control"]
  },
  {
    icon: Image,
    title: "High Resolution Output",
    description: "Generate images up to 4K resolution perfect for print, web, and professional use.",
    benefits: ["Up to 4096x4096 pixels", "Print-ready quality", "Multiple format export"]
  },
  {
    icon: Shield,
    title: "Commercial Rights Included",
    description: "Use your generated images for any purpose - commercial projects, marketing, or personal use.",
    benefits: ["Full commercial license", "No attribution required", "Unlimited usage rights"]
  },
  {
    icon: Users,
    title: "Collaboration Features",
    description: "Share projects with your team, organize images in collections, and collaborate on creative projects.",
    benefits: ["Team workspaces", "Shared galleries", "Project organization"]
  },
  {
    icon: Clock,
    title: "Generation History",
    description: "Never lose a creation. Access your complete generation history with searchable prompts and results.",
    benefits: ["Unlimited history", "Prompt search", "Favorite collections"]
  }
];

export const FeaturesDetailed = () => {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for <span className="text-gradient-neon">Every Creator</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional-grade AI image generation with all the features you need to bring your creative vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="ai-card group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-gray-400">
                    <Sparkles className="h-3 w-3 text-ai-neon mr-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-r from-ai-primary/20 to-ai-secondary/20 rounded-2xl p-8 border border-ai-primary/30">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to explore all features?</h3>
            <p className="text-gray-300 mb-6">Start with our free plan and upgrade when you need more power.</p>
            <button className="btn-ai-neon">
              <Download className="h-5 w-5 mr-2" />
              Start Creating Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
