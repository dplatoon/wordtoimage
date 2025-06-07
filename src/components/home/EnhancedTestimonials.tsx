
import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    content: "WordToImage has completely transformed how I create content for my social media. The AI understands exactly what I want and delivers stunning results every time.",
    author: "Sarah Johnson",
    role: "Content Creator",
    company: "Digital Marketing Agency",
    avatar: "/lovable-uploads/806c4eee-2b54-4f82-8d75-7bd3e7137f5c.png",
    rating: 5
  },
  {
    id: 2,
    content: "As a small business owner with no design skills, this tool has been a game-changer. I can create professional marketing materials in minutes instead of hours.",
    author: "Michael Chen",
    role: "Business Owner",
    company: "Local Restaurant Chain",
    avatar: "/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png",
    rating: 5
  },
  {
    id: 3,
    content: "The quality and speed of image generation is incredible. I've tried other AI tools, but nothing comes close to the consistency and creativity of WordToImage.",
    author: "Emily Rodriguez",
    role: "Graphic Designer",
    company: "Creative Studio",
    avatar: "/lovable-uploads/c0cd939b-5fe6-4732-af93-ee61f070b689.png",
    rating: 5
  }
];

export const EnhancedTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loved by Creators Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our users are saying about their experience with WordToImage
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-fade-in">
            <div className="flex items-start mb-6">
              <Quote className="h-8 w-8 text-blue-500 mr-4 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  "{testimonials[currentIndex].content}"
                </blockquote>
              </div>
            </div>

            <div className="flex items-center">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].author}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <div className="font-semibold text-gray-900">
                  {testimonials[currentIndex].author}
                </div>
                <div className="text-gray-600 text-sm">
                  {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="bg-white shadow-lg hover:shadow-xl"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="bg-white shadow-lg hover:shadow-xl"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
