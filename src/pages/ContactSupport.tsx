
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { MessageCircle, Mail, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SEOManager } from '@/components/seo/SEOManager';

const ContactSupport = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOManager customConfig={{
        title: "Contact Support - Get Help with WordToImage",
        description: "Get support for WordToImage. Contact our team for technical help, billing questions, or general inquiries. Fast response times guaranteed.",
        keywords: ["WordToImage support", "customer service", "technical help", "billing support", "contact us"]
      }} />
      
      <Nav />
      
      <main className="pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contact Support
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Need help? We're here to assist you with any questions or issues
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Get instant help from our support team</p>
                <p className="text-sm text-gray-500 mb-4">Available: Mon-Fri, 9 AM - 6 PM PST</p>
                <Button className="w-full bg-violet-600 hover:bg-violet-700">
                  Start Chat
                </Button>
              </div>

              <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">Send us a detailed message</p>
                <p className="text-sm text-gray-500 mb-4">Response within 24 hours</p>
                <Button variant="outline" className="w-full">
                  support@wordtoimage.com
                </Button>
              </div>

              <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-4">Talk directly with our team</p>
                <p className="text-sm text-gray-500 mb-4">Business hours only</p>
                <Button variant="outline" className="w-full">
                  +1 (555) 123-4567
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <Input placeholder="Your first name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <Input placeholder="Your last name" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject Category
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <Input placeholder="Brief description of your issue" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Please provide as much detail as possible..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button className="w-full bg-violet-600 hover:bg-violet-700" size="lg">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* FAQ Quick Links */}
          <div className="mt-16 bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Quick Help
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 text-left justify-start">
                <div>
                  <div className="font-medium">Getting Started</div>
                  <div className="text-sm text-gray-500">Basic setup guide</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 text-left justify-start">
                <div>
                  <div className="font-medium">Billing & Plans</div>
                  <div className="text-sm text-gray-500">Subscription help</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 text-left justify-start">
                <div>
                  <div className="font-medium">Technical Issues</div>
                  <div className="text-sm text-gray-500">Troubleshooting</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 text-left justify-start">
                <div>
                  <div className="font-medium">API Documentation</div>
                  <div className="text-sm text-gray-500">Developer resources</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactSupport;
