
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does AI image generation work?",
      answer: "Our AI uses advanced machine learning models trained on millions of images to understand and create visuals from text descriptions. Simply describe what you want to see, and our AI will generate a unique image based on your prompt."
    },
    {
      question: "What image formats and sizes are available?",
      answer: "We support multiple formats including PNG, JPG, and WebP. You can generate images in various resolutions from 512x512 up to 4K (4096x4096) depending on your plan. All images are high-quality and suitable for both digital and print use."
    },
    {
      question: "Can I use the generated images commercially?",
      answer: "Yes! With our Pro and Enterprise plans, you get full commercial rights to use the generated images for business purposes, marketing, products, and more. Free plan images are for personal use only."
    },
    {
      question: "How long does it take to generate an image?",
      answer: "Most images are generated in 3-10 seconds. Pro users get priority processing for even faster generation times. The exact time depends on image complexity and current server load."
    },
    {
      question: "What makes WordToImage different from other AI generators?",
      answer: "We focus on ease of use, quality, and variety. Our platform offers 50+ unique AI styles, intuitive prompting, and consistently high-quality results. Plus, we're constantly updating our models for better performance."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with the service, contact our support team for a full refund within 30 days of purchase."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Got questions? We've got answers. Here are the most common questions about our AI image generator.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-indigo-600" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you get the most out of WordToImage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Contact Support
            </a>
            <a
              href="mailto:help@wordtoimage.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors duration-200"
            >
              Send Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
