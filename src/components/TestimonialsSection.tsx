
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah J.",
    role: "Social Media Influencer",
    content: "WordToImage has completely transformed my content creation process. I can create stunning graphics in minutes!",
    rating: 5,
    avatarColor: "bg-blue-100"
  },
  {
    name: "Michael T.",
    role: "Small Business Owner",
    content: "As a non-designer, this tool has been a game-changer for our social media presence. Our engagement has increased by 45%.",
    rating: 5,
    avatarColor: "bg-purple-100"
  },
  {
    name: "Priya K.",
    role: "Content Creator",
    content: "The templates are professional and so easy to customize. I've saved hours of design time each week.",
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
    content: "I use this as a starting point for client concepts. It's like having an assistant who can quickly visualize ideas.",
    rating: 4,
    avatarColor: "bg-red-100"
  },
  {
    name: "Alex W.",
    role: "Startup Founder",
    content: "Our startup doesn't have a design team yet, and WordToImage fills that gap beautifully. Worth every penny!",
    rating: 5,
    avatarColor: "bg-teal-100"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins">
            Loved by Creators Everywhere
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who create stunning social media graphics with WordToImage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
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
            </div>
          ))}
        </div>

        {/* Second row of testimonials for desktop only */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {testimonials.slice(3, 6).map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
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
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 w-6 rounded-full bg-gray-300 border-2 border-white" />
              ))}
            </div>
            <span className="text-blue-800 font-medium text-sm">Join 10,000+ happy users</span>
          </div>
          
          {/* Case study teaser */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 max-w-2xl mx-auto">
            <div className="text-left">
              <Badge className="mb-2" variant="outline">Case Study</Badge>
              <h3 className="text-xl font-semibold mb-2">How Social First Agency Increased Client Results by 72%</h3>
              <p className="text-gray-600 mb-4">Learn how this marketing agency leveraged WordToImage to transform their content strategy.</p>
              <Button variant="link" className="p-0 h-auto text-blue-600">
                Read case study (Coming soon)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// To fix TypeScript error, make sure to import Badge and Button
import { Badge } from './ui/badge';
import { Button } from './ui/button';
