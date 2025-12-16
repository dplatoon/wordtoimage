import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Type, Sparkles, Download, Zap, Shield, Image, CheckCircle, Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOManager } from "@/components/seo/SEOManager";
import { motion } from "framer-motion";
import { ToolPageBackground } from "@/components/backgrounds/ToolPageBackground";

const HowItWorks = () => {
  return (
    <>
      <SEOManager />
      
      <div className="min-h-screen bg-background relative overflow-hidden">
        <ToolPageBackground variant="cyan" />
        
        {/* Hero Section */}
        <section className="relative z-10 container mx-auto px-4 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
              <Zap className="w-4 h-4 mr-2" />
              Generate Images in 3 Simple Steps
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-foreground">How to Create </span>
              <span className="text-gradient-warm">Stunning AI Images</span>
              <br />
              <span className="text-foreground">with WordToImage</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Create professional AI-generated images in seconds with our simple 3-step process. 
              No design skills or experience required. Our AI understands natural language, so you can 
              describe exactly what you imagine and watch it come to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="neon" className="text-lg" asChild>
                <Link to="/text-to-image">
                  Start Creating Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="glass" className="text-lg" asChild>
                <Link to="/style-gallery">
                  <Play className="mr-2 h-5 w-5" />
                  View Examples
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Main Steps Section */}
        <section className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto space-y-20">
            
            {/* Step 1 */}
            <motion.div 
              className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl shadow-neon">
                    1
                  </div>
                  <Type className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Describe Your Image</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Type what you want to see in the text box. Be as detailed as possible - describe 
                  colors, style, mood, composition, and subject matter. Our AI understands natural 
                  language, so write exactly what you imagine. The more specific your description, 
                  the better your results will be.
                </p>
                <h3 className="font-semibold mb-4 text-foreground text-lg">Tips for Better Descriptions:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Include specific details:</strong> "sunset with orange and pink sky"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Mention artistic style:</strong> "in watercolor style" or "photorealistic"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Add mood:</strong> "serene", "dramatic", "joyful", "mysterious"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Specify composition:</strong> "close-up", "wide angle", "bird's eye view"</span>
                  </li>
                </ul>
              </div>
              <Card className="bg-card/30 backdrop-blur-xl border-primary/20 shadow-glass">
                <CardContent className="p-8">
                  <div className="bg-background/50 rounded-xl p-6 mb-6 border border-primary/10">
                    <p className="text-sm text-muted-foreground mb-3">Example Prompt:</p>
                    <p className="font-medium text-foreground leading-relaxed">
                      "A serene beach at sunset with palm trees, pink and orange sky, 
                      gentle waves, tropical paradise, photorealistic style"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-primary">
                    <Sparkles className="h-5 w-5" />
                    <p className="text-sm">The more specific your description, the better your results!</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="order-2 md:order-1">
                <Card className="bg-card/30 backdrop-blur-xl border-primary/20 shadow-glass">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-2 gap-4">
                      {['Realistic', 'Cartoon', 'Anime', 'Watercolor', 'Oil Painting', 'Digital Art'].map((style) => (
                        <div key={style} className="bg-background/50 rounded-xl p-4 text-center border border-primary/10 hover:border-primary/30 transition-colors">
                          <Sparkles className="h-6 w-6 mx-auto mb-2 text-primary" />
                          <p className="text-sm font-medium text-foreground">{style}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-6 text-center">
                      Choose from 50+ artistic styles to match your vision
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl shadow-neon">
                    2
                  </div>
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Customize Your Style</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Select from over 50 artistic styles to match your vision. Choose realistic for 
                  photo-like images, cartoon for playful designs, anime for manga-style art, or 
                  watercolor for soft artistic effects. Each style is carefully tuned to deliver 
                  the best possible results for your creative vision.
                </p>
                <h3 className="font-semibold mb-4 text-foreground text-lg">Popular Style Options:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Realistic:</strong> Photographic quality, perfect for marketing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Cartoon:</strong> Fun and playful, great for social media</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Anime:</strong> Japanese manga style characters and scenes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Oil Painting:</strong> Classic fine art aesthetic</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl shadow-neon">
                    3
                  </div>
                  <Download className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Generate & Download</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Click the generate button and watch as our AI creates your image in under 2 seconds. 
                  If you want variations, regenerate for different interpretations. Download in multiple 
                  formats and resolutions when satisfied. Each generation is slightly different, so try 
                  3-4 variations before choosing your favorite.
                </p>
                <h3 className="font-semibold mb-4 text-foreground text-lg">Download Options:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">PNG:</strong> Best quality, transparent background support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">JPG:</strong> Smaller file size, perfect for web</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">WebP:</strong> Modern format, great compression</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">4K Resolution:</strong> Ultra high-res for print (paid plans)</span>
                  </li>
                </ul>
              </div>
              <Card className="bg-card/30 backdrop-blur-xl border-primary/20 shadow-glass">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="h-6 w-6 text-primary" />
                    <span className="font-semibold text-foreground text-lg">Generation Speed</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-background/50 rounded-xl border border-primary/10">
                      <span className="text-muted-foreground">Standard Quality</span>
                      <Badge className="bg-primary/20 text-primary border-0">~1-2 seconds</Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-background/50 rounded-xl border border-primary/10">
                      <span className="text-muted-foreground">High Quality</span>
                      <Badge className="bg-primary/20 text-primary border-0">~3-5 seconds</Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-background/50 rounded-xl border border-primary/10">
                      <span className="text-muted-foreground">4K Ultra HD</span>
                      <Badge className="bg-primary/20 text-primary border-0">~8-10 seconds</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Advanced Features Section */}
        <section className="relative z-10 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Advanced Features for Better Results
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Take your AI image generation to the next level with these powerful features
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Image,
                  title: "Image-to-Image",
                  description: "Upload a reference image and transform it into different styles while maintaining the composition. Perfect for creating variations of existing artwork."
                },
                {
                  icon: Shield,
                  title: "Negative Prompts",
                  description: "Specify what you DON'T want in your image for more precise control over the final result. Exclude unwanted elements for cleaner outputs."
                },
                {
                  icon: Sparkles,
                  title: "Batch Generation",
                  description: "Generate multiple variations at once to explore different creative directions quickly. Save time by creating 4-8 images simultaneously."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-card/30 backdrop-blur-xl border-primary/20 shadow-glass h-full hover:border-primary/40 transition-colors">
                    <CardContent className="pt-8 pb-8 px-6">
                      <feature.icon className="h-12 w-12 mb-4 text-primary" />
                      <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pro Tips Section */}
        <section className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Pro Tips for Better AI Images
              </h2>
              <p className="text-muted-foreground text-lg">
                Master these techniques to get consistently stunning results
              </p>
            </motion.div>
            
            <div className="space-y-6">
              {[
                {
                  number: "1",
                  title: "Start with Clear Subject Matter",
                  description: "Begin your prompt with the main subject. \"A golden retriever puppy\" is better than \"cute dog\" because it's more specific and gives the AI clear direction."
                },
                {
                  number: "2",
                  title: "Add Environment Details",
                  description: "Describe the setting and background. \"sitting in a sunny meadow with wildflowers\" gives context and improves composition dramatically."
                },
                {
                  number: "3",
                  title: "Include Lighting Instructions",
                  description: "Mention lighting for mood: \"golden hour lighting\", \"dramatic shadows\", \"soft natural light\", or \"neon glow\" can transform your image."
                },
                {
                  number: "4",
                  title: "Experiment with Iterations",
                  description: "Generate multiple versions and pick the best. Each generation is slightly different - try 3-4 variations before downloading your final image."
                },
                {
                  number: "5",
                  title: "Use Quality Descriptors",
                  description: "Add terms like \"highly detailed\", \"professional photography\", \"8k resolution\", \"award winning\" to boost image quality and detail."
                }
              ].map((tip, index) => (
                <motion.div
                  key={tip.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-card/30 backdrop-blur-xl border-primary/20 shadow-glass hover:border-primary/40 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold">{tip.number}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2 text-foreground text-lg">{tip.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{tip.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to Create Your First AI Image?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Start generating stunning images in seconds with WordToImage. No credit card required.
              Join thousands of creators already using AI to bring their ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="neon" className="text-lg px-10" asChild>
                <Link to="/text-to-image">
                  Start Creating Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="glass" className="text-lg px-10" asChild>
                <Link to="/style-gallery">View Examples</Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default HowItWorks;
