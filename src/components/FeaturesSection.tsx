
import { Sparkles, PenTool, LayoutGrid, Palette, Share2, Award } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: "AI Text-to-Image",
    description: "Transform your words into professionally designed graphics with our AI-powered generator."
  },
  {
    icon: LayoutGrid,
    title: "Template Library",
    description: "Access hundreds of templates optimized for every social media platform."
  },
  {
    icon: PenTool,
    title: "Drag-and-Drop Editor",
    description: "Easy-to-use editor for customizing layouts, fonts, images, and colors."
  },
  {
    icon: Palette,
    title: "Brand Kit",
    description: "Save your brand colors, logos, and fonts for consistent designs across all graphics."
  },
  {
    icon: Share2,
    title: "Instant Sharing",
    description: "Download or share your designs directly to social media platforms."
  },
  {
    icon: Award,
    title: "Premium Content",
    description: "Access exclusive templates, elements, and features with our premium plans."
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
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
