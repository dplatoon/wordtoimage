
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

export const ContactHeader = () => {
  return (
    <div className="text-center">
      {/* Enhanced badge */}
      <Badge className="mb-8 bg-ai-primary/20 text-ai-neon border-ai-primary/30 px-8 py-3 text-lg font-medium shadow-lg backdrop-blur-sm">
        <MessageCircle className="h-5 w-5 mr-2" />
        Get in Touch
      </Badge>
      
      {/* Enhanced main heading */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
        <span className="text-gradient-neon">Let's Connect</span>
        <br />
        <span className="text-white">and Create Together</span>
      </h1>
      
      {/* Enhanced description */}
      <div className="max-w-4xl mx-auto mb-12">
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6">
          Have questions about WordToImage? Need help with your creative projects? 
          Our team is here to support your journey from imagination to reality.
        </p>
        
        <p className="text-lg text-gray-400 leading-relaxed">
          Whether you're troubleshooting, exploring features, or looking for creative inspiration, 
          we're committed to providing you with exceptional support every step of the way.
        </p>
      </div>

      {/* Enhanced quick contact actions */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
        <a 
          href="tel:+15551234567"
          className="group flex items-center gap-3 bg-ai-primary/20 hover:bg-ai-primary/30 text-ai-neon border border-ai-primary/30 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm min-w-[280px] justify-center"
          aria-label="Call us immediately at +1 555 123 4567"
        >
          <Phone className="h-5 w-5 group-hover:animate-pulse" />
          <span className="font-medium">Call Now: +1 (555) 123-4567</span>
        </a>
        
        <a 
          href="mailto:contact@wordtoimage.com"
          className="group flex items-center gap-3 bg-ai-secondary/20 hover:bg-ai-secondary/30 text-ai-accent border border-ai-secondary/30 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm min-w-[280px] justify-center"
          aria-label="Send us an email at contact@wordtoimage.com"
        >
          <Mail className="h-5 w-5 group-hover:animate-pulse" />
          <span className="font-medium">Email: contact@wordtoimage.com</span>
        </a>
      </div>

      {/* Enhanced office location callout */}
      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-lg backdrop-blur-sm">
        <MapPin className="h-4 w-4 text-ai-neon" />
        <span className="text-gray-300 text-sm">
          Headquarters: Tech City, TC • Available 24/7 for urgent matters
        </span>
      </div>
    </div>
  );
};
