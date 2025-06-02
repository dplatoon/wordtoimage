
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How does AI image generation work?",
    answer: "Our AI uses advanced machine learning models trained on millions of images to understand the relationship between text descriptions and visual elements. When you enter a prompt, the AI analyzes your words and generates unique images that match your description using neural networks and diffusion models.",
    keywords: ["AI image generation", "machine learning", "neural networks", "diffusion models"]
  },
  {
    question: "What is the best AI art generator in 2025?",
    answer: "WordToImage is among the top AI art generators, offering high-quality image generation with 50+ styles, 4K resolution output, and instant results. We provide both free and pro plans with commercial usage rights included.",
    keywords: ["best AI art generator", "AI art generator 2025", "high-quality AI images"]
  },
  {
    question: "Can I use AI generated images commercially?",
    answer: "Yes! All images generated with WordToImage come with full commercial usage rights. You can use them in business projects, marketing campaigns, products, and any commercial application without additional licensing fees or attribution requirements.",
    keywords: ["commercial AI images", "AI images for business", "commercial usage rights"]
  },
  {
    question: "How fast is AI image generation?",
    answer: "Most images are generated in under 10 seconds. Generation time may vary slightly based on complexity and current server load, but we prioritize speed without compromising quality using optimized AI models.",
    keywords: ["fast AI generation", "instant AI images", "AI generation speed"]
  },
  {
    question: "What art styles are available with AI?",
    answer: "We offer over 50 different AI art styles including photorealistic, digital art, watercolor, oil painting, sketch, anime, abstract, and many more. You can also mix styles or adjust intensity to create unique AI-generated looks.",
    keywords: ["AI art styles", "AI artistic styles", "digital art AI", "photorealistic AI"]
  },
  {
    question: "How to create AI images from text?",
    answer: "Simply enter a descriptive text prompt into WordToImage, select your preferred AI style, and click generate. Our AI will create unique images based on your description in seconds. Be specific about details like style, lighting, and composition for best AI results.",
    keywords: ["create AI images from text", "text to image AI", "AI image prompts"]
  },
  {
    question: "What are the best AI art prompts for beginners?",
    answer: "Start with clear, descriptive prompts like 'A serene mountain lake at sunset, watercolor style' or 'Modern city skyline, digital art, neon lights'. Include style, mood, lighting, and composition details. Our AI understands both simple and complex descriptions.",
    keywords: ["AI art prompts", "AI prompts for beginners", "text prompts for AI"]
  },
  {
    question: "Can AI generate images for social media marketing?",
    answer: "Absolutely! WordToImage is perfect for creating AI-generated social media content, Instagram posts, Facebook ads, LinkedIn graphics, and marketing materials. All images come with commercial rights for business use.",
    keywords: ["AI images for social media", "AI marketing images", "AI graphics for Instagram"]
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Enhanced structured data for FAQ
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-ai-muted/20 to-ai-surface/20">
      {/* Enhanced SEO structured data */}
      <script type="application/ld+json">
        {JSON.stringify(faqStructuredData)}
      </script>
      
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
            <span className="text-ai-neon font-medium">AI Image Generation FAQ</span>
          </div>
          
          <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold mb-6">
            Got <span className="text-gradient-neon">Questions?</span>
          </h2>
          <p className="text-xl text-gray-300">
            Find answers to common questions about AI image generation and WordToImage features.
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
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left flex items-center justify-between p-2 focus:outline-none focus:ring-2 focus:ring-ai-primary/50 rounded-lg"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 
                  className="text-lg font-semibold text-white pr-4"
                  itemProp="name"
                >
                  {faq.question}
                </h3>
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
                    id={`faq-answer-${index}`}
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div className="pt-4 pb-2">
                      <p 
                        className="text-gray-300 leading-relaxed"
                        itemProp="text"
                      >
                        {faq.answer}
                      </p>
                      {/* Hidden keywords for SEO */}
                      <div className="sr-only">
                        {faq.keywords.join(', ')}
                      </div>
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
          <p className="text-gray-400 mb-4">Still have questions about AI image generation?</p>
          <button className="btn-ai-outline">
            Contact AI Support
          </button>
        </motion.div>
      </div>
    </section>
  );
};
