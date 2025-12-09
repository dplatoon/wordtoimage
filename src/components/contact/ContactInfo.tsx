import { Mail, MessageSquare, Clock, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const ContactInfo = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get personalized support from our team",
      contact: "contact@wordtoimage.online",
      action: "mailto:contact@wordtoimage.online"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant help when you need it most",
      contact: "Available 24/7",
      action: "#"
    },
    {
      icon: Clock,
      title: "Response Time",
      description: "We aim to respond within hours",
      contact: "< 2 hours",
      action: "#"
    },
    {
      icon: Globe,
      title: "Global Support",
      description: "Helping creators worldwide",
      contact: "Worldwide",
      action: "#"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {contactMethods.map((method, index) => (
        <Card key={index} className="text-center group">
          <CardContent className="p-6">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:shadow-neon transition-all duration-300">
              <method.icon className="h-7 w-7 text-primary" />
            </div>
            
            <h3 className="text-xl font-semibold text-foreground mb-2">{method.title}</h3>
            <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
            
            {method.action.startsWith('mailto:') ? (
              <a 
                href={method.action} 
                className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
              >
                {method.contact}
              </a>
            ) : (
              <span className="text-primary font-medium">{method.contact}</span>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
