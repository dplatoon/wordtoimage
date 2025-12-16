import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

// Web Speech API type definitions
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  onEnhancedPrompt?: (text: string) => void;
  className?: string;
  language?: 'en-US' | 'bn-BD';
  enhancePrompt?: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscript,
  onEnhancedPrompt,
  className,
  language = 'en-US',
  enhancePrompt = true,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognitionInstance | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = language;
        setRecognition(recognitionInstance);
      }
    }
  }, [language]);

  const enhanceVoicePrompt = useCallback(async (transcript: string) => {
    if (!enhancePrompt || !onEnhancedPrompt) {
      onTranscript(transcript);
      return;
    }

    setIsEnhancing(true);
    try {
      const { data, error } = await supabase.functions.invoke('enhance-voice-prompt', {
        body: { transcript, language },
      });

      if (error) throw error;

      if (data?.enhancedPrompt) {
        onEnhancedPrompt(data.enhancedPrompt);
        toast({
          title: 'Voice enhanced',
          description: 'Your voice input has been enhanced for better results.',
        });
      } else {
        onTranscript(transcript);
      }
    } catch (error) {
      console.error('Error enhancing voice prompt:', error);
      onTranscript(transcript);
      toast({
        title: 'Enhancement failed',
        description: 'Using original voice input.',
        variant: 'destructive',
      });
    } finally {
      setIsEnhancing(false);
    }
  }, [enhancePrompt, onEnhancedPrompt, onTranscript, language, toast]);

  const startListening = useCallback(() => {
    if (!recognition) {
      toast({
        title: 'Not supported',
        description: 'Voice input is not supported in your browser.',
        variant: 'destructive',
      });
      return;
    }

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');

      if (event.results[0].isFinal) {
        setIsListening(false);
        enhanceVoicePrompt(transcript);
      } else {
        onTranscript(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      toast({
        title: 'Voice input error',
        description: 'Please try again.',
        variant: 'destructive',
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
      setIsListening(true);
      toast({
        title: 'Listening...',
        description: 'Speak your prompt now.',
      });
    } catch (error) {
      console.error('Error starting recognition:', error);
    }
  }, [recognition, enhanceVoicePrompt, onTranscript, toast]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  const isSupported = typeof window !== 'undefined' && 
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={isListening ? stopListening : startListening}
      disabled={isEnhancing}
      className={cn(
        'relative transition-all duration-300',
        isListening && 'text-primary animate-pulse',
        className
      )}
      title={isListening ? 'Stop listening' : 'Voice input'}
    >
      {isEnhancing ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : isListening ? (
        <>
          <MicOff className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-ping" />
        </>
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </Button>
  );
};

export default VoiceInput;
