
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle, Palette } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface StyleDNAQuizProps {
  onComplete: (profile: StyleProfile) => void;
  onClose: () => void;
}

interface StyleProfile {
  primaryStyle: string;
  secondaryStyle: string;
  colorPreference: string;
  roomType: string;
  lifestyle: string;
  personalityType: string;
}

const quizQuestions = [
  {
    id: 1,
    question: "What's your ideal weekend activity?",
    type: "lifestyle",
    options: [
      { value: "cozy-home", label: "Relaxing at home with a book", style: "cozy" },
      { value: "social-gathering", label: "Hosting friends for dinner", style: "modern" },
      { value: "outdoor-adventure", label: "Hiking or outdoor sports", style: "rustic" },
      { value: "cultural-exploration", label: "Visiting museums or galleries", style: "classic" }
    ]
  },
  {
    id: 2,
    question: "Which color palette speaks to you?",
    type: "color",
    options: [
      { value: "warm-neutrals", label: "Warm beiges and creams", style: "cozy" },
      { value: "bold-contrasts", label: "Black, white, and bold accents", style: "modern" },
      { value: "earthy-tones", label: "Browns, greens, and natural hues", style: "rustic" },
      { value: "rich-jewels", label: "Deep blues, emeralds, and golds", style: "classic" }
    ]
  },
  {
    id: 3,
    question: "Your dream room priority is:",
    type: "room",
    options: [
      { value: "comfort-first", label: "Maximum comfort and coziness", style: "cozy" },
      { value: "clean-functional", label: "Clean lines and functionality", style: "modern" },
      { value: "natural-materials", label: "Natural textures and materials", style: "rustic" },
      { value: "timeless-elegance", label: "Timeless elegance and sophistication", style: "classic" }
    ]
  },
  {
    id: 4,
    question: "How do you make decisions?",
    type: "personality",
    options: [
      { value: "intuitive-feeling", label: "Follow my heart and intuition", style: "cozy" },
      { value: "logical-practical", label: "Analyze data and be practical", style: "modern" },
      { value: "experience-based", label: "Based on past experiences", style: "rustic" },
      { value: "research-thorough", label: "Research thoroughly first", style: "classic" }
    ]
  }
];

const styleProfiles = {
  modern: {
    name: "Modern Minimalist",
    description: "You love clean lines, open spaces, and functional beauty",
    traits: ["Organized", "Forward-thinking", "Efficiency-focused"],
    colorPalette: ["#000000", "#FFFFFF", "#6366F1", "#10B981"]
  },
  cozy: {
    name: "Cozy Comfort",
    description: "You prioritize warmth, comfort, and intimate spaces",
    traits: ["Nurturing", "Family-oriented", "Comfort-seeking"],
    colorPalette: ["#D2B48C", "#F5E6D3", "#8B4513", "#CD853F"]
  },
  rustic: {
    name: "Natural Rustic",
    description: "You're drawn to natural materials and earthy aesthetics",
    traits: ["Authentic", "Nature-loving", "Grounded"],
    colorPalette: ["#8B4513", "#228B22", "#DAA520", "#A0522D"]
  },
  classic: {
    name: "Timeless Classic",
    description: "You appreciate traditional elegance and refined details",
    traits: ["Sophisticated", "Quality-focused", "Traditional"],
    colorPalette: ["#000080", "#FFD700", "#8B0000", "#2F4F4F"]
  }
};

export const StyleDNAQuiz = ({ onComplete, onClose }: StyleDNAQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [profile, setProfile] = useState<StyleProfile | null>(null);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (value: string, style: string) => {
    const question = quizQuestions[currentQuestion];
    setAnswers(prev => ({
      ...prev,
      [question.type]: value,
      [`${question.type}_style`]: style
    }));

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate style profile
      const styleScores = { modern: 0, cozy: 0, rustic: 0, classic: 0 };
      Object.keys(answers).forEach(key => {
        if (key.includes('_style')) {
          const style = answers[key];
          styleScores[style as keyof typeof styleScores]++;
        }
      });
      
      // Add current answer
      styleScores[style as keyof typeof styleScores]++;
      
      const sortedStyles = Object.entries(styleScores).sort(([,a], [,b]) => b - a);
      const primaryStyle = sortedStyles[0][0];
      const secondaryStyle = sortedStyles[1][0];
      
      const generatedProfile: StyleProfile = {
        primaryStyle,
        secondaryStyle,
        colorPreference: answers.color || 'warm-neutrals',
        roomType: answers.room || 'comfort-first',
        lifestyle: answers.lifestyle || 'cozy-home',
        personalityType: answers.personality || 'intuitive-feeling'
      };
      
      setProfile(generatedProfile);
      setIsCompleted(true);
    }
  };

  const handleComplete = () => {
    if (profile) {
      onComplete(profile);
      toast.success("Your Style DNA is ready!", {
        description: "We'll use this to generate perfect designs for you"
      });
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  if (isCompleted && profile) {
    const primaryStyleInfo = styleProfiles[profile.primaryStyle as keyof typeof styleProfiles];
    
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full">
              <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Style DNA Results
          </CardTitle>
          <CheckCircle className="h-6 w-6 text-green-500 mx-auto mt-2" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {primaryStyleInfo.name}
            </h3>
            <p className="text-gray-600 mb-4">{primaryStyleInfo.description}</p>
            
            <div className="flex justify-center gap-2 mb-4">
              {primaryStyleInfo.colorPalette.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            <div className="flex justify-center gap-2 mb-6">
              {primaryStyleInfo.traits.map((trait, index) => (
                <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                  {trait}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">🎨 Your Perfect Design Mix:</h4>
            <p className="text-sm text-gray-600">
              Primary: <strong>{styleProfiles[profile.primaryStyle as keyof typeof styleProfiles].name}</strong> • 
              Secondary: <strong>{styleProfiles[profile.secondaryStyle as keyof typeof styleProfiles].name}</strong>
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleComplete} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Palette className="h-4 w-4 mr-2" />
              Generate My Perfect Room
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </Badge>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
        
        <Progress value={progress} className="h-2 mb-4" />
        
        <CardTitle className="text-xl font-semibold text-gray-800">
          {question.question}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full p-4 h-auto text-left justify-start hover:bg-purple-50 hover:border-purple-300"
            onClick={() => handleAnswer(option.value, option.style)}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-gray-700">{option.label}</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
          </Button>
        ))}
        
        <div className="flex justify-between pt-4">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={currentQuestion === 0}
            className="text-gray-500"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          
          <span className="text-sm text-gray-500 self-center">
            {Math.round(progress)}% complete
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
