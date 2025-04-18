
import { Sparkles, PenTool, LayoutGrid, Palette, Share2, Award } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: "AI Text-to-Image Generation",
    description: "Transform your words into stunning visuals in seconds.",
    highlights: [
      "Generate custom graphics from text descriptions in under 10 seconds",
      "Fine-tune images with style and mood controls",
      "Access state-of-the-art AI models for professional results"
    ]
  },
  {
    icon: LayoutGrid,
    title: "Smart Template Library",
    description: "Pre-designed templates for every social platform.",
    highlights: [
      "100+ templates optimized for Instagram, Facebook, and LinkedIn",
      "Auto-resize designs for different social media platforms",
      "Save your favorite templates for quick access"
    ]
  },
  {
    icon: PenTool,
    title: "Easy Design Editor",
    description: "Customize your designs without any design skills.",
    highlights: [
      "Simple drag-and-drop interface for quick edits",
      "Real-time preview of all your changes",
      "Built-in design suggestions powered by AI"
    ]
  },
  {
    icon: Palette,
    title: "Brand Kit",
    description: "Keep your brand consistent across all designs.",
    highlights: [
      "Store and access your brand colors with one click",
      "Import and manage your brand fonts and logos",
      "Apply brand styles to any template instantly"
    ]
  },
  {
    icon: Share2,
    title: "Quick Share",
    description: "Share your designs instantly to any platform.",
    highlights: [
      "Direct posting to social media platforms",
      "Schedule posts for optimal engagement times",
      "Share designs with your team for feedback"
    ]
  },
  {
    icon: Award,
    title: "Premium Content",
    description: "Unlock advanced features for professional results.",
    highlights: [
      "Access exclusive AI image generation models",
      "Priority processing for faster generation",
      "Advanced editing tools and effects"
    ]
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Powerful Features</span>
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 font-poppins">
            Everything You Need to Create Stunning Graphics
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform provides all the tools you need to create professional social media graphics without any design experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-5">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="mr-2 text-blue-600">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
