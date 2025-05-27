
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    category: 'Plans & Billing',
    questions: [
      {
        q: 'Can I upgrade or downgrade my plan anytime?',
        a: 'Yes! You can change plans instantly from your dashboard. When upgrading mid-cycle, you\'ll be charged the prorated difference immediately and get access to new features right away. When downgrading, the change takes effect at your next billing cycle, and you keep current features until then.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. Enterprise customers can also pay via bank transfer or purchase order with Net 30 terms.'
      },
      {
        q: 'What\'s your refund policy?',
        a: 'We offer a 14-day money-back guarantee for Pro plans and 30 days for Business plans. If you\'re not satisfied, contact support within the guarantee period for a full refund. Free plan users can always upgrade risk-free.'
      },
      {
        q: 'What happens if I exceed my monthly limits?',
        a: 'For Free users, generation stops until the next monthly reset. Pro and Business users can purchase additional generation packs ($5 for 100 images) or upgrade to a higher tier. We\'ll always notify you before you hit limits.'
      }
    ]
  },
  {
    category: 'Features & Usage Rights',
    questions: [
      {
        q: 'What\'s the difference between resolution options?',
        a: 'Standard (1024x1024) is perfect for social media and web use. HD (2048x2048) works great for presentations and print materials up to 8x10 inches. 4K (4096x4096) is ideal for large prints, billboards, or professional marketing materials.'
      },
      {
        q: 'Can I use generated images for commercial purposes?',
        a: 'Free plan images are for personal use only. Pro and Business plans include full commercial rights - you can use images in marketing, sell products with them, or include them in client work. Business plans also include resale rights for the images themselves.'
      },
      {
        q: 'How does API access work and what are the limits?',
        a: 'API access lets you integrate image generation into your own apps or workflows. Pro includes 1,000 API calls/month (roughly 1,000 images), Business includes 10,000 calls/month. Additional calls cost $0.02 each. Full API documentation and SDKs are provided.'
      },
      {
        q: 'What does "fair use policy" mean for unlimited plans?',
        a: 'Unlimited means no hard monthly limits for normal business use. Fair use means we don\'t allow bulk downloading for resale, server-to-server automation without API, or other abusive patterns. 99.9% of users never encounter any restrictions.'
      }
    ]
  },
  {
    category: 'Technical & Support',
    questions: [
      {
        q: 'What kind of support do you provide?',
        a: 'Free: Community forum with peer support. Pro: Priority email support with 24-hour response time on business days. Business: Phone and chat support with 4-hour response time, plus a dedicated account manager for onboarding and optimization.'
      },
      {
        q: 'How fast is image generation?',
        a: 'Standard images generate in 10-30 seconds. HD images take 30-60 seconds. 4K images take 1-2 minutes. Business users get priority queue access for 2x faster processing during peak hours (evenings and weekends).'
      },
      {
        q: 'Do you offer integrations with design tools?',
        a: 'Yes! We have plugins for Figma, Adobe Creative Suite, and Canva. Business plans include priority support for custom integrations. Our API also works with Zapier, Slack, and most workflow automation tools.'
      },
      {
        q: 'Is there a mobile app?',
        a: 'Our web app works perfectly on mobile browsers with full functionality. Native iOS and Android apps are launching in Q2 2024 with offline editing capabilities and will be included in all paid plans at no extra cost.'
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
            Get clear answers about our plans, features, and policies. Still have questions? 
            <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium ml-1">Contact our support team</a>.
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need help choosing the right plan?</h3>
          <p className="text-gray-600 mb-4">
            Our team can help you find the perfect plan for your needs and budget. We'll even set up your account and provide training.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule a Demo Call
            </a>
            <a
              href="mailto:support@wordtoimage.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Email Support Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
