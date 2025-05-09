
import { Link } from 'react-router-dom';
import { Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CtaGeneratorSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Transform Text to Image in Seconds</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Create stunning visuals from simple text descriptions with our AI-powered generator. No design skills needed.
          </p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg shadow-lg px-8 py-6 transform transition-transform hover:scale-105" asChild>
            <Link to="/text-to-image">
              <Image className="mr-2 h-5 w-5" />
              Start Creating Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
