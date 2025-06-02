
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';

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
      
      <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Have questions about WordToImage? Need help with your creative projects? 
        Our team is here to support your journey from imagination to reality.
      </p>
    </div>
  );
};
