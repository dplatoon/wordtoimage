
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "Lovable has transformed how I connect with others. It's not just another social platform; it's a place where genuine connections happen.",
    author: "Emily Johnson",
    role: "Teacher",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    content: "The daily prompts have helped me express gratitude and positivity in ways I never expected. My mental health has genuinely improved.",
    author: "Michael Rodriguez",
    role: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    content: "I've reconnected with old friends and made new ones through shared moments. The interface is beautiful and the community is so supportive!",
    author: "Sarah Williams",
    role: "Marketing Professional",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg"
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block">
            <div className="h-64 w-64 rounded-full bg-lovable-lavender/20 blur-3xl"></div>
          </div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 hidden lg:block">
            <div className="h-64 w-64 rounded-full bg-lovable-peach/20 blur-3xl"></div>
          </div>
          
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight font-poppins text-gray-900 sm:text-4xl">
              Loved by Thousands of Users
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Hear what our community says about their Lovable experience.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="lovable-card hover:border-lovable-pink hover:border transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-lovable-gold" fill="#FFD700" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-700">"{testimonial.content}"</p>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="h-12 w-12 rounded-full object-cover border-2 border-lovable-pink"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 font-poppins">{testimonial.author}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
