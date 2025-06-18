
import { useState, useEffect } from 'react';

interface StyleRecommendation {
  styleId: string;
  reason: string;
  confidence: number;
}

const PROMPT_STYLE_KEYWORDS = {
  'photorealistic': ['realistic', 'photo', 'photography', 'real', 'detailed', 'lifelike', 'portrait', 'professional', 'studio'],
  'digital-art': ['digital', 'modern', 'contemporary', 'vibrant', 'colorful', 'illustration', 'graphic', 'vector'],
  'oil-painting': ['classical', 'traditional', 'painterly', 'brushstrokes', 'artistic', 'canvas', 'fine art', 'oil'],
  'watercolor': ['soft', 'flowing', 'gentle', 'pastel', 'light', 'delicate', 'watercolor', 'painting'],
  'cyberpunk': ['futuristic', 'neon', 'cyber', 'sci-fi', 'technology', 'urban', 'dark', 'glowing', 'city'],
  'anime': ['anime', 'manga', 'japanese', 'character', 'cartoon', 'stylized', 'animation'],
  'cinematic': ['cinematic', 'dramatic', 'movie', 'film', 'scene', 'epic', 'wide shot', 'lighting'],
  'fantasy-art': ['fantasy', 'magical', 'epic', 'mythical', 'dragon', 'wizard', 'magic', 'medieval', 'mystical'],
  'sci-fi': ['sci-fi', 'futuristic', 'space', 'robot', 'alien', 'spaceship', 'advanced', 'technology'],
  'minimalist': ['minimalist', 'clean', 'simple', 'minimal', 'white', 'space', 'essential']
};

const CONTEXT_KEYWORDS = {
  'portrait': ['person', 'face', 'head', 'human', 'character', 'portrait'],
  'landscape': ['landscape', 'mountain', 'forest', 'ocean', 'sky', 'nature', 'outdoor'],
  'architecture': ['building', 'house', 'city', 'structure', 'urban', 'architecture'],
  'animal': ['animal', 'cat', 'dog', 'bird', 'wildlife', 'creature'],
  'abstract': ['abstract', 'pattern', 'geometric', 'shapes', 'design']
};

export const useStyleRecommendations = (prompt: string) => {
  const [recommendations, setRecommendations] = useState<StyleRecommendation[]>([]);

  useEffect(() => {
    if (!prompt.trim()) {
      setRecommendations([]);
      return;
    }

    const promptLower = prompt.toLowerCase();
    const styleScores: Record<string, { score: number; matches: string[] }> = {};

    // Analyze prompt for style keywords
    Object.entries(PROMPT_STYLE_KEYWORDS).forEach(([styleId, keywords]) => {
      let score = 0;
      const matches: string[] = [];
      
      keywords.forEach(keyword => {
        if (promptLower.includes(keyword)) {
          score += 1;
          matches.push(keyword);
        }
      });
      
      if (score > 0) {
        styleScores[styleId] = { score, matches };
      }
    });

    // Boost scores based on context
    const contextBoosts: Record<string, string[]> = {
      'portrait': ['photorealistic', 'oil-painting', 'anime'],
      'landscape': ['watercolor', 'oil-painting', 'cinematic'],
      'architecture': ['photorealistic', 'cyberpunk', 'sci-fi'],
      'animal': ['photorealistic', 'watercolor', 'digital-art'],
      'abstract': ['digital-art', 'minimalist']
    };

    Object.entries(CONTEXT_KEYWORDS).forEach(([context, keywords]) => {
      const hasContext = keywords.some(keyword => promptLower.includes(keyword));
      if (hasContext && contextBoosts[context]) {
        contextBoosts[context].forEach(styleId => {
          if (styleScores[styleId]) {
            styleScores[styleId].score += 0.5;
          } else {
            styleScores[styleId] = { score: 0.5, matches: [context] };
          }
        });
      }
    });

    // Convert to recommendations
    const newRecommendations = Object.entries(styleScores)
      .map(([styleId, { score, matches }]) => ({
        styleId,
        reason: `Detected "${matches.slice(0, 2).join(', ')}" in your prompt`,
        confidence: Math.min(score / 2, 1) // Normalize to 0-1
      }))
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3);

    // Add fallback recommendations for generic prompts
    if (newRecommendations.length === 0) {
      const fallbackRecommendations = [
        {
          styleId: 'photorealistic',
          reason: 'Popular choice for detailed images',
          confidence: 0.6
        },
        {
          styleId: 'digital-art',
          reason: 'Great for colorful illustrations',
          confidence: 0.5
        }
      ];
      setRecommendations(fallbackRecommendations);
    } else {
      setRecommendations(newRecommendations);
    }
  }, [prompt]);

  return recommendations;
};
