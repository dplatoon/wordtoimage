
import { useState } from 'react';
import { ChevronDown, HelpCircle, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I start generating images?",
        answer: "Simply describe what you want to see in the text box and click 'Generate'. Our AI will create a unique image based on your description in seconds."
      },
      {
        question: "Do I need to create an account?",
        answer: "You can try our free tier without an account, but creating one unlocks more features, saves your generation history, and provides access to higher resolution images."
      }
    ]
  },
  {
    category: "Pricing & Plans",
    questions: [
      {
        question: "What's included in the free plan?",
        answer: "The free plan includes 10 image generations per month, basic resolution (1024x1024), and access to our core AI models. Perfect for trying out the service."
      },
      {
        question: "Can I change my plan anytime?",
        answer: "Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the next billing cycle."
      },
      {
        question: "Do you offer refunds?",
        answer: "We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact support for a full refund."
      }
    ]
  },
  {
    category: "Technical",
    questions: [
      {
        question: "What image formats do you support?",
        answer: "We generate images in PNG format by default, with options for JPG and WebP. All formats support up to 4K resolution on premium plans."
      },
      {
        question: "How long does image generation take?",
        answer: "Most images are generated within 5-15 seconds. Complex prompts or higher resolutions may take slightly longer."
      },
      {
        question: "Can I use the images commercially?",
        answer: "Yes! All generated images come with full commercial usage rights. You own the images you create and can use them for any purpose."
      }
    ]
  }
];

export const EnhancedFAQ = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isOpen = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    return openItems[key] || false;
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <HelpCircle className="h-4 w-4 mr-2" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our AI image generation platform
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div 
              key={categoryIndex} 
              className="animate-fade-in"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-6 bg-blue-600 rounded-full mr-3"></div>
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(categoryIndex, questionIndex)}
                      className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
                      aria-expanded={isOpen(categoryIndex, questionIndex)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h4>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-gray-500 transition-transform duration-200 flex-shrink-0",
                            isOpen(categoryIndex, questionIndex) && "rotate-180"
                          )}
                        />
                      </div>
                    </button>
                    
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isOpen(categoryIndex, questionIndex) 
                          ? "max-h-96 opacity-100" 
                          : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="px-6 pb-4 text-gray-700 leading-relaxed border-t border-gray-100">
                        <div className="pt-4">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our support team is here to help you get the most out of our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Contact Support
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  View Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
