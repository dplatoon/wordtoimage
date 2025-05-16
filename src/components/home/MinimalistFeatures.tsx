
import { motion } from 'framer-motion';

// Note: These are imaginary components for now, but you'd replace them with actual lucide-react icons
import { Speed, Quality, EaseOfUse } from '@/components/icons/MinimalistIcons';

export const MinimalistFeatures = () => {
  const features = [
    {
      icon: <Speed className="h-12 w-12 text-indigo-600" />,
      title: "Lightning Fast",
      description: "Generate stunning images in seconds with our optimized AI algorithm"
    },
    {
      icon: <Quality className="h-12 w-12 text-purple-600" />,
      title: "Remarkable Quality",
      description: "Create high-resolution images with incredible detail and clarity"
    },
    {
      icon: <EaseOfUse className="h-12 w-12 text-pink-600" />,
      title: "Simple to Use",
      description: "Just type what you want to see and our AI handles the rest"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900">Why People Love Our AI</h2>
        <p className="mt-4 text-xl text-gray-600">Designed with simplicity and power in mind</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
