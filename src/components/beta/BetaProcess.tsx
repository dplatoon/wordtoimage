
import { Badge } from '@/components/ui/badge';

export const BetaProcess = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-3 bg-blue-100 hover:bg-blue-100 text-blue-800 border-none">
            Process
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">
            How The Beta Program Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A simple process to join our exclusive beta testing community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-3 mt-2 text-center">Apply</h3>
            <p className="text-gray-600 text-center">Submit your application with basic information about your needs and experience.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-3 mt-2 text-center">Review</h3>
            <p className="text-gray-600 text-center">Our team reviews your application and selects participants based on our criteria.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-3 mt-2 text-center">Onboard</h3>
            <p className="text-gray-600 text-center">Selected participants receive access credentials and onboarding materials.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
              4
            </div>
            <h3 className="text-xl font-semibold mb-3 mt-2 text-center">Participate</h3>
            <p className="text-gray-600 text-center">Test new features, provide feedback, and help us improve the platform.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
