
import { Wand2, Palette, Clock, ShieldCheck, Download, Layers } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const FeaturesSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  
  const features = [
    {
      icon: Wand2,
      title: "AI-Driven Creativity",
      description: "Generate unique images from your text with our advanced AI technology that understands context and nuance.",
      extendedDescription: "Our AI model has been trained on millions of images to understand the relationships between words and visuals, enabling it to create truly unique artwork from your descriptions."
    },
    {
      icon: Palette,
      title: "Customizable Styles",
      description: "Choose from a variety of artistic styles and themes to match your vision perfectly.",
      extendedDescription: "From photorealistic to abstract art, watercolor to oil painting, our platform offers dozens of artistic styles that you can apply to your creations with a single click."
    },
    {
      icon: Clock,
      title: "Fast and User-Friendly",
      description: "Create images in seconds with our intuitive, easy-to-use interface designed for creators of all skill levels.",
      extendedDescription: "No more waiting hours for design work. Our optimized AI generates high-quality images in under 10 seconds, letting you iterate quickly on your creative ideas."
    },
    {
      icon: ShieldCheck,
      title: "Quality Guaranteed",
      description: "High-resolution images with consistent quality for all your projects, every time.",
      extendedDescription: "Our quality assurance algorithms ensure that every image meets our high standards for clarity, composition, and artistic integrity before delivering it to you."
    },
    {
      icon: Download,
      title: "Easy Downloads",
      description: "Download your creations instantly in multiple formats for any use case or platform.",
      extendedDescription: "Export your images in PNG, JPG, or SVG formats at various resolutions, perfect for social media, print materials, or web design projects."
    },
    {
      icon: Layers,
      title: "Advanced Customization",
      description: "Fine-tune your results with detailed style and parameter controls for perfect outputs.",
      extendedDescription: "Take creative control with adjustable parameters for style intensity, color palette, composition, and other artistic elements to make your vision come to life exactly as you imagined."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span 
            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4 animate-fade-in"
            style={{ animationDelay: '0s' }}
          >
            <Wand2 className="h-4 w-4 mr-2" aria-hidden="true" />
            <span>Features</span>
          </span>
          
          <h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-4 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            Why Use WordToImage?
          </h2>
          
          <p 
            className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            Powerful features designed to transform your ideas into stunning visuals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-blue-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {hoveredFeature === index && (
                    <div className="animate-fade-in text-sm text-gray-500 pt-2 border-t mt-2">
                      {feature.extendedDescription}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
