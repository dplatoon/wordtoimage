
import React from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BlogPostTemplate } from '@/components/content/BlogPostTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { InternalLink } from '@/components/seo/InternalLink';
import { Badge } from '@/components/ui/badge';

const AIArtStylesBlogPost = () => {
  const blogData = {
    title: "7 Stunning AI Art Styles and How to Generate Them",
    excerpt: "Discover 7 popular AI-generated art styles, from anime to impressionism, with easy step-by-step prompts you can use instantly at WordToImage.com.",
    author: {
      name: "WordToImage Team",
      avatar: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png"
    },
    publishDate: "2025-01-20",
    readTime: "8 min read",
    category: "Tutorial",
    tags: ["AI Art Styles", "AI Image Generator", "Prompts", "Tutorial"],
    image: "/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png",
    slug: "ai-art-styles"
  };

  const artStyles = [
    {
      name: "Anime & Manga",
      description: "Create vibrant anime-style characters and scenes with bold colors and expressive features.",
      prompt: "anime style portrait of a warrior princess, vibrant colors, detailed eyes, cel-shaded, studio ghibli inspiration",
      image: "/lovable-uploads/3f1260dc-bc27-4e4b-8546-f12263780ee2.png"
    },
    {
      name: "Oil Painting",
      description: "Generate classical oil painting effects with rich textures and masterful brush strokes.",
      prompt: "oil painting of a mountain landscape at sunset, thick brush strokes, warm colors, renaissance style",
      image: "/lovable-uploads/4dbfcf42-6fbd-45a6-ae36-ab0f8a65cbd3.png"
    },
    {
      name: "Cyberpunk",
      description: "Create futuristic sci-fi scenes with neon lights, dark atmosphere, and high-tech elements.",
      prompt: "cyberpunk cityscape at night, neon lights, rain-soaked streets, futuristic architecture, blade runner aesthetic",
      image: "/lovable-uploads/5cc3bb2f-158e-4a9d-8ff5-0efe1c96ab93.png"
    },
    {
      name: "Watercolor Illustration",
      description: "Soft, flowing watercolor effects perfect for artistic and dreamy compositions.",
      prompt: "watercolor illustration of a cherry blossom tree, soft pastels, flowing paint effects, artistic style",
      image: "/lovable-uploads/53e8165c-d2db-4f0c-9509-f0e76e5c179f.png"
    },
    {
      name: "Pixel Art",
      description: "Retro 8-bit and 16-bit style graphics reminiscent of classic video games.",
      prompt: "pixel art character sprite, 16-bit style, retro gaming aesthetic, detailed animation frame",
      image: "/lovable-uploads/60da266c-4810-4f41-9449-ae54c2026373.png"
    },
    {
      name: "Abstract Expressionism",
      description: "Bold, emotional abstract compositions with dynamic colors and shapes.",
      prompt: "abstract expressionist painting, bold color splashes, dynamic composition, Jackson Pollock style",
      image: "/lovable-uploads/610669b3-849e-4ee2-a163-df90a0e6704e.png"
    },
    {
      name: "Realistic Portrait",
      description: "Photorealistic human portraits with incredible detail and lifelike features.",
      prompt: "realistic portrait of a confident woman, professional lighting, high detail, photographic quality",
      image: "/lovable-uploads/7f38eaf1-216c-4148-b05c-9a2f87de6ffc.png"
    }
  ];

  const content = `
    <div class="prose prose-lg max-w-none">
      <p class="text-xl leading-relaxed mb-8">
        AI-generated art has revolutionized creative expression, offering endless possibilities for artists, designers, and enthusiasts. 
        Whether you're a beginner or an experienced creator, understanding different art styles and how to generate them can unlock 
        your creative potential and produce stunning visual content.
      </p>

      <h2 class="text-3xl font-bold mt-12 mb-6">Why AI Art Styles Matter</h2>
      <p class="mb-6">
        Different art styles evoke different emotions and serve various purposes. From the bold, expressive nature of anime to the 
        sophisticated elegance of oil paintings, each style has its unique charm and application. Understanding how to generate 
        these styles with AI allows you to create precisely the visual content you need for any project.
      </p>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
        <p class="font-semibold text-blue-900 mb-2">💡 Pro Tip:</p>
        <p class="text-blue-800">
          The key to successful AI art generation lies in your prompts. Be specific about the style, mood, and details you want. 
          The more descriptive and precise your prompt, the better your results will be.
        </p>
      </div>

      <h2 class="text-3xl font-bold mt-12 mb-6">7 Popular AI Art Styles</h2>
      <p class="mb-8">
        Let's explore seven of the most popular and versatile AI art styles, complete with example prompts you can use right away.
      </p>
    </div>
  `;

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      
      <BlogPostTemplate {...blogData} content={content} />
      
      {/* Art Styles Grid */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {artStyles.map((style, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={style.image}
                  alt={`${style.name} AI art example`}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{style.name}</h3>
                  <Badge variant="secondary">#{index + 1}</Badge>
                </div>
                <p className="text-gray-600 mb-4">{style.description}</p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Example Prompt:</p>
                  <code className="text-sm text-blue-600 break-all">"{style.prompt}"</code>
                </div>
                
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <InternalLink to="/">Try This Style</InternalLink>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Tips Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Tips for Better AI Art Results</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold mb-2">Use Specific Adjectives</h3>
              <p className="text-sm text-gray-600">Include descriptive words like "vibrant," "moody," or "ethereal" to guide the AI's interpretation.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🖼️</span>
              </div>
              <h3 className="font-semibold mb-2">Reference Famous Artists</h3>
              <p className="text-sm text-gray-600">Mention artists like "Van Gogh style" or "Picasso inspired" for recognizable artistic influences.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💫</span>
              </div>
              <h3 className="font-semibold mb-2">Set the Mood</h3>
              <p className="text-sm text-gray-600">Include lighting and atmosphere details like "dramatic lighting" or "soft morning light."</p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Masterpiece?</h2>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
            Start experimenting with these AI art styles today. Create stunning visuals in seconds with our powerful AI image generator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <InternalLink to="/">Start Creating Now</InternalLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-violet-600">
              <InternalLink to="/prompt-guide">Learn More Techniques</InternalLink>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AIArtStylesBlogPost;
