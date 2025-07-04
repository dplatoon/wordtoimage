import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Play, Clock, Users, BookOpen, Target, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';

const VideoTutorials = () => {
  const tutorials = [
    {
      id: 1,
      title: "Getting Started with AI Image Generation",
      description: "Learn the basics of creating your first AI-generated images with our beginner-friendly tutorial",
      duration: "5:30",
      views: "12.3k",
      level: "Beginner",
      uploadDate: "2024-01-15",
      videoUrl: "https://youtube.com/watch?v=example1",
      thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
      chapters: [
        { title: "Introduction to AI Art", timestamp: "0:00" },
        { title: "First Prompt Examples", timestamp: "1:30" },
        { title: "Understanding Styles", timestamp: "3:00" },
        { title: "Download and Use", timestamp: "4:45" }
      ]
    },
    {
      id: 2,
      title: "Advanced Prompt Engineering Techniques",
      description: "Master the art of writing effective prompts for better AI art results",
      duration: "12:45",
      views: "8.7k",
      level: "Advanced",
      uploadDate: "2024-01-20",
      videoUrl: "https://youtube.com/watch?v=example2",
      thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
      chapters: [
        { title: "Prompt Structure Basics", timestamp: "0:00" },
        { title: "Styling Keywords", timestamp: "3:15" },
        { title: "Negative Prompts", timestamp: "7:30" },
        { title: "Advanced Techniques", timestamp: "10:00" }
      ]
    },
    {
      id: 3,
      title: "Exploring Different Art Styles",
      description: "Discover how to create images in various artistic styles from anime to photorealistic",
      duration: "8:20",
      views: "15.1k",
      level: "Intermediate",
      uploadDate: "2024-01-25",
      videoUrl: "https://youtube.com/watch?v=example3",
      thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
      chapters: [
        { title: "Anime & Cartoon Styles", timestamp: "0:00" },
        { title: "Photorealistic Images", timestamp: "2:30" },
        { title: "Abstract & Digital Art", timestamp: "5:00" },
        { title: "Style Combinations", timestamp: "7:00" }
      ]
    },
    {
      id: 4,
      title: "Batch Generation for Efficiency",
      description: "Learn how to generate multiple AI images efficiently for productivity",
      duration: "7:15",
      views: "6.2k",
      level: "Intermediate",
      uploadDate: "2024-01-30",
      videoUrl: "https://youtube.com/watch?v=example4",
      thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
      chapters: [
        { title: "Batch Setup", timestamp: "0:00" },
        { title: "Template Creation", timestamp: "2:00" },
        { title: "Quality Control", timestamp: "4:30" },
        { title: "Export Options", timestamp: "6:00" }
      ]
    },
    {
      id: 5,
      title: "AI Upscaling and Enhancement",
      description: "Improve your AI-generated images with upscaling and enhancement techniques",
      duration: "6:40",
      views: "9.8k",
      level: "Beginner",
      uploadDate: "2024-02-05",
      videoUrl: "https://youtube.com/watch?v=example5",
      thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
      chapters: [
        { title: "When to Upscale", timestamp: "0:00" },
        { title: "Upscaling Options", timestamp: "1:45" },
        { title: "Enhancement Tools", timestamp: "3:30" },
        { title: "Before/After Examples", timestamp: "5:15" }
      ]
    },
    {
      id: 6,
      title: "Commercial Use Best Practices",
      description: "Guidelines for using AI images in commercial projects and licensing",
      duration: "10:30",
      views: "4.5k",
      level: "Advanced",
      uploadDate: "2024-02-10",
      videoUrl: "https://youtube.com/watch?v=example6",
      thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
      chapters: [
        { title: "Licensing Basics", timestamp: "0:00" },
        { title: "Commercial Rights", timestamp: "3:00" },
        { title: "Brand Guidelines", timestamp: "6:15" },
        { title: "Legal Considerations", timestamp: "8:45" }
      ]
    }
  ];

  const relatedTools = [
    { name: "AI Image Generator", href: "/text-to-image", description: "Create images from text" },
    { name: "Style Gallery", href: "/style-gallery", description: "Browse art styles" },
    { name: "Prompt Guide", href: "/prompt-guide", description: "Writing tips" },
    { name: "Batch Generator", href: "/batch-generator", description: "Generate multiple images" }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getRelatedLink = (id: number): { href: string; text: string } | null => {
    switch (id) {
      case 1: return { href: '/text-to-image', text: 'Try Generator' };
      case 2: return { href: '/prompt-guide', text: 'Read Guide' };
      case 3: return { href: '/style-gallery', text: 'See Styles' };
      case 4: return { href: '/batch-generator', text: 'Use Batch Tool' };
      case 5: return { href: '/ai-upscaler', text: 'Try Upscaler' };
      case 6: return { href: '/pricing', text: 'View Plans' };
      default: return null;
    }
  };

  const pageContent = {
    h1: "AI Image Generation Video Tutorials",
    h2Headings: [
      "Master AI Art with Step-by-Step Videos",
      "Complete AI Art Mastery Course",
      "Related Tools and Resources"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>AI Image Generation Video Tutorials | WordToImage</title>
        <meta name="description" content="Learn AI image generation with our comprehensive video tutorials. From beginner basics to advanced techniques. Master text-to-image AI with step-by-step guides." />
        <meta name="keywords" content="AI image tutorials, text to image videos, AI art tutorials, image generation guide, AI tutorial videos, learn prompt engineering, AI upscaling tutorial, how to use text to image" />
        <link rel="canonical" href="https://wordtoimage.com/video-tutorials" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "AI Image Generation Video Tutorial Collection",
            "description": "Comprehensive video tutorials for mastering AI image generation",
            "thumbnailUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
            "uploadDate": "2024-01-15",
            "duration": "PT60M",
            "contentUrl": "https://wordtoimage.com/video-tutorials",
            "embedUrl": "https://wordtoimage.com/video-tutorials",
            "publisher": {
              "@type": "Organization",
              "name": "WordToImage",
              "url": "https://wordtoimage.com"
            },
            "hasPart": tutorials.map(tutorial => ({
              "@type": "Clip",
              "name": tutorial.title,
              "description": tutorial.description,
              "url": tutorial.videoUrl,
              "duration": `PT${tutorial.duration.replace(':', 'M')}S`,
              "thumbnailUrl": tutorial.thumbnailUrl,
              "uploadDate": tutorial.uploadDate,
              "startOffset": 0
            }))
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Complete AI Art Mastery Course",
            "description": "Learn AI image generation from beginner to advanced level",
            "provider": {
              "@type": "Organization",
              "name": "WordToImage"
            },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "online",
              "instructor": {
                "@type": "Organization",
                "name": "WordToImage Team"
              }
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://wordtoimage.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Video Tutorials",
                "item": "https://wordtoimage.com/video-tutorials"
              }
            ]
          })}
        </script>
      </Helmet>
      <EnhancedSEOManager pageContent={pageContent} />
      
      <Nav />
      
      <main className="pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI Image Generation Video Tutorials
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Master AI image generation with our step-by-step video guides. From beginner basics to advanced prompt engineering.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <BookOpen className="w-4 h-4" />
                <span>6 Free Tutorials</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                <Target className="w-4 h-4" />
                <span>All Skill Levels</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                <Zap className="w-4 h-4" />
                <span>Step-by-Step</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Master AI Art with Step-by-Step Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorials.map((tutorial) => {
                  const relatedLink = getRelatedLink(tutorial.id);
                  return (
                    <div key={tutorial.id} className="bg-white rounded-lg shadow-md border overflow-hidden group hover:shadow-lg transition-shadow flex flex-col">
                      <div className="aspect-video bg-gray-200 relative group-hover:scale-105 transition-transform">
                        <img
                          src={tutorial.thumbnailUrl}
                          alt={`${tutorial.title} - AI tutorial video thumbnail`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                          {tutorial.duration}
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {tutorial.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {tutorial.description}
                        </p>
                        
                        {/* Video Chapters */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Chapters:</h4>
                          <div className="space-y-1">
                            {tutorial.chapters.slice(0, 3).map((chapter, index) => (
                              <div key={index} className="flex justify-between text-xs text-gray-500">
                                <span className="truncate mr-2">{chapter.title}</span>
                                <span className="shrink-0">{chapter.timestamp}</span>
                              </div>
                            ))}
                            {tutorial.chapters.length > 3 && (
                              <div className="text-xs text-gray-400">+{tutorial.chapters.length - 3} more chapters</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{tutorial.views} views</span>
                            </div>
                          </div>
                          {relatedLink && (
                            <Link to={relatedLink.href} className="font-semibold text-violet-600 hover:text-violet-700">
                              {relatedLink.text} →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Related Tools Sidebar */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools and Resources</h3>
              <div className="space-y-4">
                {relatedTools.map((tool, index) => (
                  <Link 
                    key={index}
                    to={tool.href} 
                    className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{tool.name}</h4>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                    <div className="flex items-center justify-end mt-2">
                      <ArrowRight className="w-4 h-4 text-violet-600" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Learning Path */}
              <div className="mt-8 p-4 bg-violet-50 rounded-lg">
                <h4 className="font-semibold text-violet-900 mb-2">Recommended Learning Path</h4>
                <ol className="text-sm text-violet-700 space-y-1">
                  <li>1. Getting Started (Beginner)</li>
                  <li>2. Art Styles (Intermediate)</li>
                  <li>3. Prompt Engineering (Advanced)</li>
                  <li>4. Batch Generation (Intermediate)</li>
                  <li>5. Commercial Use (Advanced)</li>
                </ol>
              </div>
            </div>
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