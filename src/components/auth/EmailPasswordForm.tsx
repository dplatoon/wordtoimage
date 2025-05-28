
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useState, useRef, useEffect } from 'react';
import { authFormSchema, AuthFormValues } from './schema/authFormSchema';
import { FormHeader } from './form/FormHeader';
import { UsernameField } from './form/UsernameField';
import { EmailField } from './form/EmailField';
import { PasswordField } from './form/PasswordField';
import { ErrorMessage } from './form/ErrorMessage';
import { SubmitButton } from './form/SubmitButton';
import { FormFooter } from './form/FormFooter';

interface EmailPasswordFormProps {
  mode: 'signin' | 'signup';
  isLoading: boolean;
  onSubmit: (values: AuthFormValues) => Promise<void>;
  authError: string | null;
}

export function EmailPasswordForm({ 
  mode, 
  isLoading, 
  onSubmit,
  authError 
}: EmailPasswordFormProps) {
  const errorRef = useRef<HTMLDivElement>(null);
  const emailFieldRef = useRef<HTMLInputElement>(null);
  const passwordFieldRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  // Focus management for errors
  useEffect(() => {
    if (authError && errorRef.current) {
      errorRef.current.focus();
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [authError]);

  const handleSubmit = async (values: AuthFormValues) => {
    if (isLoading) return;
    
    try {
      await onSubmit(values);
    } catch (error) {
      // Focus management after error - focus the first field with an error
      const firstErrorField = form.formState.errors.email ? emailFieldRef.current : 
                             form.formState.errors.password ? passwordFieldRef.current : null;
      
      if (firstErrorField) {
        setTimeout(() => {
          firstErrorField.focus();
        }, 100);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      form.handleSubmit(handleSubmit)();
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleSubmit)} 
        onKeyDown={handleKeyDown}
        className="space-y-5"
        noValidate
        aria-label={mode === 'signin' ? 'Sign in form' : 'Create account form'}
      >
        <FormHeader mode={mode} />

        {mode === 'signup' && (
          <UsernameField 
            control={form.control}
            isLoading={isLoading}
          />
        )}
        
        <EmailField 
          control={form.control}
          isLoading={isLoading}
          errors={form.formState.errors}
          ref={emailFieldRef}
        />
        
        <PasswordField 
          control={form.control}
          mode={mode}
          isLoading={isLoading}
          errors={form.formState.errors}
          ref={passwordFieldRef}
        />
        
        {authError && (
          <ErrorMessage 
            error={authError}
            ref={errorRef}
          />
        )}
        
        <SubmitButton 
          mode={mode}
          isLoading={isLoading}
        />

        <FormFooter 
          mode={mode}
          isLoading={isLoading}
        />
      </form>
    </Form>
  );
}
