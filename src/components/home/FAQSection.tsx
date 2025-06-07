
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: "How does the AI image generation work?",
    answer: "Our AI uses advanced machine learning models trained on millions of images to understand the relationship between text descriptions and visual content. Simply describe what you want to see, and our AI will generate a unique image based on your prompt."
  },
  {
    question: "What image formats and sizes are supported?",
    answer: "We support multiple formats including PNG, JPG, and WebP. Images can be generated in various sizes from social media formats (1080x1080) to high-resolution prints (up to 4K). You can specify dimensions in your prompt or choose from preset sizes."
  },
  {
    question: "Can I use the generated images commercially?",
    answer: "Yes! All images generated through WordToImage come with full commercial usage rights. You can use them for marketing materials, websites, social media, print materials, and any other commercial purposes without additional licensing fees."
  },
  {
    question: "How many images can I generate?",
    answer: "Our free plan includes 10 image generations per month. Paid plans offer unlimited generations with various features like higher resolution, priority processing, and advanced style controls. Check our pricing page for detailed plan comparisons."
  },
  {
    question: "What makes WordToImage different from other AI generators?",
    answer: "WordToImage focuses on ease of use, consistent quality, and fast generation times. Our AI is specifically optimized for understanding natural language prompts and delivering professional-quality results in under 10 seconds."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about WordToImage
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-gray-500 transition-transform duration-200",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </div>
              </button>
              
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};
