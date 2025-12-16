import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Search, HelpCircle, FileText, MessageCircle, Mail, BookOpen, Palette, Code, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ContentBreadcrumbs } from "@/components/seo/ContentBreadcrumbs";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { PageSEO } from "@/components/seo/PageSEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToolPageBackground } from "@/components/backgrounds/ToolPageBackground";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("help");

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create my first AI image?",
          answer: "Simply enter a text description in the prompt box on our homepage, select your preferred style, and click 'Generate'. Your AI image will be created in seconds!"
        },
        {
          question: "What makes a good prompt?",
          answer: "Good prompts are descriptive and specific. Include details about style, colors, composition, and mood. For example: 'A majestic sunset over snow-capped mountains, oil painting style, warm orange and purple colors'."
        },
        {
          question: "How do I create an account?",
          answer: "Click 'Sign Up' in the top right corner, enter your email and password, or sign up with Google/Facebook. You'll get instant access to free daily generations."
        },
        {
          question: "What file formats are supported?",
          answer: "We generate high-quality PNG images by default. Pro users can also download in JPEG format and access 4K resolution outputs."
        }
      ]
    },
    {
      category: "Account & Billing",
      questions: [
        {
          question: "How do I upgrade to Pro?",
          answer: "Visit our Pricing page and select the Pro plan. You'll get unlimited generations, 4K output, batch processing, and priority support."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes! You can cancel your Pro subscription at any time from your account settings. Your access continues until the end of your billing period."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various local payment methods depending on your region."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 30-day money-back guarantee for Pro subscriptions. If you're not satisfied, contact our support team for a full refund."
        }
      ]
    },
    {
      category: "Features & Usage",
      questions: [
        {
          question: "How many images can I generate per day?",
          answer: "Free users get 5 images per day. Pro users enjoy unlimited generations with no daily limits."
        },
        {
          question: "Can I use images commercially?",
          answer: "Yes! All generated images come with full commercial usage rights. You can use them in business projects, marketing, products, and any commercial application."
        },
        {
          question: "How do I access different art styles?",
          answer: "Browse our Style Gallery to see all 50+ available styles. You can filter by category (realistic, artistic, digital art, etc.) and preview examples."
        },
        {
          question: "What is batch generation?",
          answer: "Batch generation (Pro feature) allows you to create multiple variations of the same prompt or generate several different prompts simultaneously, saving time for bulk projects."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "Why is my image generation slow?",
          answer: "Generation times depend on complexity and server load. Most images generate in 10-30 seconds. Pro users get priority processing for faster results."
        },
        {
          question: "My image didn't match my prompt. What happened?",
          answer: "AI interpretation can vary. Try being more specific in your prompts, use style keywords, or check our Prompt Guide for optimization tips."
        },
        {
          question: "How do I report inappropriate content?",
          answer: "Use the report button on any image or contact our support team immediately. We have strict content policies and take reports seriously."
        },
        {
          question: "Can I edit generated images?",
          answer: "Pro users get access to basic editing tools. For advanced editing, we recommend downloading your images and using professional software like Photoshop or GIMP."
        }
      ]
    }
  ];

  const resourceTabs = [
    {
      id: "blog",
      label: "Blog",
      icon: FileText,
      description: "Latest AI art insights and tutorials",
      path: "/blog"
    },
    {
      id: "tutorials",
      label: "Tutorials", 
      icon: BookOpen,
      description: "Step-by-step guides and how-tos",
      path: "/tutorials"
    },
    {
      id: "design-tips",
      label: "Design Tips",
      icon: Palette,
      description: "Professional design principles",
      path: "/design-tips"
    },
    {
      id: "help",
      label: "Help Center",
      icon: HelpCircle,
      description: "FAQ and troubleshooting",
      path: "/help"
    },
    {
      id: "api",
      label: "API Docs",
      icon: Code,
      description: "Developer documentation",
      path: "/api"
    }
  ];

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <ToolPageBackground variant="green" />
      
      <PageSEO
        title="Help Center - AI Image Generation Support & FAQ"
        description="Get help with AI image generation. Find answers to common questions about WordToImage features, troubleshooting, and support resources."
        keywords="AI image help, WordToImage support, AI art FAQ, text-to-image help, AI generator troubleshooting"
        aiKeywords={[
          'AI image generation help',
          'WordToImage FAQ',
          'AI art support',
          'text-to-image troubleshooting',
          'AI generator customer service'
        ]}
        voiceSearchQueries={[
          'how to get help with AI images',
          'WordToImage customer support',
          'AI art generator not working',
          'how to contact WordToImage support'
        ]}
      />
      
      <Nav />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        <ContentBreadcrumbs />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl mb-4">Help Center</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions or get support for AI image generation
          </p>
        </div>

        {/* Resource Navigation Tabs */}
        <div className="bg-card/30 backdrop-blur-xl rounded-xl border border-primary/20 mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-background/50 p-1 rounded-t-xl">
              {resourceTabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex items-center space-x-2 py-3 px-4 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-sm text-muted-foreground"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="p-6">
              {resourceTabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <TabsContent key={tab.id} value={tab.id} className="mt-0">
                    <div className="text-center py-8">
                      <IconComponent className="h-12 w-12 mx-auto text-primary mb-4" />
                      <h3 className="text-2xl font-semibold text-foreground mb-2">{tab.label}</h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{tab.description}</p>
                      {tab.id === 'help' ? (
                        <div className="text-left">
                          <div className="max-w-2xl mx-auto mb-8">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                              <Input 
                                type="text" 
                                placeholder="Search help articles and FAQs..." 
                                className="pl-10 py-3 text-base bg-background/50 border-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link to={tab.path}>
                          <Button variant="neon">
                            Visit {tab.label}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>
        </div>

        {/* Quick Help Cards - Only show when on help tab */}
        {activeTab === 'help' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl border border-primary/20 hover:border-primary/40 hover:shadow-neon transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <HelpCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Quick Start Guide</h3>
                </div>
                <p className="text-muted-foreground mb-4">Learn the basics of AI image generation in under 5 minutes</p>
                <Button variant="glass" className="w-full">Get Started</Button>
              </div>
              
              <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl border border-primary/20 hover:border-primary/40 hover:shadow-neon transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Community Support</h3>
                </div>
                <p className="text-muted-foreground mb-4">Connect with other users and share your creations</p>
                <Link to="/community">
                  <Button variant="glass" className="w-full">Join Community</Button>
                </Link>
              </div>
              
              <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl border border-primary/20 hover:border-primary/40 hover:shadow-neon transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Contact Support</h3>
                </div>
                <p className="text-muted-foreground mb-4">Get personalized help from our support team</p>
                <Link to="/contact-support">
                  <Button variant="neon" className="w-full">Contact Us</Button>
                </Link>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-card/30 backdrop-blur-xl rounded-xl border border-primary/20 p-8">
              <h2 className="text-3xl font-bold text-center text-foreground mb-8">Frequently Asked Questions</h2>
              
              {searchQuery && (
                <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-foreground">
                    {filteredFAQs.reduce((total, category) => total + category.questions.length, 0)} results found for "{searchQuery}"
                  </p>
                </div>
              )}

              <div className="space-y-8">
                {(searchQuery ? filteredFAQs : faqData).map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h3 className="text-xl font-semibold mb-4 text-foreground border-b border-primary/20 pb-2">
                      {category.category}
                    </h3>
                    <Accordion type="single" collapsible className="space-y-2">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem 
                          key={faqIndex} 
                          value={`${categoryIndex}-${faqIndex}`}
                          className="border border-primary/20 rounded-lg px-6 bg-background/30"
                        >
                          <AccordionTrigger className="text-left hover:no-underline py-4">
                            <span className="font-medium text-foreground">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>

              {searchQuery && filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try different keywords or browse our categories above
                  </p>
                  <Button variant="glass" onClick={() => setSearchQuery("")}>Clear Search</Button>
                </div>
              )}
            </div>

            {/* Contact Support Section */}
            <div className="mt-12 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl p-8 text-center border border-primary/30">
              <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-semibold text-foreground mb-2">Still need help?</h3>
              <p className="mb-6 max-w-2xl mx-auto text-muted-foreground">
                Our support team is ready to assist you with any questions or issues. 
                We typically respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact-support">
                  <Button variant="neon">
                    Contact Support
                  </Button>
                </Link>
                <Link to="/community">
                  <Button variant="glass">
                    Join Community
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}

        <RelatedContent currentPath="/help" />
      </main>
      <Footer />
    </div>
  );
};

export default Help;
