import { supabase } from '@/integrations/supabase/client';

export interface ABTest {
  id: string;
  test_name: string;
  description?: string;
  variants: string[];
  active: boolean;
}

export interface ABTestAssignment {
  test_id: string;
  variant: string;
}

export class ABTestingService {
  private assignments: Map<string, string> = new Map();
  private sessionId: string;

  constructor() {
    this.sessionId = this.getSessionId();
    this.loadStoredAssignments();
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  private loadStoredAssignments() {
    const stored = localStorage.getItem('ab_test_assignments');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.assignments = new Map(Object.entries(parsed));
      } catch (error) {
        console.error('Failed to load AB test assignments:', error);
      }
    }
  }

  private saveAssignments() {
    const obj = Object.fromEntries(this.assignments);
    localStorage.setItem('ab_test_assignments', JSON.stringify(obj));
  }

  // Get variant for a test (assigns user if not already assigned)
  async getVariant(testName: string): Promise<string | null> {
    // Check if already assigned
    if (this.assignments.has(testName)) {
      return this.assignments.get(testName)!;
    }

    try {
      // Get active test
      const { data: test } = await supabase
        .from('ab_tests')
        .select('*')
        .eq('test_name', testName)
        .eq('active', true)
        .single();

      if (!test) {
        return null;
      }

      // Random assignment
      const variants = test.variants as string[];
      const randomIndex = Math.floor(Math.random() * variants.length);
      const selectedVariant = variants[randomIndex];

      // Save assignment to database
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.from('ab_test_assignments').insert({
        test_id: test.id,
        user_id: user?.id || null,
        session_id: this.sessionId,
        variant: selectedVariant
      });

      // Store locally
      this.assignments.set(testName, selectedVariant);
      this.saveAssignments();

      return selectedVariant;
    } catch (error) {
      console.error('Failed to get AB test variant:', error);
      return null;
    }
  }

  // Check if user is in specific variant
  async isInVariant(testName: string, variantName: string): Promise<boolean> {
    const variant = await this.getVariant(testName);
    return variant === variantName;
  }

  // Track conversion for AB test
  async trackConversion(testName: string, conversionType: string, value?: number) {
    const variant = this.assignments.get(testName);
    if (!variant) return;

    try {
      // This would integrate with your main analytics
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.from('user_analytics').insert({
        user_id: user?.id || null,
        session_id: this.sessionId,
        event_type: 'ab_test_conversion',
        event_data: {
          test_name: testName,
          variant,
          conversion_type: conversionType,
          value
        },
        page_url: window.location.href,
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Failed to track AB test conversion:', error);
    }
  }
}

// Singleton instance
export const abTesting = new ABTestingService();

// React hook for AB testing
import { useState, useEffect } from 'react';

export function useABTest(testName: string) {
  const [variant, setVariant] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    abTesting.getVariant(testName).then(result => {
      setVariant(result);
      setLoading(false);
    });
  }, [testName]);

  const trackConversion = (conversionType: string, value?: number) => {
    abTesting.trackConversion(testName, conversionType, value);
  };

  return { variant, loading, trackConversion };
}