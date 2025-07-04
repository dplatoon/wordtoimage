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
        { to: "/style-gallery", text: "Browse 100+ Art Styles", icon: Palette }
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
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Explore More AI Art Resources
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            New to AI art? Explore our comprehensive guides, templates, and tutorials to create stunning visuals like a pro
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {linkSections.map((section, index) => (
            <div key={index} className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-6 border border-violet-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h3>
              <p className="text-gray-600 mb-6">{section.description}</p>
              
              <div className="space-y-3">
                {section.links.map((link, linkIndex) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={linkIndex}
                      to={link.to}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-violet-300 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 text-violet-600 mr-3" />
                        <span className="font-medium text-gray-900 group-hover:text-violet-600 transition-colors">
                          {link.text}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Content Callout */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Create Amazing AI Art?</h3>
            <p className="text-violet-100 mb-6 max-w-2xl mx-auto">
              Start with our free AI image generator and explore professional features with our Pro plan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/text-to-image"
                className="inline-flex items-center px-6 py-3 bg-white text-violet-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Try Free Generator
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
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