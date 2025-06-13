
import { Zap, Shield, Sparkles, Download, Palette, Clock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate high-quality images in under 10 seconds",
    color: "text-yellow-600 bg-yellow-100"
  },
  {
    icon: Palette,
    title: "50+ Art Styles",
    description: "From photorealistic to artistic, cartoon to professional",
    color: "text-purple-600 bg-purple-100"
  },
  {
    icon: Shield,
    title: "Commercial Rights",
    description: "Full ownership of all images you create",
    color: "text-green-600 bg-green-100"
  },
  {
    icon: Download,
    title: "High Resolution",
    description: "Download in 4K quality for professional use",
    color: "text-blue-600 bg-blue-100"
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Latest machine learning technology for best results",
    color: "text-pink-600 bg-pink-100"
  },
  {
    icon: Clock,
    title: "24/7 Available",
    description: "Create whenever inspiration strikes",
    color: "text-indigo-600 bg-indigo-100"
  }
];

export const FastFeatures = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to create amazing images
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional-grade AI image generation with all the features you need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
