
import { motion } from 'framer-motion';
import { Wand2, Palette, Download, Sparkles, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const HowItWorksDetailed = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      title: "Describe Your Vision",
      description: "Simply type what you want to see. Be as creative and detailed as you like.",
      details: "Use natural language to describe scenes, objects, styles, and moods. Our AI understands complex prompts.",
      icon: Wand2,
      color: "from-blue-500 to-cyan-500",
      example: "A majestic dragon soaring over a medieval castle at sunset"
    },
    {
      number: 2,
      title: "Choose Your Style",
      description: "Select from 50+ AI art styles or let our smart defaults create the perfect look.",
      details: "From photorealistic to anime, watercolor to cyberpunk - find the perfect artistic style for your vision.",
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      example: "Photorealistic • Digital Art • Anime • Oil Painting"
    },
    {
      number: 3,
      title: "Generate & Download",
      description: "Watch as AI creates your masterpiece in seconds. Download in high resolution.",
      details: "Get professional-quality images up to 4K resolution. Perfect for social media, presentations, or printing.",
      icon: Download,
      color: "from-green-500 to-emerald-500",
      example: "4K • HD • Standard • Mobile formats"
    }
  ];

  const features = [
    { icon: Sparkles, text: "Lightning fast generation" },
    { icon: Star, text: "Professional quality results" },
    { icon: Zap, text: "No design experience needed" }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            How It Works
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Create Stunning Images in 
            <span className="block mt-2 bg-gradient-to-r from-blue-900 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Three Simple Steps
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our AI transforms your ideas into professional-quality images faster than you can imagine.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0"></div>
              )}
              
              <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 z-10">
                {/* Step number */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} text-white font-bold text-lg mb-6 shadow-lg`}>
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${step.color} bg-opacity-10 mr-4`}>
                    <step.icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {step.description}
                </p>
                
                <p className="text-sm text-gray-500 mb-4">
                  {step.details}
                </p>
                
                {/* Example */}
                <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-teal-500">
                  <p className="text-sm text-gray-700 font-medium">
                    {step.example}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Why Choose Our AI Image Generator?
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <feature.icon className="h-5 w-5 text-teal-600" />
                </div>
                <span className="text-gray-700 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
          
          <Button
            size="lg"
            className="bg-teal-500 hover:bg-pink-500 text-white font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate('/text-to-image')}
          >
            <Wand2 className="h-5 w-5 mr-2" />
            Start Creating Now
          </Button>
          
          <p className="mt-4 text-sm text-gray-500">
            Free to try • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
};
