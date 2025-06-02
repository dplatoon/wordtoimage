
import { Wand2, Palette, Clock, ShieldCheck, Download, Layers, Zap, Users, Share2, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const DetailedFeaturesSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  
  const features = [
    {
      icon: Wand2,
      title: "Advanced AI Image Generation",
      description: "Transform any text description into unique, high-quality images using state-of-the-art diffusion models.",
      extendedDescription: "Our AI has been trained on millions of images to understand the relationships between words and visuals, enabling it to create truly unique artwork that matches your exact specifications with impressive accuracy and detail.",
      examples: ["Portrait photography", "Abstract art", "Product mockups", "Landscape scenes"]
    },
    {
      icon: Palette,
      title: "50+ Artistic Styles & Customization",
      description: "Choose from photorealistic, watercolor, oil painting, digital art, and many more artistic styles to match your vision.",
      extendedDescription: "From classic art movements to modern digital aesthetics, our comprehensive style library includes everything from Renaissance paintings to cyberpunk illustrations, ensuring your creative vision comes to life exactly as imagined.",
      examples: ["Photorealistic", "Watercolor", "Digital art", "Vintage poster"]
    },
    {
      icon: Zap,
      title: "Lightning-Fast Processing (Under 10 Seconds)",
      description: "Generate high-quality images in under 10 seconds with our optimized AI infrastructure designed for speed.",
      extendedDescription: "No more waiting hours for design work. Our cloud-based processing ensures consistent speed regardless of complexity, letting you iterate quickly on creative ideas and maintain your creative flow.",
      examples: ["Simple designs: 3-5 seconds", "Complex scenes: 8-10 seconds", "Batch generation: 15-20 seconds"]
    },
    {
      icon: Download,
      title: "High-Resolution Downloads (Up to 4K)",
      description: "Download your creations in multiple formats and resolutions up to 4K, perfect for any project size.",
      extendedDescription: "Export in PNG, JPG, or SVG formats at various resolutions. Whether you need images for social media posts, print materials, website headers, or professional presentations, we've got the right format and quality.",
      examples: ["Social media: 1080p", "Print quality: 300 DPI", "Web headers: 4K", "Mobile apps: Optimized"]
    },
    {
      icon: ShieldCheck,
      title: "Commercial License & Quality Guarantee",
      description: "Use your generated images for commercial projects with full rights and consistent high-quality output.",
      extendedDescription: "Every image comes with complete commercial usage rights. Our quality assurance algorithms ensure consistent results that meet professional standards for clarity, composition, and artistic integrity.",
      examples: ["Marketing materials", "Product packaging", "Website design", "Social media content"]
    },
    {
      icon: Layers,
      title: "Advanced Customization Controls",
      description: "Fine-tune your results with detailed style intensity, color palette, and composition controls.",
      extendedDescription: "Take creative control with adjustable parameters for style strength, color saturation, lighting conditions, and compositional elements. Perfect for professionals who need precise control over their visual output.",
      examples: ["Style intensity: 0-100%", "Color temperature", "Lighting direction", "Composition rules"]
    },
    {
      icon: Users,
      title: "Team Collaboration & Sharing",
      description: "Share your generations with team members, create collaborative galleries, and manage projects together.",
      extendedDescription: "Built-in collaboration tools allow teams to share prompts, build collective galleries, provide feedback, and maintain brand consistency across all generated content.",
      examples: ["Team galleries", "Shared prompts", "Project folders", "Brand guidelines"]
    },
    {
      icon: History,
      title: "Generation History & Management",
      description: "Keep track of all your creations with automatic history saving and easy organization tools.",
      extendedDescription: "Never lose a great creation again. Our comprehensive history system saves every generation with its original prompt, allowing you to recreate, modify, or share your work at any time.",
      examples: ["Auto-save all generations", "Search by prompt", "Organize by project", "Export collections"]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="detailed-features" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">
              <Wand2 className="h-4 w-4 mr-2" />
              Complete Feature Set
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Everything You Need for Professional Image Creation
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Comprehensive tools and features designed to transform your creative ideas into stunning visuals
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="group"
              variants={itemVariants}
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
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <div className="text-sm text-gray-500 pt-2 border-t">
                        {feature.extendedDescription}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Examples:</h4>
                        <div className="flex flex-wrap gap-1">
                          {feature.examples.map((example, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
