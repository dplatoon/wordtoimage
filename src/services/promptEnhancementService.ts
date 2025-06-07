
import { supabase } from '@/integrations/supabase/client';

// Intelligent negative prompt blacklists by category
const NEGATIVE_PROMPT_CATEGORIES = {
  quality: [
    'blurry', 'low quality', 'pixelated', 'distorted', 'artifacts', 
    'compression', 'noisy', 'grainy', 'overexposed', 'underexposed'
  ],
  anatomy: [
    'bad anatomy', 'deformed', 'disfigured', 'malformed', 'mutated',
    'extra limbs', 'missing limbs', 'extra fingers', 'missing fingers',
    'fused fingers', 'long neck', 'cropped', 'poorly drawn'
  ],
  style: [
    'amateur', 'childish', 'crude', 'messy', 'unfinished', 'sketch',
    'rough draft', 'placeholder', 'watermark', 'signature', 'text'
  ],
  composition: [
    'cluttered', 'chaotic', 'unbalanced', 'off-center', 'tilted',
    'poorly composed', 'bad framing', 'cut off', 'duplicate', 'repetitive'
  ]
};

// Style-specific enhancement patterns
const STYLE_ENHANCEMENTS = {
  photorealistic: {
    keywords: ['photorealistic', 'ultra realistic', 'hyperrealistic', '8k', 'professional photography'],
    lighting: ['natural lighting', 'studio lighting', 'golden hour', 'dramatic lighting'],
    quality: ['sharp focus', 'detailed', 'high resolution', 'masterpiece'],
    negatives: [...NEGATIVE_PROMPT_CATEGORIES.quality, ...NEGATIVE_PROMPT_CATEGORIES.anatomy]
  },
  artistic: {
    keywords: ['digital art', 'concept art', 'illustration', 'artistic'],
    style: ['detailed painting', 'brush strokes', 'artistic composition'],
    quality: ['highly detailed', 'beautiful', 'trending on artstation'],
    negatives: [...NEGATIVE_PROMPT_CATEGORIES.quality, ...NEGATIVE_PROMPT_CATEGORIES.style]
  },
  anime: {
    keywords: ['anime style', 'manga', 'japanese animation'],
    style: ['clean lines', 'vibrant colors', 'anime aesthetic'],
    quality: ['high quality anime', 'detailed anime art'],
    negatives: [...NEGATIVE_PROMPT_CATEGORIES.quality, 'realistic', 'photographic']
  },
  cinematic: {
    keywords: ['cinematic', 'movie scene', 'film photography'],
    lighting: ['cinematic lighting', 'dramatic shadows', 'moody lighting'],
    composition: ['wide shot', 'establishing shot', 'depth of field'],
    negatives: [...NEGATIVE_PROMPT_CATEGORIES.quality, ...NEGATIVE_PROMPT_CATEGORIES.composition]
  }
};

// Prompt quality analysis patterns
const QUALITY_PATTERNS = {
  descriptive: /\b(detailed|intricate|complex|elaborate|ornate)\b/gi,
  emotional: /\b(beautiful|stunning|majestic|serene|dramatic|mysterious)\b/gi,
  technical: /\b(8k|4k|hd|uhd|high resolution|sharp focus|depth of field)\b/gi,
  artistic: /\b(masterpiece|artwork|painting|illustration|digital art)\b/gi,
  lighting: /\b(lighting|illuminated|glowing|shadows|highlights|golden hour)\b/gi,
  composition: /\b(composition|framing|perspective|angle|close-up|wide shot)\b/gi
};

export interface PromptAnalysis {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  estimatedStyle: string;
  complexity: 'simple' | 'moderate' | 'complex';
  recommendedGuidanceScale: number;
  enhancedPrompt: string;
  negativePrompt: string;
}

export interface EnhancementOptions {
  targetStyle?: string;
  emphasizeQuality?: boolean;
  includeNegatives?: boolean;
  guidanceScaleRange?: [number, number];
  preserveOriginal?: boolean;
}

export class PromptEnhancementService {
  private static instance: PromptEnhancementService;

