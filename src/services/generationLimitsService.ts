
import { supabase } from '@/integrations/supabase/client';

export interface GenerationLimits {
  isFirstDay: boolean;
  dailyGenerationsLeft: number;
  maxAllowed: number;
  usedToday: number;
}

export class GenerationLimitsService {
  static readonly FIRST_DAY_MAX_FREE_GENERATIONS = 3;
  static readonly MAX_FREE_ANONYMOUS_GENERATIONS = 1;

  static async fetchUserGenerationLimits(userId: string): Promise<GenerationLimits> {
    try {
      const today = new Date();
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
      const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();
      
      // Get user's first generation to check if today is their first day
      const { data: firstGenData, error: firstGenError } = await supabase
        .from('image_generations')
        .select('created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: true })
        .limit(1);
        
      if (firstGenError) {
        console.error("Error fetching first generation date:", firstGenError);
        throw firstGenError;
      }
      
      // Check if today is the first day of generation
      const isFirstDay = firstGenData.length === 0 || 
                        (new Date(firstGenData[0].created_at).toDateString() === today.toDateString());
      
      // Get count of today's generations
      const { data: todayData, error: todayError, count } = await supabase
        .from('image_generations')
        .select('id', { count: 'exact' })
        .eq('user_id', userId)
        .gte('created_at', startOfToday)
        .lt('created_at', endOfToday);
      
      if (todayError) {
        console.error("Error fetching today's generation count:", todayError);
        throw todayError;
      }
      
      const maxAllowed = isFirstDay ? this.FIRST_DAY_MAX_FREE_GENERATIONS : 1;
      const usedToday = count || 0;
      const dailyGenerationsLeft = Math.max(0, maxAllowed - usedToday);
      
      return {
        isFirstDay,
        dailyGenerationsLeft,
        maxAllowed,
        usedToday
      };
    } catch (error) {
      console.error("Error checking generation limits:", error);
      throw error;
    }
  }

  static getAnonymousGenerationCount(): number {
    const savedCount = localStorage.getItem('freeGenerationCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  }

  static setAnonymousGenerationCount(count: number): void {
    localStorage.setItem('freeGenerationCount', count.toString());
  }

  static incrementAnonymousGenerationCount(): number {
    const currentCount = this.getAnonymousGenerationCount();
    const newCount = currentCount + 1;
    this.setAnonymousGenerationCount(newCount);
    return newCount;
  }
}
