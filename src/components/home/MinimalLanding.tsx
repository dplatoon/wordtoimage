
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const MinimalLanding = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    // Scroll to the image generation form
    const imageForm = document.querySelector('.image-generation-section');
    if (imageForm) {
      imageForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Text Column */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Turn Text into Stunning Images
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Use WordToImage's AI engine to generate high-quality visuals in seconds—no design skills required.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-medium"
          >
            Get Started Free
          </Button>
        </div>
        
        {/* Image Column */}
        <div className="flex-shrink-0 mt-8 md:mt-0">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://placehold.co/600x400/9b87f5/fff?text=WordToImage+Preview"
              alt="WordToImage App Preview"
              loading="lazy"
              className="w-full max-w-md h-auto rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/10"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Fast Generation',
                description: 'Get professional-quality images in under 10 seconds with our optimized AI engine.',
                icon: '⚡'
              },
              {
                title: 'HD Downloads',
                description: 'Download up to 10 images in HD quality perfect for social media, marketing, and more.',
                icon: '📥'
              },
              {
                title: 'Custom Styles',
                description: 'Apply unique artistic filters and styles to transform your text descriptions into art.',
                icon: '🎨'
              }
            ].map(feature => (
              <div key={feature.title} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MinimalLanding;
