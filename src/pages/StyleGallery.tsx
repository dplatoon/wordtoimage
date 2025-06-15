
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Eye, Heart, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOManager } from '@/components/seo/SEOManager';
import { Link } from 'react-router-dom';

const StyleGallery = () => {
  const styles = [
    { id: 1, name: "Photorealistic", description: "Ultra-realistic photography style", likes: 2341 },
    { id: 2, name: "Digital Art", description: "Modern digital artwork style", likes: 1876 },
    { id: 3, name: "Oil Painting", description: "Classic oil painting technique", likes: 1532 },
    { id: 4, name: "Watercolor", description: "Soft watercolor painting style", likes: 1234 },
    { id: 5, name: "Cyberpunk", description: "Futuristic cyberpunk aesthetic", likes: 2987 },
    { id: 6, name: "Anime", description: "Japanese anime illustration style", likes: 3421 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOManager customConfig={{
        title: "AI Art Style Gallery - 50+ Artistic Styles | WordToImage",
        description: "Explore our collection of AI art styles. From photorealistic to anime, watercolor to cyberpunk. Find the perfect style for your AI image generation.",
        keywords: ["AI art styles", "image generation styles", "artistic styles", "AI art gallery", "digital art styles", "photorealistic style AI", "anime style generator", "cyberpunk art creator"]
      }} />
      
      <Nav />
      
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Style Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover 50+ artistic styles to transform your AI-generated images
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {styles.map((style) => (
              <div key={style.id} className="bg-white rounded-xl shadow-lg border overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-violet-100 to-indigo-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                       <img
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop"
                        alt={`Visual representation of ${style.name} AI art style`}
                        className="w-24 h-24 rounded-xl mx-auto mb-2 object-cover shadow-lg"
                        loading="lazy"
                      />
                      <p className="text-sm text-gray-600 font-semibold">{style.name} Style</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{style.name}</h3>
                  <p className="text-gray-600 mb-4">{style.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Heart className="h-4 w-4" />
                      <span>{style.likes.toLocaleString()}</span>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/text-to-image">
                        <Copy className="h-4 w-4 mr-2" />
                        Use Style
                      </Link>
                    </Button>
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

export default StyleGallery;
