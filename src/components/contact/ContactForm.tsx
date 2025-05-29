
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Send, User, Mail, MessageSquare, Tag } from 'lucide-react';
import { ResponsiveFormField } from '@/components/forms/ResponsiveFormField';

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    if (formData.phone && !/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ContactFormData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check the form for validation errors and try again.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use the REST API directly to avoid TypeScript issues
      const response = await fetch('https://itkfghwxbodjlmpgydsq.supabase.co/rest/v1/contact_submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0a2ZnaHd4Ym9kamxtcGd5ZHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMzMzOTQsImV4cCI6MjA2MDYwOTM5NH0.1QFLzTYlsFK6eGi_kpnN-pF1xqz3FJP5fphD8wGCC9M',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ 
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message 
        })
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      // Show success message
      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact us directly via phone or email.",
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
      
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResponsiveFormField
            label="First Name"
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            error={errors.firstName}
            required
            autoComplete="given-name"
          />
          
          <ResponsiveFormField
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            error={errors.lastName}
            autoComplete="family-name"
          />
        </div>
        
        <ResponsiveFormField
          label="Email Address"
          type="email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={handleChange('email')}
          error={errors.email}
          required
          autoComplete="email"
          helpText="We'll use this to respond to your message"
        />
        
        <ResponsiveFormField
          label="Phone Number"
          type="text"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={handleChange('phone')}
          error={errors.phone}
          autoComplete="tel"
          helpText="Optional - for urgent matters or preferred callback"
        />
        
        <ResponsiveFormField
          label="Subject"
          type="text"
          placeholder="How can we help you?"
          value={formData.subject}
          onChange={handleChange('subject')}
          error={errors.subject}
          maxLength={100}
        />
        
        <ResponsiveFormField
          label="Message"
          type="textarea"
          placeholder="Tell us more about your question, feedback, or how we can assist you..."
          value={formData.message}
          onChange={handleChange('message')}
          error={errors.message}
          required
          rows={5}
          maxLength={1000}
          helpText="Please provide as much detail as possible to help us assist you better"
        />
        
        <div className="pt-4">
          <PrimaryButton 
            type="submit" 
            className="w-full btn-ai-neon text-lg py-4"
            isLoading={isSubmitting}
            loadingText="Sending your message..."
            disabled={isSubmitting}
          >
            <Send className="mr-2 h-5 w-5" />
            Send Message
          </PrimaryButton>
        </div>
        
        <div className="text-center text-sm text-gray-400 mt-4">
          <p>Your information is secure and will only be used to respond to your inquiry.</p>
        </div>
      </form>
    </div>
  );
};
