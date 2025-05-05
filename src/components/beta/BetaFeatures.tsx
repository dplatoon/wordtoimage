
import { Badge } from '@/components/ui/badge';
import { Sparkles, Workflow, Bell } from 'lucide-react';

export const BetaFeatures = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-3 bg-purple-100 hover:bg-purple-100 text-purple-800 border-none">
            Current Beta Tests
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">
            Features Currently Being Tested
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These exciting features are currently in beta testing with our select group of testers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">Enhanced AI Generation</h3>
                <p className="text-gray-600">Advanced AI models for more accurate and creative text-to-image generation.</p>
                <Badge className="mt-3 bg-purple-100 text-purple-800">Coming Soon</Badge>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Workflow className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">Batch Processing</h3>
                <p className="text-gray-600">Create multiple designs at once with our new batch processing capability.</p>
                <Badge className="mt-3 bg-green-100 text-green-800">Active Testing</Badge>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">Smart Notifications</h3>
                <p className="text-gray-600">Intelligent notification system that learns from your usage patterns.</p>
                <Badge className="mt-3 bg-blue-100 text-blue-800">Active Testing</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
