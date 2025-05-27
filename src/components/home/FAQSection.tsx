
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How does AI image generation work?",
    answer: "Our AI uses advanced machine learning models trained on millions of images to understand the relationship between text descriptions and visual elements. When you enter a prompt, the AI analyzes your words and generates unique images that match your description."
  },
  {
    question: "What image quality can I expect?",
    answer: "WordToImage generates high-resolution images up to 4K (4096x4096 pixels) suitable for both digital and print use. The quality is professional-grade, perfect for marketing materials, social media, presentations, and commercial projects."
  },
  {
    question: "Can I use generated images commercially?",
    answer: "Yes! All images generated with WordToImage come with full commercial usage rights. You can use them in business projects, marketing campaigns, products, and any commercial application without additional licensing fees or attribution requirements."
  },
  {
    question: "How fast is the image generation?",
    answer: "Most images are generated in under 10 seconds. Generation time may vary slightly based on complexity and current server load, but we prioritize speed without compromising quality."
  },
  {
    question: "What art styles are available?",
    answer: "We offer over 50 different art styles including photorealistic, digital art, watercolor, oil painting, sketch, anime, abstract, and many more. You can also mix styles or adjust intensity to create unique looks."
  },
  {
    question: "Is there a free version available?",
    answer: "Yes! We offer a generous free tier that includes daily image generations with full access to our basic features. You can upgrade to Pro for unlimited generations and advanced features."
  },
  {
    question: "How do I write effective prompts?",
    answer: "Be descriptive but clear. Include details about style, lighting, composition, and mood. For example: 'A serene mountain lake at sunset, watercolor style, with purple and orange clouds reflected in the water.' Our AI understands both simple and complex descriptions."
  },
  {
    question: "Can I edit or modify generated images?",
    answer: "While WordToImage focuses on generation, you can generate multiple variations of the same prompt to explore different interpretations. For editing, you can download images and use your preferred image editing software."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-ai-muted/20 to-ai-surface/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-ai-primary/20 rounded-full border border-ai-primary/30 mb-6">
            <HelpCircle className="h-5 w-5 text-ai-neon mr-2" />
            <span className="text-ai-neon font-medium">Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Got <span className="text-gradient-neon">Questions?</span>
          </h2>
          <p className="text-xl text-gray-300">
            Find answers to common questions about WordToImage and AI image generation.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="ai-card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left flex items-center justify-between p-2 focus:outline-none focus:ring-2 focus:ring-ai-primary/50 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                <ChevronDown 
                  className={`h-5 w-5 text-ai-neon transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
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
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <button className="btn-ai-outline">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
};
