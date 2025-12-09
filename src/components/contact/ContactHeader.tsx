import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';

export const ContactHeader = () => {
  return (
    <div className="text-center mb-16">
      <Badge className="mb-6 bg-primary/10 text-primary border border-primary/20 px-6 py-2 text-lg">
        <MessageCircle className="h-5 w-5 mr-2" />
        Get in Touch
      </Badge>
      
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Let's Connect</span>
        <br />
        <span className="text-foreground">and Create Together</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Have questions about WordToImage? Need help with your creative projects? 
        Our team is here to support your journey from imagination to reality.
      </p>
    </div>
  );
};
