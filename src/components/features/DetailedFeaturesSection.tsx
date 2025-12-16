
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { OptimizedImage } from '@/components/common/OptimizedImage';

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
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Detailed Feature Breakdown
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dive deeper into the capabilities that make WordToImage the preferred choice 
            for creators, marketers, and developers worldwide.
          </p>
        </div>

        <div className="space-y-20">
          {detailedFeatures.map((feature, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4 border border-primary/30">
                    {feature.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    {feature.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild variant="neon">
                  <Link to="/text-to-image">
                    Try This Feature
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} flex justify-center`}>
                <div className="relative">
                  <OptimizedImage
                    src={feature.image}
                    alt={`${feature.title} demonstration`}
                    className="w-full max-w-md rounded-lg shadow-neon border border-primary/20"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card/30 backdrop-blur-xl rounded-2xl p-8 mt-20 text-center border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Experience These Features?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start creating amazing AI-generated images today with our free plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="neon" size="lg">
              <Link to="/text-to-image">Start Creating Free</Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link to="/pricing">View All Plans</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
