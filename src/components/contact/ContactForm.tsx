import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Send, User, Mail, MessageSquare, Tag, Loader2 } from 'lucide-react';
import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  firstName: z.string().max(100, "First name too long").optional(),
  lastName: z.string().max(100, "Last name too long").optional(),
  email: z.string().email("Invalid email address").max(255, "Email too long"),
  subject: z.string().max(200, "Subject too long").optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message too long (max 2000 characters)")
});

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
    
    // Client-side validation with zod
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit via secure edge function
      const { data, error } = await supabase.functions.invoke('submit-contact', {
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to submit');
      }
      
      if (data?.error) {
        throw new Error(data.error);
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
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later or contact us directly via email.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Send Us a Message</h2>
          <p className="text-muted-foreground">
            Share your thoughts, questions, or ideas with us. We'd love to hear from you!
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="flex items-center text-sm font-medium text-foreground">
                <User className="h-4 w-4 mr-2 text-primary" />
                First Name
              </label>
              <Input
                type="text"
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="lastName" className="flex items-center text-sm font-medium text-foreground">
                <User className="h-4 w-4 mr-2 text-primary" />
                Last Name
              </label>
              <Input
                type="text"
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center text-sm font-medium text-foreground">
              <Mail className="h-4 w-4 mr-2 text-primary" />
              Email Address <span className="text-destructive ml-1">*</span>
            </label>
            <Input
              type="email"
              id="email"
              placeholder="john.doe@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="flex items-center text-sm font-medium text-foreground">
              <Tag className="h-4 w-4 mr-2 text-primary" />
              Subject
            </label>
            <Input
              type="text"
              id="subject"
              placeholder="How can we help you?"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="flex items-center text-sm font-medium text-foreground">
              <MessageSquare className="h-4 w-4 mr-2 text-primary" />
              Message <span className="text-destructive ml-1">*</span>
            </label>
            <Textarea
              id="message"
              rows={5}
              placeholder="Tell us more about your question or feedback..."
              required
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              variant="neon"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