  static getInstance(): PromptEnhancementService {
    if (!PromptEnhancementService.instance) {
      PromptEnhancementService.instance = new PromptEnhancementService();
    }
    return PromptEnhancementService.instance;
  }

  async analyzePrompt(prompt: string): Promise<PromptAnalysis> {
    const analysis: PromptAnalysis = {
      score: 0,
      strengths: [],
      weaknesses: [],
      suggestions: [],
      estimatedStyle: 'general',
      complexity: 'simple',
      recommendedGuidanceScale: 7.5,
      enhancedPrompt: prompt,
      negativePrompt: ''
    };

    // Basic quality scoring
    let score = 0;
    const words = prompt.toLowerCase().split(/\s+/);
    
    // Length scoring (sweet spot is 20-100 words)
    if (words.length >= 20 && words.length <= 100) {
      score += 20;
      analysis.strengths.push('Good prompt length');
    } else if (words.length < 10) {
      score -= 10;
      analysis.weaknesses.push('Prompt too short');
      analysis.suggestions.push('Add more descriptive details');
    } else if (words.length > 150) {
      score -= 5;
      analysis.weaknesses.push('Prompt might be too long');
      analysis.suggestions.push('Consider condensing key details');
    }

    // Pattern matching for quality indicators
    Object.entries(QUALITY_PATTERNS).forEach(([category, pattern]) => {
      const matches = prompt.match(pattern);
      if (matches && matches.length > 0) {
        score += matches.length * 5;
        analysis.strengths.push(`Contains ${category} elements`);
      } else if (category === 'descriptive' || category === 'lighting') {
        analysis.suggestions.push(`Consider adding ${category} details`);
      }
    });

    // Style detection
    analysis.estimatedStyle = this.detectStyle(prompt);
    
    // Complexity assessment
    analysis.complexity = this.assessComplexity(prompt);
    
    // Guidance scale recommendation
    analysis.recommendedGuidanceScale = this.calculateGuidanceScale(prompt, analysis.complexity);
    
    // Final score normalization
    analysis.score = Math.min(100, Math.max(0, score));
    
    return analysis;
  }

