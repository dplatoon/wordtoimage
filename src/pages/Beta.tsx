
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Beaker, Bell, Sparkles, Shield, Star, Workflow } from 'lucide-react';

const Beta = () => {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      
      <main className="pt-8 pb-16">
        {/* Hero Section */}
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

        {/* Benefits Section */}
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

        {/* How It Works Section */}
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

        {/* Current Features Being Tested */}
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

        {/* Call to Action */}
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
      </main>

      <Footer />
    </div>
  );
};

export default Beta;
