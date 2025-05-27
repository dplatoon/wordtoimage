
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    category: 'Plans & Billing',
    questions: [
      {
        q: 'Can I switch plans anytime?',
        a: 'Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle. When upgrading mid-cycle, you\'ll receive prorated credits immediately.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. For enterprise customers, we also offer invoicing and bank transfers.'
      },
      {
        q: 'Do you offer refunds?',
        a: 'We offer a 14-day money-back guarantee for all paid plans. If you\'re not satisfied with your subscription, contact our support team within 14 days for a full refund.'
      },
      {
        q: 'What happens to unused credits?',
        a: 'Unused credits expire at the end of each billing cycle and don\'t roll over. However, we send you notifications when you\'re running low so you can maximize your usage.'
      }
    ]
  },
  {
    category: 'Features & Usage',
    questions: [
      {
        q: 'What\'s the difference between Standard and HD resolution?',
        a: 'Standard resolution (1024x1024) is great for web use and social media. HD resolution (2048x2048) is perfect for print materials and professional projects. Pro users also get access to 4K resolution (4096x4096).'
      },
      {
        q: 'Can I use generated images commercially?',
        a: 'Pro and Business plans include full commercial usage rights. Free plan images can only be used for personal, non-commercial purposes. All commercial plans include proper licensing documentation.'
      },
      {
        q: 'How does the API access work?',
        a: 'API access allows you to integrate our image generation into your own applications. Pro plans get 1,000 API calls per month, while Business plans get 10,000 calls. Additional calls can be purchased as needed.'
      },
      {
        q: 'What kind of support do you provide?',
        a: 'Free users get community support through our forums. Pro users receive priority email support with 24-hour response times. Business users get dedicated account management and phone support.'
      }
    ]
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'Do you have a mobile app?',
        a: 'Currently, we\'re a web-based platform optimized for all devices. Our mobile web experience provides full functionality, and we\'re working on native mobile apps for 2024.'
      },
      {
        q: 'How fast is image generation?',
        a: 'Most images generate in 10-30 seconds. Pro and Business users get priority queue access for faster processing during peak times. Generation speed also depends on image complexity and resolution.'
      },
      {
        q: 'Can I integrate with other tools?',
        a: 'Yes! We offer integrations with popular design tools like Figma, Adobe Creative Suite, and Canva through our API. Business plans include priority support for custom integrations.'
      }
    ]
  }
];

export const EnhancedFAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="h-6 w-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our plans, features, and pricing. 
            Can't find what you're looking for? <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">Contact us</a>.
          </p>
        </div>

        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                {category.category}
              </h3>
              
              <div className="space-y-3">
                {category.questions.map((item, itemIndex) => {
                  const itemId = `${categoryIndex}-${itemIndex}`;
                  const isOpen = openItems.includes(itemId);
                  
                  return (
                    <div key={itemId} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between gap-4"
                        aria-expanded={isOpen}
                      >
                        <span className="font-medium text-gray-900 pr-4">{item.q}</span>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-6 bg-blue-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-4">
            Our support team is here to help you choose the right plan and get the most out of our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/help"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Browse Help Center
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