  async enhancePrompt(
    prompt: string, 
    options: EnhancementOptions = {}
  ): Promise<{ enhanced: string; negative: string; analysis: PromptAnalysis }> {
    const analysis = await this.analyzePrompt(prompt);
    
    let enhanced = prompt;
    let negative = '';

    // Apply style-specific enhancements
    const targetStyle = options.targetStyle || analysis.estimatedStyle;
    const styleConfig = STYLE_ENHANCEMENTS[targetStyle as keyof typeof STYLE_ENHANCEMENTS];
    
    if (styleConfig && !options.preserveOriginal) {
      // Add style keywords if not present
      const hasStyleKeywords = styleConfig.keywords.some(keyword => 
        enhanced.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (!hasStyleKeywords) {
        enhanced += `, ${styleConfig.keywords[0]}`;
      }

      // Add quality enhancers
      if (options.emphasizeQuality !== false) {
        const qualityTerms = styleConfig.quality.filter(term => 
          !enhanced.toLowerCase().includes(term.toLowerCase())
        );
        if (qualityTerms.length > 0) {
          enhanced += `, ${qualityTerms.slice(0, 2).join(', ')}`;
        }
      }

      // Build negative prompt
      if (options.includeNegatives !== false) {
        negative = styleConfig.negatives.join(', ');
      }
    }

    // Apply AI-powered suggestions
    if (analysis.suggestions.length > 0 && !options.preserveOriginal) {
      enhanced = await this.applyAISuggestions(enhanced, analysis.suggestions);
    }

    return {
      enhanced,
      negative,
      analysis: {
        ...analysis,
        enhancedPrompt: enhanced,
        negativePrompt: negative
      }
    };
  }

  private detectStyle(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    
    // Style detection logic
    if (lowerPrompt.includes('anime') || lowerPrompt.includes('manga')) return 'anime';
    if (lowerPrompt.includes('photo') || lowerPrompt.includes('realistic')) return 'photorealistic';
    if (lowerPrompt.includes('paint') || lowerPrompt.includes('art')) return 'artistic';
    if (lowerPrompt.includes('cinematic') || lowerPrompt.includes('movie')) return 'cinematic';
    
    return 'general';
  }

  private assessComplexity(prompt: string): 'simple' | 'moderate' | 'complex' {
    const words = prompt.split(/\s+/);
    const commas = (prompt.match(/,/g) || []).length;
    const descriptors = prompt.match(QUALITY_PATTERNS.descriptive) || [];
    
    if (words.length > 50 || commas > 5 || descriptors.length > 3) {
      return 'complex';
    } else if (words.length > 20 || commas > 2 || descriptors.length > 1) {
      return 'moderate';
    }
    return 'simple';
  }

  private calculateGuidanceScale(prompt: string, complexity: string): number {
    let baseScale = 7.5;
    
    // Adjust based on complexity
    switch (complexity) {
      case 'simple':
        baseScale = 6.0; // Lower guidance for simple prompts
        break;
      case 'moderate':
        baseScale = 7.5; // Standard guidance
        break;
      case 'complex':
        baseScale = 9.0; // Higher guidance for complex prompts
        break;
    }

    // Fine-tune based on style keywords
    if (prompt.toLowerCase().includes('photorealistic')) {
      baseScale += 1.0; // More guidance for realism
    }
    if (prompt.toLowerCase().includes('artistic') || prompt.toLowerCase().includes('creative')) {
      baseScale -= 0.5; // Less guidance for creativity
    }

    return Math.min(12, Math.max(3, baseScale));
  }

  private async applyAISuggestions(prompt: string, suggestions: string[]): Promise<string> {
    // In a real implementation, this could call an AI service
    // For now, we'll apply basic enhancements based on suggestions
    
    let enhanced = prompt;
    
    if (suggestions.includes('Add more descriptive details')) {
      // Add common enhancing words if not present
      const enhancers = ['detailed', 'intricate', 'beautiful'];
      const missing = enhancers.filter(word => !enhanced.toLowerCase().includes(word));
      if (missing.length > 0) {
        enhanced += `, ${missing[0]}`;
      }
    }
    
    if (suggestions.includes('Consider adding lighting details')) {
      const lightingOptions = ['soft lighting', 'dramatic lighting', 'natural lighting'];
      const hasLighting = lightingOptions.some(option => 
        enhanced.toLowerCase().includes(option.toLowerCase())
      );
      if (!hasLighting) {
        enhanced += `, ${lightingOptions[0]}`;
      }
    }
    
    return enhanced;
  }

  // Real-time prompt optimization as user types
  async getOptimizationSuggestions(prompt: string): Promise<string[]> {
    const suggestions: string[] = [];
    const analysis = await this.analyzePrompt(prompt);
    
    if (analysis.score < 40) {
      suggestions.push('💡 Try adding more descriptive details');
    }
    
    if (analysis.score < 60 && !prompt.toLowerCase().includes('lighting')) {
      suggestions.push('✨ Consider adding lighting description');
    }
    
    if (analysis.score < 50 && analysis.complexity === 'simple') {
      suggestions.push('🎨 Add style or mood keywords');
    }
    
    return suggestions;
  }

  // Batch optimization for multiple prompts
  async optimizeBatch(prompts: string[], options: EnhancementOptions = {}): Promise<Array<{
    original: string;
    enhanced: string;
    negative: string;
    improvements: string[];
  }>> {
    const results = [];
    
    for (const prompt of prompts) {
      const { enhanced, negative, analysis } = await this.enhancePrompt(prompt, options);
      
      const improvements = [];
      if (enhanced !== prompt) improvements.push('Enhanced prompt structure');
      if (negative) improvements.push('Added negative prompts');
      if (analysis.score > 60) improvements.push('High quality score achieved');
      
      results.push({
        original: prompt,
        enhanced,
        negative,
        improvements
      });
    }
    
    return results;
  }
}

export const promptEnhancement = PromptEnhancementService.getInstance();
