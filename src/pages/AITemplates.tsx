
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Search, Filter, Star, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SEOManager } from '@/components/seo/SEOManager';

const AITemplates = () => {
  const templateCategories = [
    "Social Media", "Marketing", "Art & Design", "Photography", "Abstract", "Nature"
  ];

  const templates = [
    { id: 1, title: "Cyberpunk City", category: "Art & Design", downloads: "12k", rating: 4.8 },
    { id: 2, title: "Product Photography", category: "Photography", downloads: "8k", rating: 4.9 },
    { id: 3, title: "Instagram Post", category: "Social Media", downloads: "15k", rating: 4.7 },
    { id: 4, title: "Abstract Geometry", category: "Abstract", downloads: "6k", rating: 4.6 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOManager customConfig={{
        title: "AI Image Templates - Ready-to-Use Prompts | WordToImage",
        description: "Browse thousands of AI image templates and prompts. Professional designs for social media, marketing, art, and more. Start creating instantly.",
        keywords: ["AI image templates", "prompt templates", "social media templates", "marketing graphics", "AI art prompts"]
      }} />
      
      <Nav />
      
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI Image Templates
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional templates and prompts to kickstart your creative projects
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search templates..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {templateCategories.map((category) => (
              <Button key={category} variant="outline" size="sm">
                {category}
              </Button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
                <div className="aspect-square bg-gradient-to-br from-violet-100 to-indigo-100 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-violet-200 rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Preview</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{template.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{template.category}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4 text-gray-400" />
                      <span>{template.downloads}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AITemplates;
