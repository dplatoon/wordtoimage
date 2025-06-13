
import React from 'react';
import { Wand2, Zap, Palette, Download, Shield, Users } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';

const coreFeatures = [
  {
    icon: Wand2,
    title: "AI-Powered Generation",
    description: "Transform any text into stunning visuals using advanced AI models",
    benefit: "Create professional images without design skills",
    color: "text-blue-600 bg-blue-100"
  },
  {
    icon: Zap,
    title: "Lightning Fast Results",
    description: "Generate high-quality images in under 10 seconds",
    benefit: "Save hours of design work with instant results",
    color: "text-yellow-600 bg-yellow-100"
  },
  {
    icon: Palette,
    title: "50+ Art Styles",
    description: "Choose from diverse artistic styles and visual aesthetics",
    benefit: "Match any brand or creative vision perfectly",
    color: "text-purple-600 bg-purple-100"
  },
  {
    icon: Download,
    title: "4K Quality Downloads",
    description: "Export images in high resolution for professional use",
    benefit: "Print-ready quality for all your projects",
    color: "text-green-600 bg-green-100"
  },
  {
    icon: Shield,
    title: "Commercial Rights",
    description: "Full ownership and commercial usage rights included",
    benefit: "Use in business projects without licensing worries",
    color: "text-red-600 bg-red-100"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share projects and collaborate with team members",
    benefit: "Streamline creative workflows across teams",
    color: "text-indigo-600 bg-indigo-100"
  }
];

export const CoreFeaturesGrid = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Core Features That Drive Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create stunning AI-generated images for any purpose
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreFeatures.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-6 w-6" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-3 leading-relaxed">
                {feature.description}
              </p>
              
              <p className="text-sm font-medium text-violet-600">
                ✓ {feature.benefit}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            Trusted by 50,000+ creators worldwide
          </div>
        </div>
      </div>
    </section>
  );
};
