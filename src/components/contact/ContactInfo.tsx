
import { Mail, MessageSquare, Clock, Globe } from 'lucide-react';

export const ContactInfo = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get personalized support from our team",
      contact: "contact@wordtoimage.com",
      action: "mailto:contact@wordtoimage.com",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant help when you need it most",
      contact: "Available 24/7",
      action: "#",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Clock,
      title: "Response Time",
      description: "We aim to respond within hours",
      contact: "< 2 hours",
      action: "#",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Globe,
      title: "Global Support",
      description: "Helping creators worldwide",
      contact: "Worldwide",
      action: "#",
      color: "from-orange-400 to-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {contactMethods.map((method, index) => (
        <div key={index} className="ai-card group text-center">
          <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <method.icon className="h-8 w-8 text-white" />
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
          <p className="text-gray-400 text-sm mb-3">{method.description}</p>
          
          {method.action.startsWith('mailto:') ? (
            <a 
              href={method.action} 
              className="text-ai-neon hover:text-ai-accent transition-colors duration-200 font-medium"
            >
              {method.contact}
            </a>
          ) : (
            <span className="text-ai-neon font-medium">{method.contact}</span>
          )}
        </div>
      ))}
    </div>
  );
};
