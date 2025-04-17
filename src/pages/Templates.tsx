
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Book, 
  Code, 
  Settings, 
  Zap, 
  Lightbulb, 
  Rocket, 
  DollarSign, 
  Users, 
  Image as ImageIcon, 
  ArrowRight,
  Palette,
  LayoutDashboard,
  Calendar,
  MessageSquare
} from 'lucide-react';

const Templates = () => {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      
      <main className="pt-8 pb-16">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-3 bg-purple-100 hover:bg-purple-100 text-purple-800 border-none">
              Templates
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 font-poppins mb-6">
              Accelerate Your Development with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Lovable Templates</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Complete, ready-to-use projects that you can remix and customize to fit your unique needs. 
              Start building faster with AI-powered templates.
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg">
              Browse Templates
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Development Workflow Section */}
        <section className="py-16 bg-white" id="workflow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-3 bg-blue-100 hover:bg-blue-100 text-blue-800 border-none">
                Development Workflow
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">
                Our Template-Driven Development Process
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A streamlined approach that combines templates and AI to accelerate your application development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <Card className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <Book className="h-8 w-8 text-purple-500 mb-4" />
                  <CardTitle>1. Conceptualize</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Begin with brainstorming and defining your project's core functionality and user experience goals.</p>
                </CardContent>
              </Card>

              <Card className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <Code className="h-8 w-8 text-blue-500 mb-4" />
                  <CardTitle>2. Select & Customize</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Choose a template that aligns with your project goals and customize it to fit your specific requirements.</p>
                </CardContent>
              </Card>

              <Card className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <Zap className="h-8 w-8 text-yellow-500 mb-4" />
                  <CardTitle>3. AI Enhancement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Leverage AI tools to refine your template with advanced features, optimizations, and customizations.</p>
                </CardContent>
              </Card>

              <Card className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <Rocket className="h-8 w-8 text-red-500 mb-4" />
                  <CardTitle>4. Deploy & Iterate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Launch your application and collect user feedback to make continuous improvements.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Integration Section */}
        <section className="py-16 bg-gray-50" id="ai-integration">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-3 bg-purple-100 hover:bg-purple-100 text-purple-800 border-none">
                AI Integration
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">
                Supercharged Development with AI
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our templates integrate advanced AI capabilities to enhance your development process at every stage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                <Settings className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Intelligent Code Generation</h3>
                <p className="text-gray-600">AI automatically generates optimized code based on your requirements, reducing development time significantly.</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                <Lightbulb className="h-10 w-10 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Design Suggestions</h3>
                <p className="text-gray-600">Receive AI-powered design recommendations that follow best practices and enhance user experience.</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                <Users className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">User Behavior Analysis</h3>
                <p className="text-gray-600">Gain insights from AI analysis of user interactions to make data-driven design and functionality decisions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white" id="benefits">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-3 bg-green-100 hover:bg-green-100 text-green-800 border-none">
                Benefits
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">
                Why Choose Our Rapid Development Approach
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our template-driven, AI-enhanced development methodology offers numerous advantages for projects of all sizes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-12">
              <div className="flex">
                <Rocket className="flex-shrink-0 h-8 w-8 text-purple-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Faster Time to Market</h3>
                  <p className="text-gray-600">Launch your applications in days or weeks instead of months with our pre-built templates and AI assistance.</p>
                </div>
              </div>

              <div className="flex">
                <DollarSign className="flex-shrink-0 h-8 w-8 text-green-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Reduced Development Costs</h3>
                  <p className="text-gray-600">Save on development resources by leveraging existing templates and AI-powered tools that accelerate your workflow.</p>
                </div>
              </div>

              <div className="flex">
                <Palette className="flex-shrink-0 h-8 w-8 text-blue-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Flexibility and Customization</h3>
                  <p className="text-gray-600">Enjoy complete freedom to customize every aspect of your template to match your unique brand and requirements.</p>
                </div>
              </div>

              <div className="flex">
                <Users className="flex-shrink-0 h-8 w-8 text-yellow-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Enhanced Collaboration</h3>
                  <p className="text-gray-600">Improve team productivity with shared templates and AI tools that streamline communication and development.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example Templates Section */}
        <section className="py-16 bg-gray-50" id="examples">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-3 bg-blue-100 hover:bg-blue-100 text-blue-800 border-none">
                Examples
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">
                Templates for Every Need
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore a variety of templates designed for different use cases and industries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="border overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                  <LayoutDashboard className="h-16 w-16 text-white" />
                </div>
                <CardHeader>
                  <CardTitle>Business Dashboard</CardTitle>
                  <CardDescription>Analytics and reporting dashboard for businesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">A comprehensive dashboard with customizable widgets, data visualization, and real-time analytics capabilities.</p>
                  <Button variant="outline" className="w-full">
                    View Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="border overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                  <Calendar className="h-16 w-16 text-white" />
                </div>
                <CardHeader>
                  <CardTitle>Daily Planner</CardTitle>
                  <CardDescription>Personal productivity and planning application</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">A feature-rich daily planner with task management, calendar integration, and goal tracking capabilities.</p>
                  <Button variant="outline" className="w-full">
                    View Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="border overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <MessageSquare className="h-16 w-16 text-white" />
                </div>
                <CardHeader>
                  <CardTitle>Community Forum</CardTitle>
                  <CardDescription>Discussion and community engagement platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">A fully-featured forum with user authentication, threaded discussions, and moderation tools.</p>
                  <Button variant="outline" className="w-full">
                    View Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Accelerate Your Development?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Start creating with our powerful templates and AI-assisted development tools today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 text-lg">
                Get Started for Free
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg">
                Browse Templates
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Templates;
