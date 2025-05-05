
import { Button } from '@/components/ui/button';

export const BetaCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Shape the Future?</h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Join our beta program today and help us build a better product while enjoying exclusive benefits.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 text-lg">
            Apply to Beta Program
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
