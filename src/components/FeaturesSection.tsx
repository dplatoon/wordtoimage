
import { Sparkles, PenTool, LayoutGrid, Palette, Share2, Clock } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: "AI Text-to-Image Generation",
    description: "Transform your words into stunning visuals in seconds."
  },
  {
    icon: LayoutGrid,
    title: "Smart Template Library",
    description: "Pre-designed templates optimized for every social platform."
  },
  {
    icon: PenTool,
    title: "Easy Design Editor",
    description: "Customize your designs without any design skills required."
  },
  {
    icon: Clock,
    title: "Fast Generation",
    description: "Create professional images in seconds, not minutes."
  },
  {
    icon: Palette,
    title: "Brand Kit",
    description: "Keep your brand consistent across all designs."
  },
  {
    icon: Share2,
    title: "Quick Share",
    description: "Share your designs instantly to any platform."
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-white" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
            <Sparkles className="h-4 w-4 mr-2" aria-hidden="true" />
            <span>Features</span>
          </span>
          <h2 id="features-heading" className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            Everything You Need to Create Stunning Graphics
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform provides all the tools you need to create professional images without any design experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
