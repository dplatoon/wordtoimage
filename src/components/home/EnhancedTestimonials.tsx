
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Content Creator',
    company: 'Digital Marketing Pro',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    text: 'WordToImage has completely transformed my content creation process. I can now generate professional-quality visuals in seconds instead of spending hours on design.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=300&h=200&fit=crop'
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Game Developer',
    company: 'Indie Studios',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    text: 'The quality and speed of image generation is incredible. I use it for concept art, character designs, and environment sketches. It has become an essential tool in my workflow.',
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=300&h=200&fit=crop'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    title: 'Marketing Director',
    company: 'Tech Startup',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    text: 'Our social media engagement increased by 300% after we started using AI-generated images. The variety of styles and quality is outstanding.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop'
  }
];

export const EnhancedTestimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-ai-dark to-ai-surface relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-ai-neon/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-ai-purple/5 rounded-full blur-3xl"></div>
      </div>

      <div className="content-container relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-ai-neon/20 border border-ai-neon/30 text-ai-neon text-sm font-medium mb-4">
            <Star className="w-4 h-4 mr-2" />
            What Our Users Say
          </div>
          
          <h2 className="section-title text-white mb-6">
            Trusted by <span className="text-gradient-neon">Creative Professionals</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of creators, marketers, and artists who are already transforming 
            their workflows with AI-powered image generation.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="h-full"
            >
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 h-full hover:bg-white/15 transition-all duration-500 hover:scale-105">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-ai-neon" />
                  </div>
                  
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <blockquote className="text-white leading-relaxed mb-6 flex-grow">
                    "{testimonial.text}"
                  </blockquote>
                  
                  {/* Generated Image Example */}
                  {testimonial.image && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                      <img 
                        src={testimonial.image} 
                        alt="AI-generated example"
                        className="w-full h-32 object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-ai-neon/50"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="w-12 h-12 rounded-full bg-ai-accent text-ai-dark flex items-center justify-center font-bold text-lg hidden">
                        <User className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-ai-accent text-sm">{testimonial.title}</div>
                      <div className="text-gray-400 text-xs">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Stats */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-ai-neon mb-2">50K+</div>
              <div className="text-gray-300 text-sm">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-ai-purple mb-2">1M+</div>
              <div className="text-gray-300 text-sm">Images Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-ai-coral mb-2">4.9/5</div>
              <div className="text-gray-300 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-ai-accent mb-2">99.9%</div>
              <div className="text-gray-300 text-sm">Uptime</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
