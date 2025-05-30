
import { Mail, MessageSquare, Clock, Globe, Phone, MapPin, Users, Zap } from 'lucide-react';

export const ContactInfo = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our support team for immediate assistance",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567",
      color: "from-blue-400 to-cyan-500",
      availability: "Mon-Fri: 9AM-6PM PST"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Get detailed support and documentation from our experts",
      contact: "contact@wordtoimage.com",
      action: "mailto:contact@wordtoimage.com",
      color: "from-green-400 to-emerald-500",
      availability: "Response within 24 hours"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our headquarters and innovation center location",
      contact: "123 AI Street, Tech City, TC 12345",
      action: "https://maps.google.com/?q=123+AI+Street+Tech+City+TC+12345",
      color: "from-purple-400 to-pink-500",
      availability: "By appointment only"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Quick answers and real-time support for urgent questions",
      contact: "Available on our platform",
      action: "#",
      color: "from-orange-400 to-red-500",
      availability: "24/7 automated + business hours live"
    }
  ];

  const supportFeatures = [
    {
      icon: Users,
      title: "Dedicated Support Team",
      description: "Experienced professionals ready to help with any challenge"
    },
    {
      icon: Zap,
      title: "Fast Response Times",
      description: "Average response time under 2 hours during business days"
    },
    {
      icon: Globe,
      title: "Global Availability",
      description: "Support across multiple time zones and languages"
    }
  ];

  return (
    <>
      {/* Enhanced primary contact section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Preferred Contact Method
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Multiple ways to reach us, ensuring you get the support you need when you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <div key={index} className="ai-card group text-center hover:scale-105 transition-all duration-300">
              <div className={`w-20 h-20 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <method.icon className="h-10 w-10 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">{method.title}</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{method.description}</p>
              
              {method.action.startsWith('mailto:') || method.action.startsWith('tel:') ? (
                <a 
                  href={method.action} 
                  className="text-ai-neon hover:text-ai-accent transition-colors duration-200 font-medium block mb-3"
                  aria-label={`${method.title}: ${method.contact}`}
                >
                  {method.contact}
                </a>
              ) : method.action.startsWith('http') ? (
                <a 
                  href={method.action} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-ai-neon hover:text-ai-accent transition-colors duration-200 font-medium block mb-3"
                  aria-label={`${method.title}: ${method.contact}`}
                >
                  {method.contact}
                </a>
              ) : (
                <span className="text-ai-neon font-medium block mb-3">{method.contact}</span>
              )}

              <div className="text-xs text-gray-500 bg-white/5 px-3 py-2 rounded-lg">
                {method.availability}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced support features section */}
      <div className="bg-gradient-to-r from-ai-primary/10 to-ai-secondary/10 rounded-3xl p-12 mb-16 border border-ai-primary/20 backdrop-blur-sm">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Why Our Support Stands Out
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We're committed to providing exceptional support that goes beyond just answering questions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supportFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-ai-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-ai-neon" />
              </div>
              <h3 className="font-semibold text-white mb-2 text-lg">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced business hours and additional info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="ai-card">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-ai-neon" />
            <h3 className="text-xl font-semibold text-white">Business Hours</h3>
          </div>
          <div className="space-y-2 text-gray-300">
            <div className="flex justify-between">
              <span>Monday - Friday:</span>
              <span className="text-ai-neon">9:00 AM - 6:00 PM PST</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday:</span>
              <span className="text-ai-neon">10:00 AM - 4:00 PM PST</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday:</span>
              <span className="text-gray-500">Closed</span>
            </div>
            <div className="mt-4 p-3 bg-ai-primary/10 rounded-lg border border-ai-primary/20">
              <p className="text-sm text-gray-300">
                <strong className="text-ai-neon">Emergency support:</strong> Available 24/7 for critical issues via email
              </p>
            </div>
          </div>
        </div>

        <div className="ai-card">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-6 w-6 text-ai-neon" />
            <h3 className="text-xl font-semibold text-white">Additional Information</h3>
          </div>
          <div className="space-y-3 text-gray-300 text-sm">
            <div>
              <strong className="text-white">Languages:</strong> English, Spanish, French, German
            </div>
            <div>
              <strong className="text-white">Response Time:</strong> Usually within 2-4 hours
            </div>
            <div>
              <strong className="text-white">Ticket System:</strong> All inquiries are tracked and prioritized
            </div>
            <div>
              <strong className="text-white">Follow-up:</strong> We ensure your issue is fully resolved
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
