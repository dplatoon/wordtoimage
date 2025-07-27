import { lazy, Suspense } from 'react';

// Lazy load non-critical components to improve initial load
const TestimonialsSocial = lazy(() => import('@/components/home/TestimonialsSocial'));
const InternalLinking = lazy(() => import('@/components/home/InternalLinking').then(module => ({ default: module.InternalLinking })));
const OnboardingTooltips = lazy(() => import('@/components/onboarding/OnboardingTooltips').then(module => ({ default: module.OnboardingTooltips })));
const LiveCounter = lazy(() => import('@/components/ui/live-counter').then(module => ({ default: module.LiveCounter })));
const ExitIntentModal = lazy(() => import('@/components/conversion/ExitIntentModal').then(module => ({ default: module.ExitIntentModal })));
const BrokenLinkChecker = lazy(() => import('@/components/common/BrokenLinkChecker').then(module => ({ default: module.BrokenLinkChecker })));

// Simple loading fallback for non-critical components
const ComponentFallback = () => <div className="sr-only">Loading...</div>;

export {
  TestimonialsSocial,
  InternalLinking,
  OnboardingTooltips,
  LiveCounter,
  ExitIntentModal,
  BrokenLinkChecker,
  ComponentFallback,
  Suspense
};