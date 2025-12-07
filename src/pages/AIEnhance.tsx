import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ImageEnhancer } from "@/components/ai-capabilities/ImageEnhancer";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Zap, Image, Wand2 } from "lucide-react";

// Sample before/after images for demo
const sampleComparisons = [
  {
    before: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=60",
    after: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=100",
    label: "Upscaled"
  }
];

export default function AIEnhance() {
  const { user } = useAuth();
  const [enhancedImage, setEnhancedImage] = useState<{ before: string; after: string } | null>(null);

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
        <div className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-10">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              AI Image Enhancer
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Transform your images with powerful AI capabilities. Upscale, denoise, 
              remove backgrounds, or edit with natural language prompts.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { label: "Upscale", icon: Zap },
                { label: "Denoise", icon: Image },
                { label: "Remove Background", icon: Wand2 },
                { label: "Style Transfer", icon: Sparkles },
                { label: "AI Edit", icon: Wand2 }
              ].map((feature) => (
                <motion.span 
                  key={feature.label}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <feature.icon className="w-4 h-4" />
                  {feature.label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Before/After Demo Section */}
        <section className="container mx-auto px-4 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="max-w-md mx-auto mb-12 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  See the Difference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BeforeAfterSlider
                  beforeImage={sampleComparisons[0].before}
                  afterImage={sampleComparisons[0].after}
                  beforeLabel="Original"
                  afterLabel="Enhanced"
                />
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Enhancer Component */}
        <section className="container mx-auto px-4 pb-16">
          <ImageEnhancer />
        </section>
      </main>
    </>
  );
}
