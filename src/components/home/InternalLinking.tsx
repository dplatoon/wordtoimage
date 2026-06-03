import { Link } from 'react-router-dom';
import { ArrowRight, Book, Palette, Sparkles, HelpCircle } from 'lucide-react';

export const InternalLinking = () => {
  const linkSections = [
    {
      title: "Learn AI Art Creation",
      description: "Master the art of prompt engineering",
      links: [
        { to: "/prompt-guide", text: "AI Prompt Writing Guide", icon: Book },
        { to: "/ai-templates", text: "Ready-to-Use Templates", icon: Sparkles },
        { to: "/style-gallery", text: "Browse 100+ Art Styles", icon: Palette },
        { to: "/community-gallery", text: "Community Gallery", icon: Sparkles }
      ]
    },
    {
      title: "Get Help & Support",
      description: "Everything you need to know",
      links: [
        { to: "/help", text: "Help Center & FAQ", icon: HelpCircle },
        { to: "/tutorials", text: "Video Tutorials", icon: Sparkles },
        { to: "/contact", text: "Contact Support", icon: Book }
      ]
    }
  ];

  return (
    <section className="py-16 bg-background border-t border-white/5 relative overflow-hidden">
      {/* Ambient glow to match site theme */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Explore More AI Art Resources
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            New to AI art? Explore our comprehensive guides, templates, and tutorials to create stunning visuals like a pro
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {linkSections.map((section, index) => (
            <div
              key={index}
              className="bg-card/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-colors"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">{section.title}</h3>
              <p className="text-muted-foreground mb-6">{section.description}</p>

              <div className="space-y-3">
                {section.links.map((link, linkIndex) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={linkIndex}
                      to={link.to}
                      className="flex items-center justify-between p-3 bg-background/40 rounded-lg border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
                    >
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 text-primary mr-3" />
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {link.text}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Content Callout */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white shadow-neon-lg">
            <h3 className="text-2xl font-bold mb-4 text-white">Ready to Create Amazing AI Art?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Start with our free AI image generator and explore professional features with our Pro plan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/text-to-image"
                className="inline-flex items-center justify-center px-6 py-3 bg-white !text-violet-700 font-semibold rounded-lg hover:bg-white/90 transition-colors"
                style={{ color: '#6d28d9' }}
              >
                <span style={{ color: '#6d28d9' }}>Try Free Generator</span>
                <ArrowRight className="w-4 h-4 ml-2" style={{ color: '#6d28d9' }} />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/60 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white transition-colors"
              >
                View Pro Features
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};