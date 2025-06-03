
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Rocket, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageSEO } from '@/components/seo/PageSEO';
import { ContentBreadcrumbs } from '@/components/seo/ContentBreadcrumbs';

const updates = [
  {
    date: "June 3, 2025",
    title: "Enhanced SEO and Performance Optimizations",
    description: "We've implemented comprehensive SEO improvements, updated all meta tags, and optimized page loading speeds across the entire platform.",
    tag: "Enhancement",
    icon: Rocket
  },
  {
    date: "April 15, 2025",
    title: "New Template Categories Released",
    description: "We've added 50+ new templates across 5 new categories, including podcast thumbnails, webinar promotions, and course materials.",
    tag: "Feature",
    icon: Tag
  },
  {
    date: "April 10, 2025",
    title: "Performance Improvements",
    description: "We've optimized our image generation engine, reducing average processing time by 40% and improving quality consistency.",
    tag: "Enhancement",
    icon: Rocket
  },
  {
    date: "April 5, 2025",
    title: "Mobile App Beta Launch",
    description: "Our mobile app is now available for beta testing on iOS and Android. Sign up to get early access and provide feedback.",
    tag: "Release",
    icon: FileText
  },
  {
    date: "March 28, 2025",
    title: "New Text Effects Library",
    description: "Introducing our new text effects library with 20+ stylized text options including gradients, shadows, and 3D effects.",
    tag: "Feature",
    icon: Tag
  }
];

const Updates = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        title="Product Updates - WordToImage AI Generator"
        description="Stay updated with the latest WordToImage features, improvements, and releases. Get the newest AI image generation capabilities and platform enhancements."
        keywords="product updates, new features, AI image generator updates, WordToImage releases, platform improvements"
        canonical="https://wordtoimage.com/updates"
        aiKeywords={['AI image generator updates', 'artificial intelligence platform updates', 'text to image new features']}
        voiceSearchQueries={['WordToImage latest updates', 'AI image generator new features', 'what\'s new in WordToImage']}
      />
      
      <Nav />
      
      <main className="pt-8 pb-16">
        <ContentBreadcrumbs />
        
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <Badge className="mb-3 bg-blue-100 hover:bg-blue-100 text-blue-800 border-none">
                Product Updates
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 font-poppins mb-6">
                Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Updates & Releases</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Stay informed about the newest features, improvements, and fixes to WordToImage.
              </p>
            </div>

            {/* Subscribe section */}
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">Get updates in your inbox</h3>
                <p className="text-sm text-gray-600">Subscribe to our newsletter to receive product updates directly to your email.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Updates Timeline */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Recent Updates</h2>
            
            <div className="space-y-8">
              {updates.map((update, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <update.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Badge className="mr-2" variant="secondary">
                          {update.tag}
                        </Badge>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {update.date}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{update.title}</h3>
                      <p className="text-gray-600">{update.description}</p>
                      <Button variant="link" className="p-0 h-auto mt-2 text-blue-600">
                        Read more
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button variant="outline" size="lg">
                View all updates
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Updates;
