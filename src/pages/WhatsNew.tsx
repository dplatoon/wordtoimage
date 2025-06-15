
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Calendar, Star, Zap, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SEOManager } from '@/components/seo/SEOManager';

const WhatsNew = () => {
  const updates = [
    {
      date: "2024-06-15",
      version: "v2.3.0",
      type: "Feature",
      title: "Advanced Batch Processing",
      description: "Generate up to 50 images simultaneously with our new batch processing engine. Perfect for creating variations and large-scale projects.",
      badge: "New"
    },
    {
      date: "2024-06-10",
      version: "v2.2.5",
      type: "Improvement",
      title: "Enhanced AI Upscaler",
      description: "Improved upscaling quality with new AI models. Now supporting 4x upscaling with better detail preservation.",
      badge: "Improved"
    },
    {
      date: "2024-06-05",
      version: "v2.2.0",
      type: "Feature",
      title: "Style Transfer Technology",
      description: "Apply artistic styles to existing images with our new style transfer feature. Transform photos into artwork instantly.",
      badge: "Beta"
    },
    {
      date: "2024-05-28",
      version: "v2.1.8",
      type: "Security",
      title: "Enhanced Security Measures",
      description: "Implemented additional security layers and improved data protection protocols for enterprise users.",
      badge: "Security"
    },
    {
      date: "2024-05-20",
      version: "v2.1.5",
      type: "Performance",
      title: "Faster Generation Times",
      description: "Reduced average generation time by 40% through optimized AI model serving and improved infrastructure.",
      badge: "Performance"
    },
    {
      date: "2024-05-15",
      version: "v2.1.0",
      type: "Feature",
      title: "Mobile App Launch",
      description: "WordToImage is now available on iOS and Android with full feature parity to the web platform.",
      badge: "New"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Feature': return Star;
      case 'Performance': return Zap;
      case 'Security': return Shield;
      default: return Calendar;
    }
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'New': return 'default';
      case 'Beta': return 'secondary';
      case 'Security': return 'destructive';
      case 'Performance': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOManager customConfig={{
        title: "What's New - Latest Updates & Features | WordToImage",
        description: "Stay updated with the latest WordToImage features, improvements, and updates. Discover new AI capabilities and platform enhancements.",
        keywords: ["WordToImage updates", "new features", "AI improvements", "platform updates", "release notes", "latest AI technology", "AI image generator changelog", "text to image feature updates"]
      }} />
      
      <Nav />
      
      <main className="pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What's New
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay up to date with the latest features, improvements, and updates to WordToImage
            </p>
          </div>

          <div className="space-y-8">
            {updates.map((update, index) => {
              const IconComponent = getTypeIcon(update.type);
              
              return (
                <div key={index} className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center shrink-0">
                      <IconComponent className="h-6 w-6 text-violet-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{update.title}</h3>
                        <Badge variant={getBadgeVariant(update.badge)}>{update.badge}</Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{update.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(update.date).toLocaleDateString()}</span>
                        </div>
                        <span>•</span>
                        <span>{update.version}</span>
                        <span>•</span>
                        <span className="capitalize">{update.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Roadmap Teaser */}
          <div className="mt-16 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We're working on exciting new features including real-time collaboration, 
                advanced prompt templates, and integration with popular design tools.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline">Real-time Collaboration</Badge>
                <Badge variant="outline">Prompt Templates</Badge>
                <Badge variant="outline">Design Tool Integration</Badge>
                <Badge variant="outline">Voice Commands</Badge>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WhatsNew;
