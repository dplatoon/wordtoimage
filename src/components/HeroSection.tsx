import { ArrowRight, Image, Sparkles, Star, Download, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { generateImage } from '@/services/runwareService';
import { Input } from './ui/input';
import { ApiKeyForm } from './ApiKeyForm';

export const HeroSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  
  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast.error('Invalid Input', {
        description: 'Please enter a prompt for the image'
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const options = { 
        prompt: prompt.trim(),
        width: 1024,
        height: 1024,
        model: "runware:100@1"
      };
      
      const result = await generateImage(options);
      
      if (result.error) {
        throw new Error(result.error.message);
      }
      
      if (result.imageUrl) {
        setGeneratedImageUrl(result.imageUrl);
        toast.success("Success!", {
          description: "Your custom graphic is ready to download.",
        });
      } else {
        throw new Error("No image URL received");
      }
    } catch (error) {
      console.error('Failed to generate image:', error);
      toast.error("Generation Failed", {
        description: error instanceof Error ? error.message : "Please try again with a different prompt."
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleApiKeySubmit = (apiKey: string) => {
    setTempApiKey(apiKey);
    setShowApiKeyForm(false);
  };
  
  const handleDownload = () => {
    if (!generatedImageUrl) return;
    
    // Create an anchor element and trigger download
    const a = document.createElement('a');
    a.href = generatedImageUrl;
    a.download = `runware-image-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast.success('Image downloaded successfully!');
  };

  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-6 text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Turn Words Into Stunning Graphics</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 font-poppins mb-6">
              Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Social Media Graphics</span> in Seconds
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Transform your words into stunning, shareable graphics for all social platforms with our AI-powered design tool. No design skills required!
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-6">
                Try for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                View Templates
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="inline-block h-8 w-8 rounded-full bg-gray-300 border-2 border-white" />
                ))}
              </div>
              <div className="ml-3 text-sm text-gray-600">
                <span className="font-medium text-gray-900">2,500+</span> creators trust WordToImage
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <div className="bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-xl p-1">
                <div className="bg-white rounded-xl p-5">
                  {!tempApiKey && (
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Shield className="h-4 w-4 mr-1 text-green-500" />
                        <span>Using Runware AI for image generation</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowApiKeyForm(!showApiKeyForm)}
                        className="text-xs"
                      >
                        {showApiKeyForm ? 'Hide' : 'API Options'}
                      </Button>
                    </div>
                  )}
                  
                  {showApiKeyForm && (
                    <ApiKeyForm 
                      onSubmit={handleApiKeySubmit} 
                      serviceName="Runware"
                      keyPlaceholder="Enter your Runware API key"
                    />
                  )}
                  
                  <div className="mb-4">
                    <Input
                      type="text"
                      placeholder="Describe the image you want to create..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      disabled={isGenerating}
                      className="w-full"
                    />
                  </div>
                  <div className="h-[350px] md:h-[400px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {isGenerating ? (
                      <div className="text-center px-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Generating your custom graphic...</p>
                      </div>
                    ) : generatedImageUrl ? (
                      <img 
                        src={generatedImageUrl} 
                        alt="Generated social media graphic" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center px-8">
                        <Image className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-500">Enter a prompt and generate your custom social media graphic with Runware AI</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex gap-3 items-center">
                    <Button 
                      className="bg-blue-600 flex-1"
                      onClick={handleGenerateImage}
                      disabled={isGenerating || !prompt.trim()}
                    >
                      {isGenerating ? 'Generating...' : 'Generate Image'}
                    </Button>
                    {generatedImageUrl && (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleDownload}
                        title="Download image"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-yellow-900 font-medium px-4 py-2 rounded-full transform rotate-12 shadow-lg">
                Runware AI!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
