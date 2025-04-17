
import { Heart, Users, Image } from 'lucide-react';

const features = [
  {
    name: 'Express Yourself',
    description: 'Share lovable moments through photos, quotes, or stories that inspire and uplift others.',
    icon: Image,
    color: 'bg-lovable-pink',
  },
  {
    name: 'Build Connections',
    description: 'Meet like-minded people or strengthen existing relationships through meaningful interactions.',
    icon: Users,
    color: 'bg-lovable-lavender',
  },
  {
    name: 'Positivity Gallery',
    description: 'Discover and share uplifting content that brings joy and positivity to your day.',
    icon: Heart,
    color: 'bg-lovable-peach',
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-lovable-softgray/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight font-poppins text-gray-900 sm:text-4xl">
            Why People Love <span className="bg-clip-text text-transparent bg-gradient-to-r from-lovable-rose to-lovable-pink">Lovable</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform is designed to help you create and share moments that matter, with people who matter.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div 
                key={feature.name} 
                className="relative lovable-card overflow-hidden group hover:translate-y-[-5px] transition-all duration-300"
              >
                <div className={`absolute top-0 left-0 w-full h-1 ${feature.color}`}></div>
                <div className={`inline-flex rounded-lg ${feature.color} bg-opacity-10 p-3`}>
                  <feature.icon className="h-6 w-6 text-lovable-rose" />
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-7 text-gray-900 font-poppins">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
