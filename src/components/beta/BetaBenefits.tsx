
import { Badge } from '@/components/ui/badge';
import { Beaker, Star, Shield } from 'lucide-react';

export const BetaBenefits = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-3 bg-green-100 hover:bg-green-100 text-green-800 border-none">
            Benefits
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">
            Why Join Our Beta Program?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            As a beta tester, you'll enjoy exclusive benefits while helping us improve our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-5">
              <Beaker className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Early Access</h3>
            <p className="text-gray-600">Be the first to try new features and tools before they're released to the public.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-5">
              <Star className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Features</h3>
            <p className="text-gray-600">Get complimentary access to premium features during your beta testing period.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mb-5">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Direct Support</h3>
            <p className="text-gray-600">Enjoy priority support and direct access to our product team for assistance.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
