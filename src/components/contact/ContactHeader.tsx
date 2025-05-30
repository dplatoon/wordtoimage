
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Mail } from 'lucide-react';

export const ContactHeader = () => {
  return (
    <div className="text-center">
      <Badge className="mb-8 bg-ai-primary/20 text-ai-neon border-ai-primary/30 px-8 py-3 text-lg">
        <MessageCircle className="h-6 w-6 mr-3" />
        Get in Touch
      </Badge>
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-10">
        <span className="text-gradient-neon">Let's Connect</span>
        <br />
        <span className="text-white">and Create Together</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 text-readable line-height-reading">
        Have questions about WordToImage? Need help with your creative projects? 
        Looking for custom solutions? Our team is here to support your journey from imagination to reality.
      </p>

      {/* Enhanced quick contact actions with better accessibility */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <a 
          href="tel:+15551234567"
          className="flex items-center gap-3 bg-ai-primary/20 hover:bg-ai-primary/30 text-ai-neon border border-ai-primary/30 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ai-primary focus:ring-offset-2 focus:ring-offset-ai-dark text-lg font-medium"
          aria-label="Call us immediately at +1 555 123 4567"
        >
          <Phone className="h-6 w-6" />
          Call Now: +1 (555) 123-4567
        </a>
        <a 
          href="mailto:contact@wordtoimage.com"
          className="flex items-center gap-3 bg-ai-secondary/20 hover:bg-ai-secondary/30 text-ai-accent border border-ai-secondary/30 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ai-secondary focus:ring-offset-2 focus:ring-offset-ai-dark text-lg font-medium"
          aria-label="Send us an email at contact@wordtoimage.com"
        >
          <Mail className="h-6 w-6" />
          Email: contact@wordtoimage.com
        </a>
      </div>
    </div>
  );
};
