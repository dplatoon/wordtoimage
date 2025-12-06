import { Helmet } from "react-helmet-async";
import { ImageEnhancer } from "@/components/ai-capabilities/ImageEnhancer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function AIEnhance() {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>AI Image Enhancer - Upscale, Edit & Transform Images | Word to Image</title>
        <meta 
          name="description" 
          content="Enhance your images with AI. Upscale resolution, remove backgrounds, apply artistic styles, and edit images with natural language prompts." 
        />
        <link rel="canonical" href="https://wordtoimage.online/ai-enhance" />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">AI Enhance</span>
            </div>

            {!user && (
              <Link to="/auth">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Image Enhancer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Transform your images with powerful AI capabilities. Upscale, denoise, 
            remove backgrounds, or edit with natural language prompts.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Upscale", "Denoise", "Remove Background", "Style Transfer", "AI Edit"].map((feature) => (
              <span 
                key={feature}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </section>

        {/* Enhancer Component */}
        <section className="container mx-auto px-4 pb-16">
          <ImageEnhancer />
        </section>
      </main>
    </>
  );
}
