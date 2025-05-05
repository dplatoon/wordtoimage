
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const BetaHero = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge className="mb-3 bg-blue-100 hover:bg-blue-100 text-blue-800 border-none">
          Beta Program
        </Badge>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 font-poppins mb-6">
          Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Beta Program</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Get early access to our newest features, provide feedback, and help shape the future of WordToImage.
        </p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg">
          Apply Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};
