
import { useState } from "react";
import { ResourcePageTemplate } from "@/components/templates/ResourcePageTemplate";
import { Search, HelpCircle, FileText, MessageCircle, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "Getting Started",
      questions: [
        "How do I create my first image?",
        "What file formats are supported?",
        "How do I create an account?"
      ]
    },
    {
      title: "Account & Billing",
      questions: [
        "How do I upgrade my plan?",
        "Can I cancel my subscription?",
        "What payment methods are accepted?"
      ]
    },
    {
      title: "Features & Usage",
      questions: [
        "How many images can I generate per day?",
        "Can I download my creation history?",
        "How do I use templates?"
      ]
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <ResourcePageTemplate
      title="Help Center"
      description="Get help with AI image generation. Find answers to common questions about WordToImage features, troubleshooting, and support resources."
      seoTitle="Help Center - AI Image Generation Support & FAQ"
      seoDescription="Get help with AI image generation. Find answers to common questions about WordToImage features, troubleshooting, and support resources."
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
      currentPath="/help"
      badge="Support Hub"
    >
      {/* Enhanced search section with accessibility */}
      <section 
        className="max-w-2xl mx-auto mb-12"
        aria-labelledby="search-heading"
        role="search"
      >
        <h2 id="search-heading" className="sr-only">Search help articles</h2>
        <form onSubmit={handleSearchSubmit} className="relative">
          <label htmlFor="help-search" className="sr-only">
            Search for help articles and frequently asked questions
          </label>
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            aria-hidden="true"
          />
          <Input 
            id="help-search"
            type="text" 
            placeholder="Search for help..." 
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-describedby="search-description"
          />
          <div id="search-description" className="sr-only">
            Enter keywords to search through our help articles and FAQ
          </div>
        </form>
      </section>
      
      {/* Enhanced help options grid with accessibility */}
      <section 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        aria-labelledby="help-options-heading"
      >
        <h2 id="help-options-heading" className="sr-only">Help and support options</h2>
        
        <article className="bg-blue-50 p-6 rounded-lg border border-blue-100 flex flex-col items-center text-center">
          <HelpCircle 
            className="h-12 w-12 text-blue-600 mb-4" 
            aria-hidden="true"
          />
          <h3 className="text-xl font-semibold mb-2">FAQ</h3>
          <p className="text-gray-600 mb-4">Browse our frequently asked questions</p>
          <Button 
            variant="outline" 
            className="min-h-[44px]"
            aria-describedby="faq-description"
          >
            View FAQs
          </Button>
          <div id="faq-description" className="sr-only">
            Access frequently asked questions about AI image generation
          </div>
        </article>
        
        <article className="bg-green-50 p-6 rounded-lg border border-green-100 flex flex-col items-center text-center">
          <FileText 
            className="h-12 w-12 text-green-600 mb-4" 
            aria-hidden="true"
          />
          <h3 className="text-xl font-semibold mb-2">Documentation</h3>
          <p className="text-gray-600 mb-4">Explore detailed user guides and tutorials</p>
          <Button 
            variant="outline" 
            className="min-h-[44px]"
            aria-describedby="docs-description"
          >
            Read Docs
          </Button>
          <div id="docs-description" className="sr-only">
            Access comprehensive documentation and user guides
          </div>
        </article>
        
        <article className="bg-purple-50 p-6 rounded-lg border border-purple-100 flex flex-col items-center text-center">
          <MessageCircle 
            className="h-12 w-12 text-purple-600 mb-4" 
            aria-hidden="true"
          />
          <h3 className="text-xl font-semibold mb-2">Contact Support</h3>
          <p className="text-gray-600 mb-4">Get help from our customer support team</p>
          <Button 
            className="min-h-[44px]"
            aria-describedby="contact-description"
          >
            Contact Us
          </Button>
          <div id="contact-description" className="sr-only">
            Get direct help from our customer support team
          </div>
        </article>
      </section>
      
      {/* Enhanced FAQ section with accessibility */}
      <section aria-labelledby="faq-section-heading">
        <h2 id="faq-section-heading" className="text-2xl font-bold mb-6">
          Frequently Asked Questions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {faqCategories.map((category, index) => (
            <article 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6"
              aria-labelledby={`category-${index}-heading`}
            >
              <h3 
                id={`category-${index}-heading`}
                className="text-xl font-semibold mb-4"
              >
                {category.title}
              </h3>
              <nav aria-label={`${category.title} questions`}>
                <ul className="space-y-3" role="list">
                  {category.questions.map((question, qIndex) => (
                    <li key={qIndex}>
                      <a 
                        href="#" 
                        className="text-blue-600 hover:underline flex items-start group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1 -m-1"
                        aria-describedby={`question-${index}-${qIndex}-desc`}
                      >
                        <HelpCircle 
                          className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" 
                          aria-hidden="true"
                        />
                        <span className="min-h-[44px] flex items-center">{question}</span>
                        <span 
                          id={`question-${index}-${qIndex}-desc`} 
                          className="sr-only"
                        >
                          Click to view answer for {question}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </article>
          ))}
        </div>
      </section>
      
      {/* Enhanced contact section with accessibility */}
      <section 
        className="mt-16 bg-gray-50 rounded-lg p-8 text-center"
        aria-labelledby="contact-section-heading"
      >
        <Mail 
          className="h-12 w-12 mx-auto text-blue-600 mb-4" 
          aria-hidden="true"
        />
        <h2 id="contact-section-heading" className="text-2xl font-semibold mb-2">
          Can't find what you're looking for?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our support team is ready to assist you with any questions or issues you may have.
        </p>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 min-h-[44px] px-8"
          aria-describedby="email-support-desc"
        >
          Email Support
        </Button>
        <div id="email-support-desc" className="sr-only">
          Send an email to our support team for personalized assistance
        </div>
      </section>
    </ResourcePageTemplate>
  );
};

export default Help;
