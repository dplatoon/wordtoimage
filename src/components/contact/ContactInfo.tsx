
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
      {/* Enhanced Primary Contact Details with better spacing */}
      <div className="bg-gradient-to-r from-ai-primary/10 to-ai-secondary/10 rounded-3xl p-10 mb-16 border border-ai-primary/20">
        <h2 className="text-3xl font-bold text-white mb-8 text-center text-readable">Primary Contact Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Phone className="h-10 w-10 text-ai-neon mx-auto mb-4" />
            <h3 className="font-semibold text-white mb-3 text-xl text-readable">Phone Support</h3>
            <a 
              href="tel:+15551234567" 
              className="text-ai-neon hover:text-ai-accent transition-colors duration-200 font-medium text-xl focus:outline-none focus:ring-2 focus:ring-ai-primary focus:ring-offset-2 focus:ring-offset-ai-dark rounded"
              aria-label="Call us at +1 555 123 4567"
            >
              +1 (555) 123-4567
            </a>
            <p className="text-gray-400 text-sm mt-2 text-readable">Available Mon-Fri, 9AM-6PM PST</p>
          </div>
          <div className="text-center">
            <Mail className="h-10 w-10 text-ai-neon mx-auto mb-4" />
            <h3 className="font-semibold text-white mb-3 text-xl text-readable">Email Support</h3>
            <a 
              href="mailto:contact@wordtoimage.com" 
              className="text-ai-neon hover:text-ai-accent transition-colors duration-200 font-medium text-xl focus:outline-none focus:ring-2 focus:ring-ai-primary focus:ring-offset-2 focus:ring-offset-ai-dark rounded"
              aria-label="Send email to contact@wordtoimage.com"
            >
              contact@wordtoimage.com
            </a>
            <p className="text-gray-400 text-sm mt-2 text-readable">Response within 24 hours</p>
          </div>
          <div className="text-center">
            <MapPin className="h-10 w-10 text-ai-neon mx-auto mb-4" />
            <h3 className="font-semibold text-white mb-3 text-xl text-readable">Office Location</h3>
            <a 
              href="https://maps.google.com/?q=123+AI+Street+Tech+City+TC+12345" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-ai-neon hover:text-ai-accent transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-ai-primary focus:ring-offset-2 focus:ring-offset-ai-dark rounded"
              aria-label="View our location on Google Maps"
            >
              123 AI Street<br />Tech City, TC 12345
            </a>
            <p className="text-gray-400 text-sm mt-2 text-readable">Visit by appointment</p>
          </div>
        </div>
      </div>

      {/* Enhanced Additional Contact Methods with better layout */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center text-readable">Additional Ways to Reach Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="ai-card group text-center hover:scale-105 transition-transform duration-300">
              <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <method.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3 text-readable">{method.title}</h3>
              <p className="text-gray-400 text-sm mb-4 text-readable line-height-reading">{method.description}</p>
              
              {method.action.startsWith('mailto:') || method.action.startsWith('tel:') ? (
                <a 
                  href={method.action} 
                  className="text-ai-neon hover:text-ai-accent transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-ai-primary focus:ring-offset-2 focus:ring-offset-ai-dark rounded text-readable"
                  aria-label={`${method.title}: ${method.contact}`}
                >
                  {method.contact}
                </a>
              ) : method.action.startsWith('http') ? (
                <a 
                  href={method.action} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-ai-neon hover:text-ai-accent transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-ai-primary focus:ring-offset-2 focus:ring-offset-ai-dark rounded text-readable"
                  aria-label={`${method.title}: ${method.contact}`}
                >
                  {method.contact}
                </a>
              ) : (
                <span className="text-ai-neon font-medium text-readable">{method.contact}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
