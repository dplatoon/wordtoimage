
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Play, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOManager } from '@/components/seo/SEOManager';

const VideoTutorials = () => {
  const tutorials = [
    {
      id: 1,
      title: "Getting Started with AI Image Generation",
      description: "Learn the basics of creating your first AI-generated images",
      duration: "5:30",
      views: "12.3k",
      level: "Beginner"
    },
    {
      id: 2,
      title: "Advanced Prompt Engineering Techniques",
      description: "Master the art of writing effective prompts for better results",
      duration: "12:45",
      views: "8.7k",
      level: "Advanced"
    },
    {
      id: 3,
      title: "Exploring Different Art Styles",
      description: "Discover how to create images in various artistic styles",
      duration: "8:20",
      views: "15.1k",
      level: "Intermediate"
    },
    {
      id: 4,
      title: "Batch Generation for Efficiency",
      description: "Learn how to generate multiple images efficiently",
      duration: "7:15",
      views: "6.2k",
      level: "Intermediate"
    },
    {
      id: 5,
      title: "AI Upscaling and Enhancement",
      description: "Improve your images with AI-powered upscaling",
      duration: "6:40",
      views: "9.8k",
      level: "Beginner"
    },
    {
      id: 6,
      title: "Commercial Use Best Practices",
      description: "Guidelines for using AI images in commercial projects",
      duration: "10:30",
      views: "4.5k",
      level: "Advanced"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOManager customConfig={{
        title: "AI Image Generation Video Tutorials | WordToImage",
        description: "Learn AI image generation with our comprehensive video tutorials. From beginner basics to advanced techniques. Master text-to-image AI.",
        keywords: ["AI image tutorials", "text to image videos", "AI art tutorials", "image generation guide", "AI tutorial videos"]
      }} />
      
      <Nav />
      
      <main className="pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Video Tutorials
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Master AI image generation with our step-by-step video guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <div key={tutorial.id} className="bg-white rounded-lg shadow-md border overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-violet-100 to-indigo-100 relative group-hover:scale-105 transition-transform">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="bg-white/90 text-violet-600 hover:bg-white shadow-lg">
                      <Play className="h-6 w-6 mr-2 fill-current" />
                      Play
                    </Button>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(tutorial.level)}`}>
                      {tutorial.level}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {tutorial.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{tutorial.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{tutorial.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Playlist */}
          <div className="mt-16 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Complete AI Art Mastery Course
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Follow our comprehensive playlist to go from beginner to expert in AI image generation. 
                Learn everything from basic prompts to advanced techniques.
              </p>
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
                <Play className="h-5 w-5 mr-2" />
                Start Full Course
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VideoTutorials;
