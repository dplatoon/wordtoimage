
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Textarea } from '@/components/ui/textarea';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Send, User, Mail, MessageSquare, Tag } from 'lucide-react';

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use type assertion since contact_submissions table types may not be generated yet
      const { error } = await (supabase as any)
        .from('contact_submissions')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        });
      
      if (error) {
        throw error;
      }
      
      // Show success message
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact us directly via email.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ai-card max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Send Us a Message</h2>
        <p className="text-gray-300">
          Share your thoughts, questions, or ideas with us. We'd love to hear from you!
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="flex items-center text-sm font-medium text-gray-300">
              <User className="h-4 w-4 mr-2 text-ai-neon" />
              First Name
            </label>
            <Input
              type="text"
              id="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-ai-surface/50 border-ai-primary/30 text-white placeholder-gray-400 focus:border-ai-neon"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="lastName" className="flex items-center text-sm font-medium text-gray-300">
              <User className="h-4 w-4 mr-2 text-ai-neon" />
              Last Name
            </label>
            <Input
              type="text"
              id="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-ai-surface/50 border-ai-primary/30 text-white placeholder-gray-400 focus:border-ai-neon"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-300">
            <Mail className="h-4 w-4 mr-2 text-ai-neon" />
            Email Address <span className="text-red-400 ml-1">*</span>
          </label>
          <Input
            type="email"
            id="email"
            placeholder="john.doe@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="bg-ai-surface/50 border-ai-primary/30 text-white placeholder-gray-400 focus:border-ai-neon"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subject" className="flex items-center text-sm font-medium text-gray-300">
            <Tag className="h-4 w-4 mr-2 text-ai-neon" />
            Subject
          </label>
          <Input
            type="text"
            id="subject"
            placeholder="How can we help you?"
            value={formData.subject}
            onChange={handleChange}
            className="bg-ai-surface/50 border-ai-primary/30 text-white placeholder-gray-400 focus:border-ai-neon"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-300">
            <MessageSquare className="h-4 w-4 mr-2 text-ai-neon" />
            Message <span className="text-red-400 ml-1">*</span>
          </label>
          <Textarea
            id="message"
            rows={5}
            placeholder="Tell us more about your question or feedback..."
            required
            value={formData.message}
            onChange={handleChange}
            className="bg-ai-surface/50 border-ai-primary/30 text-white placeholder-gray-400 focus:border-ai-neon resize-none"
          />
        </div>
        
        <div className="pt-4">
          <PrimaryButton 
            type="submit" 
            className="w-full btn-ai-neon text-lg py-4"
            isLoading={isSubmitting}
            loadingText="Sending..."
          >
            <Send className="mr-2 h-5 w-5" />
            Send Message
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
