
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Lightbulb, Target, Palette, Camera } from 'lucide-react';
import { SEOManager } from '@/components/seo/SEOManager';

const PromptGuide = () => {
  const promptTips = [
    {
      title: "Be Specific",
      icon: Target,
      description: "Include detailed descriptions rather than vague terms",
      example: "Instead of 'a dog', try 'a golden retriever sitting in a sunny meadow'"
    },
    {
      title: "Use Style Keywords",
      icon: Palette,
      description: "Add artistic style descriptors to guide the aesthetic",
      example: "Add terms like 'digital art', 'oil painting', 'photorealistic', or 'minimalist'"
    },
    {
      title: "Specify Camera Settings",
      icon: Camera,
      description: "Include photography terms for realistic images",
      example: "'shot with 85mm lens', 'shallow depth of field', 'golden hour lighting'"
    },
    {
      title: "Add Quality Modifiers",
      icon: Lightbulb,
      description: "Use quality descriptors for better results",
      example: "'highly detailed', 'sharp focus', '4K resolution', 'professional photography'"
    }
  ];

  const examples = [
    {
      category: "Portrait Photography",
      prompt: "Professional headshot of a business woman, 85mm lens, shallow depth of field, studio lighting, sharp focus, high resolution"
    },
    {
      category: "Digital Art",
      prompt: "Cyberpunk city at night, neon lights, rain reflections, digital art style, highly detailed, vibrant colors"
    },
    {
      category: "Nature Photography",
      prompt: "Majestic mountain landscape at sunrise, golden hour lighting, wide angle shot, mist in valleys, professional nature photography"
    },
    {
      category: "Abstract Art",
      prompt: "Abstract geometric patterns, bold colors, modern minimalist style, clean composition, digital illustration"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOManager customConfig={{
        title: "AI Prompt Guide - Master Text-to-Image Prompts | WordToImage",
        description: "Learn how to write effective AI prompts for better image generation. Tips, examples, and best practices for creating stunning AI art.",
        keywords: ["AI prompt guide", "text to image prompts", "AI art prompts", "prompt engineering", "AI image generation tips"]
      }} />
      
      <Nav />
      
      <main className="pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Prompt Writing Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Master the art of writing effective prompts for stunning AI-generated images
            </p>
          </div>

          {/* Tips Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Essential Prompt Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {promptTips.map((tip, index) => (
                <div key={index} className="bg-white rounded-lg border shadow-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center shrink-0">
                      <tip.icon className="h-6 w-6 text-violet-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                      <p className="text-gray-600 mb-3">{tip.description}</p>
                      <div className="bg-gray-50 rounded-md p-3 text-sm">
                        <p className="text-gray-700 italic">"{tip.example}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Examples Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Prompt Examples</h2>
            <div className="space-y-6">
              {examples.map((example, index) => (
                <div key={index} className="bg-white rounded-lg border shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-violet-600 mb-3">{example.category}</h3>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="text-gray-800 font-mono text-sm leading-relaxed">{example.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Structure Guide */}
          <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Prompt Structure Template</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border-l-4 border-violet-500">
                <h4 className="font-semibold text-gray-900 mb-2">1. Subject</h4>
                <p className="text-gray-600">What is the main focus of your image?</p>
                <p className="text-sm text-gray-500 mt-1">Example: "A majestic lion"</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                <h4 className="font-semibold text-gray-900 mb-2">2. Description</h4>
                <p className="text-gray-600">Add details about appearance, pose, or action</p>
                <p className="text-sm text-gray-500 mt-1">Example: "standing proudly on a rocky cliff"</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-900 mb-2">3. Environment</h4>
                <p className="text-gray-600">Describe the setting or background</p>
                <p className="text-sm text-gray-500 mt-1">Example: "overlooking an African savanna at sunset"</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-900 mb-2">4. Style & Quality</h4>
                <p className="text-gray-600">Add artistic style and quality modifiers</p>
                <p className="text-sm text-gray-500 mt-1">Example: "wildlife photography, 85mm lens, golden hour lighting"</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PromptGuide;
