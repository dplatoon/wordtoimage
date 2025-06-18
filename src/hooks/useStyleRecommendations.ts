
import { useState, useEffect } from 'react';

interface StyleRecommendation {
  styleId: string;
  reason: string;
  confidence: number;
}

const PROMPT_STYLE_KEYWORDS = {
  'photorealistic': ['realistic', 'photo', 'photography', 'real', 'detailed', 'lifelike'],
  'digital-art': ['digital', 'modern', 'contemporary', 'vibrant', 'colorful'],
  'oil-painting': ['classical', 'traditional', 'painterly', 'brushstrokes', 'artistic'],
  'watercolor': ['soft', 'flowing', 'gentle', 'pastel', 'light', 'delicate'],
  'cyberpunk': ['futuristic', 'neon', 'cyber', 'sci-fi', 'technology', 'urban'],
  'anime': ['anime', 'manga', 'japanese', 'character', 'cartoon', 'stylized']
};

export const useStyleRecommendations = (prompt: string) => {
  const [recommendations, setRecommendations] = useState<StyleRecommendation[]>([]);

  useEffect(() => {
    if (!prompt.trim()) {
      setRecommendations([]);
      return;
    }

    const promptLower = prompt.toLowerCase();
    const styleScores: Record<string, number> = {};

    // Analyze prompt for style keywords
    Object.entries(PROMPT_STYLE_KEYWORDS).forEach(([styleId, keywords]) => {
      let score = 0;
      keywords.forEach(keyword => {
        if (promptLower.includes(keyword)) {
          score += 1;
        }
      });
      if (score > 0) {
        styleScores[styleId] = score;
      }
    });

    // Convert to recommendations
    const newRecommendations = Object.entries(styleScores)
      .map(([styleId, score]) => ({
        styleId,
        reason: `Detected "${styleId.replace('-', ' ')}" style keywords in your prompt`,
        confidence: Math.min(score / 3, 1) // Normalize to 0-1
      }))
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3);

    setRecommendations(newRecommendations);
  }, [prompt]);

  return recommendations;
};
