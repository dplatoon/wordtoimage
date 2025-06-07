
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const detailedFeatures = [
  {
    category: "AI Generation",
    title: "State-of-the-Art AI Models",
    description: "Our platform uses the latest AI models including Stable Diffusion, DALL-E, and our proprietary enhancement algorithms to deliver stunning results.",
    benefits: [
      "Multiple AI model options for different use cases",
      "Continuous model updates and improvements",
      "Optimized for speed and quality",
      "Advanced prompt understanding"
    ],
    image: "/lovable-uploads/60da266c-4810-4f41-9449-ae54c2026373.png"
  },
  {
    category: "Professional Tools",
    title: "Advanced Editing Suite",
    description: "Go beyond basic generation with our comprehensive editing tools designed for professional creators and businesses.",
    benefits: [
      "Background replacement and removal",
      "Style transfer and blending",
      "Resolution upscaling up to 4K",
      "Batch processing capabilities"
    ],
    image: "/lovable-uploads/8398d1f3-db95-4f78-b05e-1fbba4750e81.png"
  },
  {
    category: "Business Features",
    title: "Enterprise-Ready Platform",
    description: "Built for businesses with features that scale from individual creators to large teams and organizations.",
    benefits: [
      "Team workspaces and user management",
      "API access with extensive documentation",
      "White-label options available",
      "Priority support and custom integrations"
    ],
    image: "/lovable-uploads/fa9c9164-9cf5-482f-9a30-662c41b9b386.png"
  }
];

export const DetailedFeaturesSection = () => {
  return (
    <section className="mobile-section">
      <div className="mobile-first-container">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="mobile-text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Detailed Feature Breakdown
          </h2>
          <p className="mobile-text-lg text-gray-600 max-w-3xl mx-auto">
            Dive deeper into the capabilities that make WordToImage the preferred choice 
            for creators, marketers, and developers worldwide.
          </p>
        </div>

        <div className="space-y-12 md:space-y-20">
          {detailedFeatures.map((feature, index) => (
            <div 
              key={index} 
              className={`mobile-grid mobile-grid-lg-2 gap-8 md:gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 rounded-full mobile-text-sm font-medium mb-4">
                    {feature.category}
                  </span>
                  <h3 className="mobile-text-xl md:text-3xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="mobile-text-base md:text-lg text-gray-600 mb-6">
                    {feature.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-6 md:mb-8">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="mobile-text-sm md:text-base text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild className="mobile-button-primary">
                  <Link to="/text-to-image">
                    Try This Feature
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} mobile-center`}>
                <div className="relative">
                  <img
                    src={feature.image}
                    alt={`${feature.title} demonstration`}
                    className="mobile-image rounded-lg shadow-xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mobile-card mt-12 md:mt-20 text-center">
          <h3 className="mobile-text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Ready to Experience These Features?
          </h3>
          <p className="mobile-text-base text-gray-600 mb-6">
            Start creating amazing AI-generated images today with our free plan.
          </p>
          <div className="mobile-stack md:flex md:items-center md:justify-center md:gap-4">
            <Button asChild className="mobile-button-primary">
              <Link to="/text-to-image">Start Creating Free</Link>
            </Button>
            <Button variant="outline" asChild className="mobile-button-secondary">
              <Link to="/pricing">View All Plans</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
