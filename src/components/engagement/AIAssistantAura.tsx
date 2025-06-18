
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, X, Lightbulb, Wand2, MessageCircle, Sparkles, HelpCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';

interface AIAssistantAuraProps {
  onQuizStart: () => void;
  onGenerateClick: () => void;
  currentPage?: string;
}

const auraMessages = {
  welcome: [
    "Hi! I'm Aura, your AI design assistant. Want to discover your Style DNA?",
    "Ready to transform your space? I can help you find your perfect style!",
    "✨ Welcome! Let me help you create stunning room designs personalized just for you."
  ],
  idle: [
    "Need design inspiration? Try our Style DNA Quiz!",
    "💡 Tip: Upload a photo of your room for instant AI transformation",
    "🎨 Want to see what's trending? Let me show you popular styles",
    "Stuck on ideas? I can suggest prompts based on your space!"
  ],
  encouragement: [
    "Great choice! Your style is coming together beautifully",
    "🌟 You have excellent taste! This design direction suits you perfectly",
    "I love where this is going! Your space will be amazing"
  ],
  tips: [
    "💡 Pro tip: Try adding 'natural lighting' to your prompts for better results",
    "🎯 Specific details like 'marble countertops' create more realistic images",
    "✨ Combine styles like 'modern rustic' for unique looks"
  ]
};

const contextualSuggestions = {
  homepage: [
    { icon: Sparkles, text: "Take Style DNA Quiz", action: "quiz" },
    { icon: Wand2, text: "Generate First Image", action: "generate" },
    { icon: Lightbulb, text: "Browse Style Ideas", action: "browse" }
  ],
  afterGeneration: [
    { icon: HelpCircle, text: "How to improve this?", action: "improve" },
    { icon: Sparkles, text: "Try another style", action: "newstyle" },
    { icon: MessageCircle, text: "Get design tips", action: "tips" }
  ]
};

export const AIAssistantAura = ({ onQuizStart, onGenerateClick, currentPage = "homepage" }: AIAssistantAuraProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageType, setMessageType] = useState<'welcome' | 'idle' | 'encouragement' | 'tips'>('welcome');
  const [hasInteracted, setHasInteracted] = useState(false);
  const { user } = useAuth();

  // Show Aura after a delay on first visit
  useEffect(() => {
    const hasSeenAura = localStorage.getItem('hasSeenAura');
    if (!hasSeenAura) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setCurrentMessage(auraMessages.welcome[0]);
        localStorage.setItem('hasSeenAura', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      // Show immediately for returning users
      setIsVisible(true);
      setCurrentMessage(auraMessages.idle[Math.floor(Math.random() * auraMessages.idle.length)]);
      setMessageType('idle');
    }
  }, []);

  // Rotate messages periodically
  useEffect(() => {
    if (!isVisible || isExpanded) return;
    
    const interval = setInterval(() => {
      const messages = auraMessages[messageType];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setCurrentMessage(randomMessage);
    }, 15000);

    return () => clearInterval(interval);
  }, [isVisible, isExpanded, messageType]);

  const handleExpand = () => {
    setIsExpanded(true);
    setHasInteracted(true);
    if (!user) {
      setCurrentMessage("I notice you haven't signed up yet. Creating an account unlocks unlimited generations and premium features!");
    }
  };

  const handleAction = (action: string) => {
    setHasInteracted(true);
    
    switch (action) {
      case 'quiz':
        onQuizStart();
        setCurrentMessage("Great choice! The Style DNA Quiz will help me understand your preferences better.");
        setMessageType('encouragement');
        break;
      case 'generate':
        onGenerateClick();
        setCurrentMessage("Perfect! Let's create something amazing together.");
        setMessageType('encouragement');
        break;
      case 'browse':
        setCurrentMessage("Check out the showcase section below for trending styles and inspiration!");
        break;
      case 'improve':
        setCurrentMessage("Try adding more specific details like materials, colors, or lighting conditions to your prompt!");
        setMessageType('tips');
        break;
      case 'newstyle':
        setCurrentMessage("Experiment with different styles! Try 'modern minimalist', 'cozy farmhouse', or 'luxury contemporary'.");
        setMessageType('tips');
        break;
      case 'tips':
        const randomTip = auraMessages.tips[Math.floor(Math.random() * auraMessages.tips.length)];
        setCurrentMessage(randomTip);
        setMessageType('tips');
        break;
      default:
        break;
    }
    
    toast.success("Aura is here to help!", {
      description: "Feel free to ask me anything about interior design"
    });
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('auraDismissed', 'true');
  };

  if (!isVisible) return null;

  const suggestions = contextualSuggestions[currentPage as keyof typeof contextualSuggestions] || contextualSuggestions.homepage;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      {/* Floating Assistant */}
      <div className="relative">
        {/* Message Bubble */}
        {!isExpanded && currentMessage && (
          <Card className="mb-4 bg-white shadow-lg border-purple-200 animate-fade-in">
            <CardContent className="p-3">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">{currentMessage}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Expanded Assistant Panel */}
        {isExpanded && (
          <Card className="mb-4 bg-white shadow-xl border-purple-200 w-80 animate-scale-in">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Aura</h3>
                    <p className="text-xs text-gray-500">AI Design Assistant</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-700">{currentMessage}</p>
                
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Quick Actions</p>
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-3 hover:bg-purple-50 hover:border-purple-300"
                      onClick={() => handleAction(suggestion.action)}
                    >
                      <suggestion.icon className="h-4 w-4 mr-2 text-purple-600" />
                      <span className="text-sm">{suggestion.text}</span>
                    </Button>
                  ))}
                </div>

                {!user && (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200">
                    <p className="text-xs text-purple-700 mb-2">
                      🎁 <strong>Pro Tip:</strong> Sign up for unlimited generations and premium features!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Floating Avatar */}
        <Button
          onClick={handleExpand}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 relative group"
        >
          <Bot className="h-6 w-6 text-white" />
          
          {/* Pulse animation for new users */}
          {!hasInteracted && (
            <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-30"></div>
          )}
          
          {/* Online indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with Aura
          </div>
        </Button>
      </div>
    </div>
  );
};
