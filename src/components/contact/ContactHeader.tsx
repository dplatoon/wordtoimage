
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Mail } from 'lucide-react';

export const ContactHeader = () => {
  return (
    <div className="text-center mb-16">
      <Badge className="mb-6 bg-ai-primary/20 text-ai-neon border-ai-primary/30 px-6 py-2 text-lg">
        <MessageCircle className="h-5 w-5 mr-2" />
        Get in Touch
      </Badge>
      
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
        <span className="text-gradient-neon">Let's Connect</span>
        <br />
        <span className="text-white">and Create Together</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
        Have questions about WordToImage? Need help with your creative projects? 
        Our team is here to support your journey from imagination to reality.
      </p>

      {/* Quick Contact Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a 
          href="tel:+15551234567"
          className="flex items-center gap-2 bg-ai-primary/20 hover:bg-ai-primary/30 text-ai-neon border border-ai-primary/30 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          aria-label="Call us immediately"
        >
          <Phone className="h-5 w-5" />
          Call Now: +1 (555) 123-4567
        </a>
        <a 
          href="mailto:contact@wordtoimage.com"
          className="flex items-center gap-2 bg-ai-secondary/20 hover:bg-ai-secondary/30 text-ai-accent border border-ai-secondary/30 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          aria-label="Send us an email"
        >
          <Mail className="h-5 w-5" />
          Email: contact@wordtoimage.com
        </a>
      </div>
    </div>
  );
};
