
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    content: "This AI image generator is incredibly easy to use and creates stunning visuals in seconds. It's transformed how I create content for my blog.",
    author: "Alex Johnson",
    role: "Content Creator",
    avatar: "/lovable-uploads/806c4eee-2b54-4f82-8d75-7bd3e7137f5c.png"
  },
  {
    id: 2,
    content: "The quality of images generated is remarkable. I've tried other AI tools but none compare to the detail and accuracy this platform provides.",
    author: "Sarah Williams",
    role: "Digital Marketer",
    avatar: "/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png"
  },
  {
    id: 3,
    content: "As someone with limited design skills, this tool has been a game-changer. Just type what you want and get professional-quality images instantly.",
    author: "Michael Chen",
    role: "Small Business Owner",
    avatar: "/lovable-uploads/c0cd939b-5fe6-4732-af93-ee61f070b689.png"
  }
];

export const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  // Handle autoplay
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);
  
  const goToNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const goToPrevious = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground">What Our Users Say</h2>
        <p className="mt-4 text-xl text-muted-foreground">Hear from people who use our AI every day</p>
      </div>
      
      <div className="relative">
        <div
          key={currentIndex}
          className="bg-card/30 backdrop-blur-xl rounded-xl shadow-glass border border-primary/20 p-8 md:p-12 animate-fade-in"
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 text-primary">
              <MessageSquare className="h-12 w-12" />
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 italic">
              "{testimonials[currentIndex].content}"
            </p>
            
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                <img 
                  src={testimonials[currentIndex].avatar} 
                  alt={testimonials[currentIndex].author} 
                  className="h-full w-full object-cover"
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">{testimonials[currentIndex].author}</p>
                <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <button 
          onClick={goToPrevious}
          className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 shadow-glass hover:bg-card border border-primary/20 focus:outline-none"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5 text-muted-foreground" />
        </button>
        
        <button 
          onClick={goToNext}
          className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 shadow-glass hover:bg-card border border-primary/20 focus:outline-none"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
      
      {/* Dots navigation */}
      <div className="flex justify-center space-x-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setAutoplay(false);
              setCurrentIndex(index);
            }}
            className={`h-2 w-2 rounded-full focus:outline-none transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
