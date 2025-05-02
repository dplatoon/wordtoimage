
import { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Sarah J.",
    role: "Social Media Influencer",
    content: "WordToImage has completely transformed my content creation process. I can create stunning graphics in minutes that would have taken hours with traditional design tools.",
    rating: 5,
    avatarColor: "bg-blue-100"
  },
  {
    name: "Michael T.",
    role: "Small Business Owner",
    content: "As a non-designer, this tool has been a game-changer for our social media presence. Our engagement has increased by 45% since we started using WordToImage.",
    rating: 5,
    avatarColor: "bg-purple-100"
  },
  {
    name: "Priya K.",
    role: "Content Creator",
    content: "The templates are professional and so easy to customize. I've saved hours of design time each week while still maintaining a consistent brand identity.",
    rating: 4,
    avatarColor: "bg-green-100"
  },
  {
    name: "David L.",
    role: "Marketing Manager",
    content: "We've been using WordToImage for our campaign graphics and the results have been incredible. The AI understands our brand voice perfectly.",
    rating: 5,
    avatarColor: "bg-yellow-100"
  },
  {
    name: "Emma R.",
    role: "Freelance Designer",
    content: "I use this as a starting point for client concepts. It's like having an assistant who can quickly visualize ideas before I refine them.",
    rating: 4,
    avatarColor: "bg-red-100"
  },
  {
    name: "Alex W.",
    role: "Startup Founder",
    content: "Our startup doesn't have a design team yet, and WordToImage fills that gap beautifully. Worth every penny for the time it saves us!",
    rating: 5,
    avatarColor: "bg-teal-100"
  }
];

export const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins">
            Loved by Creators Everywhere
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who create stunning graphics with WordToImage.
          </p>
        </div>

        {/* Desktop Testimonials Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className={`h-10 w-10 rounded-full ${testimonial.avatarColor} flex items-center justify-center`}>
                  <span className="text-blue-600 font-semibold">{testimonial.name[0]}</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second row of testimonials for desktop only */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {testimonials.slice(3, 6).map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className={`h-10 w-10 rounded-full ${testimonial.avatarColor} flex items-center justify-center`}>
                  <span className="text-blue-600 font-semibold">{testimonial.name[0]}</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Testimonial Slider */}
        <div className="md:hidden relative">
          <div className="overflow-hidden relative">
            <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 text-sm italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-full ${testimonial.avatarColor} flex items-center justify-center`}>
                        <span className="text-blue-600 font-semibold text-sm">{testimonial.name[0]}</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                        <p className="text-gray-500 text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Slider Navigation */}
          <div className="flex justify-center mt-6 gap-2">
            <button 
              onClick={prevTestimonial} 
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="flex space-x-1 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === activeTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial} 
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 w-6 rounded-full bg-blue-400 border-2 border-white" />
              ))}
            </div>
            <span className="text-blue-800 font-medium text-sm">Join 10,000+ happy users</span>
          </div>
        </div>
      </div>
    </section>
  );
};
