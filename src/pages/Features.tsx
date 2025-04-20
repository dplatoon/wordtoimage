
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TemplatesSection } from '@/components/TemplatesSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { ImageGenerationForm } from '@/components/hero/ImageGenerationForm';
import { ImagePreview } from '@/components/hero/ImagePreview';

const Features = () => {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-3 bg-blue-100 hover:bg-blue-100 text-blue-800 border-none">
                <Sparkles className="h-4 w-4 mr-1" />
                Features
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Features</span> That Power Your Creativity
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Transform your words into stunning visuals with our comprehensive suite of AI-powered tools and features.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Image Generation Demo */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-3 bg-blue-100 hover:bg-blue-100 text-blue-800 border-none">
                <ImageIcon className="h-4 w-4 mr-1" />
                Try It Now
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">
                AI-Powered Image Generation
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the power of AI-generated images right now. Enter a prompt and watch as your ideas transform into stunning visuals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <ImageGenerationForm 
                onImageGenerated={setGeneratedImageUrl}
                onGeneratingChange={setIsGenerating}
                onError={setError}
              />
              <ImagePreview 
                imageUrl={generatedImageUrl}
                isGenerating={isGenerating}
                error={error}
              />
            </div>
          </div>
        </section>

        {/* Reuse the existing FeaturesSection component */}
        <FeaturesSection />

        {/* Advanced Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-3 bg-purple-100 hover:bg-purple-100 text-purple-800 border-none">
                Advanced Capabilities
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">
                AI-Powered Design Tools
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our cutting-edge AI technology makes design accessible to everyone, regardless of skill level.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Text-to-Image Generation</h3>
                <ul className="space-y-4">
                  {[
                    "Transform text descriptions into professional graphics",
                    "Control style, mood, and composition with simple prompts",
                    "Generate multiple variations to choose from",
                    "Refine results with feedback and iterations",
                    "Built on state-of-the-art AI models"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-100 h-80 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">AI Generation Preview</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reuse the existing TemplatesSection component */}
        <TemplatesSection />
      </main>

      <Footer />
    </div>
  );
};

export default Features;
