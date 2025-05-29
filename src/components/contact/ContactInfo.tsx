
import { Mail, MessageSquare, Clock, Globe, Phone, MapPin } from 'lucide-react';

export const ContactInfo = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our support team",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Get personalized support from our team",
      contact: "contact@wordtoimage.com",
      action: "mailto:contact@wordtoimage.com",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our headquarters location",
      contact: "123 AI Street, Tech City, TC 12345",
      action: "https://maps.google.com/?q=123+AI+Street+Tech+City+TC+12345",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "We're here to help during these times",
      contact: "Mon-Fri: 9AM-6PM PST",
      action: "#",
      color: "from-orange-400 to-red-500"
    }
  ];

  return (
    <>
      {/* Primary Contact Details */}
      <div className="bg-gradient-to-r from-ai-primary/10 to-ai-secondary/10 rounded-2xl p-8 mb-12 border border-ai-primary/20">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Phone className="h-8 w-8 text-ai-neon mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Phone</h3>
            <a 
              href="tel:+15551234567" 
              className="text-ai-neon hover:text-ai-accent transition-colors duration-200 font-medium text-lg"
              aria-label="Call us at +1 555 123 4567"
            >
              +1 (555) 123-4567
            </a>
          </div>
          <div className="text-center">
            <Mail className="h-8 w-8 text-ai-neon mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Email</h3>
            <a 
              href="mailto:contact@wordtoimage.com" 
              className="text-ai-neon hover:text-ai-accent transition-colors duration-200 font-medium text-lg"
              aria-label="Send email to contact@wordtoimage.com"
            >
              contact@wordtoimage.com
            </a>
          </div>
          <div className="text-center">
            <MapPin className="h-8 w-8 text-ai-neon mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Address</h3>
            <a 
              href="https://maps.google.com/?q=123+AI+Street+Tech+City+TC+12345" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-ai-neon hover:text-ai-accent transition-colors duration-200 font-medium"
              aria-label="View our location on Google Maps"
            >
              123 AI Street<br />Tech City, TC 12345
            </a>
          </div>
        </div>
      </div>

      {/* Additional Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {contactMethods.map((method, index) => (
          <div key={index} className="ai-card group text-center">
            <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <method.icon className="h-8 w-8 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
            <p className="text-gray-400 text-sm mb-3">{method.description}</p>
            
            {method.action.startsWith('mailto:') || method.action.startsWith('tel:') ? (
              <a 
                href={method.action} 
                className="text-ai-neon hover:text-ai-accent transition-colors duration-200 font-medium"
                aria-label={`${method.title}: ${method.contact}`}
              >
                {method.contact}
              </a>
            ) : method.action.startsWith('http') ? (
              <a 
                href={method.action} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-ai-neon hover:text-ai-accent transition-colors duration-200 font-medium"
                aria-label={`${method.title}: ${method.contact}`}
              >
                {method.contact}
              </a>
            ) : (
              <span className="text-ai-neon font-medium">{method.contact}</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
