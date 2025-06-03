
import { Wand2, Zap, Palette, Download } from 'lucide-react';

export const StaticFeaturesSection = () => {
  const features = [
    {
      icon: <Wand2 className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Generation",
      description: "Advanced AI models create stunning images from your text descriptions in seconds."
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "Lightning Fast",
      description: "Generate high-quality images in under 10 seconds with our optimized AI pipeline."
    },
    {
      icon: <Palette className="h-8 w-8 text-blue-600" />,
      title: "50+ Art Styles",
      description: "Choose from a diverse collection of artistic styles and visual aesthetics."
    },
    {
      icon: <Download className="h-8 w-8 text-blue-600" />,
      title: "4K Quality",
      description: "Download your creations in high resolution for professional use."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful AI Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create stunning visuals with artificial intelligence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
