
import React from 'react';
import { Wand2, Zap, Palette, Download, Shield, Users } from 'lucide-react';

const coreFeatures = [
  {
    icon: Wand2,
    title: "AI-Powered Generation",
    description: "Transform any text into stunning visuals using advanced AI models",
    benefit: "Create professional images without design skills"
  },
  {
    icon: Zap,
    title: "Lightning Fast Results",
    description: "Generate high-quality images in under 10 seconds",
    benefit: "Save hours of design work with instant results"
  },
  {
    icon: Palette,
    title: "50+ Art Styles",
    description: "Choose from diverse artistic styles and visual aesthetics",
    benefit: "Match any brand or creative vision perfectly"
  },
  {
    icon: Download,
    title: "4K Quality Downloads",
    description: "Export images in high resolution for professional use",
    benefit: "Print-ready quality for all your projects"
  },
  {
    icon: Shield,
    title: "Commercial Rights",
    description: "Full ownership and commercial usage rights included",
    benefit: "Use in business projects without licensing worries"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share projects and collaborate with team members",
    benefit: "Streamline creative workflows across teams"
  }
];

export const CoreFeaturesGrid = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Core Features That Drive Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to create stunning AI-generated images for any purpose
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreFeatures.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl border border-primary/20 hover:border-primary/40 hover:shadow-neon transition-all duration-300 bg-card/30 backdrop-blur-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground mb-3 leading-relaxed">
                {feature.description}
              </p>
              
              <p className="text-sm font-medium text-primary">
                ✓ {feature.benefit}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center px-4 py-2 bg-card/30 backdrop-blur-xl rounded-full text-sm text-muted-foreground border border-primary/20">
            <Users className="w-4 h-4 mr-2 text-primary" />
            Trusted by 50,000+ creators worldwide
          </div>
        </div>
      </div>
    </section>
  );
};
