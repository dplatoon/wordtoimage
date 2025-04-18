
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, ImagePlus } from 'lucide-react';

export const HeroHeader = () => {
  return (
    <div className="text-center lg:text-left mb-8">
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
          Generate Your First Image
          <Wand2 className="ml-2 h-5 w-5" />
        </Button>
        <Button size="lg" variant="outline" className="text-lg">
          Browse Template Gallery
          <ImagePlus className="ml-2 h-5 w-5" />
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
  );
};
