
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, Shield, Users, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

export const EmailCaptureModule = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Simulate API call
    setIsSubmitted(true);
    toast.success("Success! Check your email for the download link.", {
      description: "The AI Prompt Library is on its way to your inbox!"
    });
    
    // Reset after 3 seconds for demo
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-0 bg-white">
            <CardContent className="p-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Check Your Email! 📧
              </h3>
              <p className="text-xl text-gray-600 mb-6">
                Your free AI Prompt Library is on its way. Don't forget to check your spam folder!
              </p>
              <div className="flex justify-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  500+ Premium Prompts
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Instant Download
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-2xl border-0 bg-white overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Preview */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-8 text-white">
              <div className="space-y-6">
                <div className="flex items-center">
                  <Download className="w-8 h-8 mr-3" />
                  <span className="text-2xl font-bold">AI Prompt Bible</span>
                </div>
                
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h4 className="text-xl font-semibold mb-4">What's Inside:</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                      500+ Premium AI Art Prompts
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                      Category-organized by Style
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                      Copy-paste Ready Prompts
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                      Professional Artist Techniques
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                      Bonus: Color Theory Guide
                    </li>
                  </ul>
                </div>

                {/* Mock PDF Preview */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="bg-white rounded p-2 text-gray-800 text-xs">
                    <div className="border-b pb-2 mb-2">
                      <strong>AI-Prompt-Bible.pdf</strong>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Photorealistic Portraits</span>
                        <span>25 prompts</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fantasy Landscapes</span>
                        <span>40 prompts</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cyberpunk Scenes</span>
                        <span>30 prompts</span>
                      </div>
                      <div className="text-center pt-2 text-gray-500">
                        + 400 more...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Get 500+ Proven AI Prompts
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Free Download - No Spam, Unsubscribe Anytime
                  </p>
                  
                  {/* Social Proof */}
                  <div className="flex justify-center items-center space-x-4 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      <span>15,000+ downloads</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="w-4 h-4 mr-1" />
                      <span>Instant delivery</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-lg border-2 border-gray-200 focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Get Prompt Library (Free!)
                  </Button>
                </form>

                {/* Trust Badges */}
                <div className="flex justify-center space-x-4 pt-4">
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    <Shield className="w-3 h-3 mr-1" />
                    No Spam
                  </Badge>
                  <Badge variant="outline" className="border-blue-500 text-blue-600">
                    <Mail className="w-3 h-3 mr-1" />
                    Instant Access
                  </Badge>
                  <Badge variant="outline" className="border-purple-500 text-purple-600">
                    <Download className="w-3 h-3 mr-1" />
                    PDF Format
                  </Badge>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to receive emails from WordToImage. 
                  You can unsubscribe at any time. We respect your privacy.
                </p>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
};
