import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Play, Clock, BookOpen } from "lucide-react";
import { ContentBreadcrumbs } from "@/components/seo/ContentBreadcrumbs";
import { ContentNavigation } from "@/components/seo/ContentNavigation";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { PageSEO } from "@/components/seo/PageSEO";
import { ToolPageBackground } from "@/components/backgrounds/ToolPageBackground";

const Tutorials = () => {
  const tutorials = [
    {
      title: "Getting Started with WordToImage",
      duration: "5 min",
      level: "Beginner",
      description: "Learn the basics of converting text to images with our platform."
    },
    {
      title: "Advanced Image Customization",
      duration: "10 min",
      level: "Intermediate",
      description: "Discover how to fine-tune your generated images for perfect results."
    },
    {
      title: "Using Templates Effectively",
      duration: "7 min",
      level: "Beginner",
      description: "Get the most out of our pre-designed templates for quick results."
    },
    {
      title: "Creating Custom Backgrounds",
      duration: "12 min",
      level: "Advanced",
      description: "Learn to craft unique backgrounds for your text-to-image creations."
    },
    {
      title: "Bulk Image Generation",
      duration: "8 min",
      level: "Intermediate",
      description: "Efficiently create multiple images for your marketing campaigns."
    },
    {
      title: "Image Optimization for Social Media",
      duration: "9 min",
      level: "Intermediate",
      description: "Optimize your generated images for various social media platforms."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <ToolPageBackground variant="cyan" />
      
      <PageSEO
        title="AI Image Generation Tutorials - Step by Step Guides"
        description="Master AI image generation with our comprehensive tutorials. Learn how to create stunning AI art from text prompts with step-by-step guides for all skill levels."
        keywords="AI image tutorials, text to image guides, AI art tutorials, machine learning tutorials, AI image generation how-to"
        aiKeywords={[
          'AI image generation tutorials',
          'step by step AI art guide',
          'text-to-image tutorials',
          'AI art for beginners',
          'advanced AI image techniques'
        ]}
        voiceSearchQueries={[
          'how to generate AI images step by step',
          'AI art tutorial for beginners',
          'how to create better AI images',
          'what are the best AI art techniques'
        ]}
      />
      
      <Nav />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <ContentBreadcrumbs />
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">AI Art Tutorials</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Master AI image generation with our comprehensive step-by-step tutorials
          </p>
        </div>
        
        <ContentNavigation />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tutorials.map((tutorial, index) => (
            <div key={index} className="bg-card/30 backdrop-blur-xl rounded-xl overflow-hidden border border-primary/20 hover:border-primary/40 hover:shadow-neon transition-all duration-300">
              <div className="h-48 bg-background/50 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <div className="h-16 w-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30">
                  <Play className="h-8 w-8 text-primary" fill="currentColor" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{tutorial.title}</h3>
                <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="h-4 w-4 mr-1 text-primary" />
                    <span>{tutorial.duration}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <BookOpen className="h-4 w-4 mr-1 text-primary" />
                    <span>{tutorial.level}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <RelatedContent currentPath="/tutorials" />
      </main>
      <Footer />
    </div>
  );
};

export default Tutorials;
