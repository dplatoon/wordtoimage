import { Star, Quote, Users, TrendingUp } from 'lucide-react';

const TestimonialsSocial = () => {
  const testimonials = [
    {
      name: "Sarah K.",
      role: "E-commerce Manager",
      company: "TechStyle Co.",
      text: "Created 200+ product images in one hour! Saved us $3k+ on design costs. The quality is incredible - our conversion rates increased by 35%.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Marcus Chen",
      role: "Content Creator",
      company: "Digital Nomad Blog",
      text: "This AI generator transformed my blog visuals. I went from generic stock photos to unique, branded artwork that perfectly matches my content.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Social Media Manager",
      company: "Growth Agency",
      text: "Our client engagement skyrocketed with custom AI visuals. We're creating scroll-stopping content in minutes instead of hours.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const stats = [
    { value: "2M+", label: "Happy Users", icon: Users },
    { value: "15M+", label: "Images Created", icon: TrendingUp },
    { value: "4.9/5", label: "User Rating", icon: Star },
    { value: "150+", label: "Countries", icon: Quote }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Creators Worldwide
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Join millions of content creators, marketers, and designers who use our AI image generator 
            to bring their creative visions to life
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-8 h-8 text-primary opacity-20" />
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-card-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-primary">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-card rounded-full shadow-md border border-border">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="font-medium">SSL Secure</span>
              </div>
              <span className="text-muted-foreground/50">•</span>
              <span>15M+ Images Generated</span>
              <span className="text-muted-foreground/50">•</span>
              <span>Commercial Rights Included</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSocial;