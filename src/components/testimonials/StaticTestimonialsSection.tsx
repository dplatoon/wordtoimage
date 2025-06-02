
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    content: "WordToImage has transformed how we create marketing visuals. The AI quality is incredible and saves us hours.",
    rating: 5
  },
  {
    name: "Mike Rodriguez",
    role: "Creative Designer",
    content: "I use this daily for client projects. The variety of styles and speed make it indispensable for my workflow.",
    rating: 5
  },
  {
    name: "Emily Watson",
    role: "Social Media Manager",
    content: "Perfect for creating engaging social content. The images look professional and unique every time.",
    rating: 5
  }
];

export const StaticTestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of creators who love WordToImage
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-600 mb-4">
                "{testimonial.content}"
              </blockquote>
              <footer>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
