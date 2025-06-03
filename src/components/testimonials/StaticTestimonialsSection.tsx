
import { Star } from 'lucide-react';

export const StaticTestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Digital Marketer",
      content: "WordToImage has revolutionized how I create content for social media. The quality is incredible!",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Blogger",
      content: "I can create stunning visuals for my blog posts in seconds. This tool is a game-changer.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Small Business Owner",
      content: "Perfect for creating marketing materials without hiring a designer. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of creators who love WordToImage
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
