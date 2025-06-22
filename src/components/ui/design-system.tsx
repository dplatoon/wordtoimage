
import React from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

// Enhanced color palette for consistent visual hierarchy
export const designTokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      900: '#0c4a6e'
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      500: '#64748b',
      600: '#475569',
      700: '#334155'
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d'
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      600: '#d97706'
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c'
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  },
  typography: {
    h1: 'text-4xl md:text-5xl font-bold',
    h2: 'text-3xl md:text-4xl font-bold',
    h3: 'text-2xl md:text-3xl font-semibold',
    h4: 'text-xl font-semibold',
    body: 'text-base leading-relaxed',
    caption: 'text-sm text-gray-600'
  }
};

// Enhanced Button Components with consistent hierarchy
export const PrimaryActionButton = ({ children, className, ...props }: any) => (
  <Button
    className={cn(
      'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
      'text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200',
      'transform hover:scale-105 px-8 py-3',
      className
    )}
    {...props}
  >
    {children}
  </Button>
);

export const SecondaryActionButton = ({ children, className, ...props }: any) => (
  <Button
    variant="outline"
    className={cn(
      'border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
      'hover:border-gray-400 hover:text-gray-800 shadow-sm hover:shadow-md',
      'font-medium transition-all duration-200 px-6 py-2',
      className
    )}
    {...props}
  >
    {children}
  </Button>
);

export const DestructiveActionButton = ({ children, className, ...props }: any) => (
  <Button
    className={cn(
      'bg-red-600 hover:bg-red-700 text-white font-medium',
      'shadow-sm hover:shadow-md transition-all duration-200',
      className
    )}
    {...props}
  >
    {children}
  </Button>
);

// Enhanced Card Components
export const FeatureCard = ({ title, description, icon, className, ...props }: any) => (
  <Card className={cn('shadow-lg hover:shadow-xl transition-shadow duration-300', className)} {...props}>
    <CardHeader className="pb-3">
      <div className="flex items-center gap-3 mb-2">
        {icon && <div className="p-2 bg-blue-100 rounded-lg">{icon}</div>}
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

export const PricingCard = ({ 
  title, 
  price, 
  period = 'month', 
  features, 
  popular = false, 
  className, 
  ...props 
}: any) => (
  <Card 
    className={cn(
      'relative shadow-lg hover:shadow-xl transition-all duration-300',
      popular && 'border-2 border-blue-500 scale-105',
      className
    )} 
    {...props}
  >
    {popular && (
      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
        Most Popular
      </Badge>
    )}
    <CardHeader className="text-center pb-4">
      <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      <div className="mt-4">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-gray-600">/{period}</span>
      </div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-3">
        {features?.map((feature: string, index: number) => (
          <li key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

// Typography Components for consistent hierarchy
export const PageTitle = ({ children, className }: any) => (
  <h1 className={cn(designTokens.typography.h1, 'text-gray-900 mb-6', className)}>
    {children}
  </h1>
);

export const SectionTitle = ({ children, className }: any) => (
  <h2 className={cn(designTokens.typography.h2, 'text-gray-900 mb-4', className)}>
    {children}
  </h2>
);

export const SubsectionTitle = ({ children, className }: any) => (
  <h3 className={cn(designTokens.typography.h3, 'text-gray-800 mb-3', className)}>
    {children}
  </h3>
);
