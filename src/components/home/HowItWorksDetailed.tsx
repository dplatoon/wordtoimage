
import { motion } from 'framer-motion';
import { Edit3, Zap, Download, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Edit3,
    title: "Enter Your Text Prompt",
    description: "Describe the image you want to create in natural language. Be as detailed or simple as you like - our AI understands both 'sunset' and 'vibrant sunset over snow-capped mountains with purple clouds'.",
    tip: "Pro tip: Include style descriptors like 'photorealistic', 'watercolor', or 'digital art' for better results."
  },
  {
    icon: Sparkles,
    title: "AI Magic Happens",
    description: "Our advanced AI processes your text using state-of-the-art machine learning models. Within seconds, your words are transformed into stunning visual concepts.",
    tip: "Our AI considers style, composition, lighting, and artistic elements automatically."
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Watch as your image appears in high quality. Generate multiple variations, adjust styles, or refine your prompt to get exactly what you envision.",
    tip: "Generate up to 4 variations at once to explore different interpretations."
  },
  {
    icon: Download,
    title: "Download & Use",
    description: "Download your images in high resolution for any purpose. Use them for social media, presentations, marketing materials, or personal projects.",
    tip: "All generated images are royalty-free for commercial and personal use."
  }
];

export const HowItWorksDetailed = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-ai-surface/30 to-ai-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="text-gradient-neon">WordToImage</span> Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your imagination into reality with our simple 4-step process. 
            From concept to creation in seconds - no design skills required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="ai-card text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-ai-neon rounded-full flex items-center justify-center text-ai-dark font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{step.description}</p>
              
              <div className="mt-4 p-3 bg-ai-primary/20 rounded-lg border border-ai-primary/30">
                <p className="text-sm text-ai-neon">{step.tip}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-ai-neon/20 to-ai-accent/20 rounded-full border border-ai-neon/30">
            <Sparkles className="h-5 w-5 text-ai-neon mr-2" />
            <span className="text-ai-neon font-medium">Ready to create your first AI image?</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
