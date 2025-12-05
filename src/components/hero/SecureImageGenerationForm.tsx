import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Wand2, Clock, Shield, Zap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { generateImage } from '@/services/api/imageGeneration';
import { toast } from 'sonner';

interface SecureImageGenerationFormProps {
  onImageGenerated?: (url: string) => void;
  onError?: (error: string) => void;
}

interface GenerationProgress {
  status: 'starting' | 'processing' | 'succeeded' | 'failed';
  progress: number;
  estimatedTime?: number;
}

const STYLE_OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: '3d_anime', label: '3D Anime' },
  { value: 'japanese_anime', label: 'Japanese Anime' },
  { value: 'movie', label: 'Photorealistic' },
  { value: 'comic', label: 'Comic Book' }
];

const RESOLUTION_OPTIONS = [
  { value: '1024x1024', label: '1024×1024 (Square)' },
  { value: '1792x1024', label: '1792×1024 (Landscape)' },
  { value: '1024x1792', label: '1024×1792 (Portrait)' }
];

export const SecureImageGenerationForm: React.FC<SecureImageGenerationFormProps> = ({
  onImageGenerated,
  onError
}) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('auto');
  const [resolution, setResolution] = useState('1024x1024');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generationStats, setGenerationStats] = useState<{
    totalGenerated: number;
    successRate: number;
    avgGenerationTime: number;
  }>({ totalGenerated: 0, successRate: 100, avgGenerationTime: 15 });

  const { user } = useAuth();

  useEffect(() => {
    const loadStats = () => {
      const stats = localStorage.getItem('generationStats');
      if (stats) {
        try {
          setGenerationStats(JSON.parse(stats));
        } catch (error) {
          console.error('Failed to parse generation stats:', error);
        }
      }
    };

    loadStats();
  }, []);

  const updateStats = useCallback((success: boolean, generationTime: number) => {
    setGenerationStats(prev => {
      const newStats = {
        totalGenerated: prev.totalGenerated + 1,
        successRate: success 
          ? ((prev.successRate * prev.totalGenerated + 100) / (prev.totalGenerated + 1))
          : ((prev.successRate * prev.totalGenerated) / (prev.totalGenerated + 1)),
        avgGenerationTime: (prev.avgGenerationTime * prev.totalGenerated + generationTime) / (prev.totalGenerated + 1)
      };
      
      localStorage.setItem('generationStats', JSON.stringify(newStats));
      return newStats;
    });
  }, []);

  const validatePrompt = useCallback((prompt: string): { isValid: boolean; message?: string } => {
    if (!prompt.trim()) {
      return { isValid: false, message: 'Please enter a description for your image' };
    }

    if (prompt.length > 1000) {
      return { isValid: false, message: 'Prompt too long (max 1000 characters)' };
    }

    const nsfw = ['nude', 'naked', 'sexual', 'explicit', 'adult', 'nsfw'];
    const lowerPrompt = prompt.toLowerCase();
    const hasNSFW = nsfw.some(word => lowerPrompt.includes(word));
    
    if (hasNSFW) {
      return { isValid: false, message: 'Please use family-friendly content only' };
    }

    return { isValid: true };
  }, []);

  const handleGenerate = useCallback(async () => {
    const validation = validatePrompt(prompt);
    if (!validation.isValid) {
      setError(validation.message || 'Invalid prompt');
      return;
    }

    if (!user) {
      setError('Please sign in to generate images');
      toast.error('Authentication Required', {
        description: 'Please sign in to generate images.',
      });
      return;
    }

    setIsGenerating(true);
    setError(null);
    setProgress({ status: 'starting', progress: 0 });
    setGeneratedImage(null);

    const startTime = Date.now();

    try {
      setProgress({ status: 'processing', progress: 30, estimatedTime: 15 });

      const result = await generateImage({
        prompt: prompt.trim(),
        style: style !== 'auto' ? style : undefined,
        resolution,
      });

      if (!result.success || !result.generation) {
        throw new Error(result.error || 'Generation failed');
      }

      setProgress({ status: 'succeeded', progress: 100 });

      const generationTime = (Date.now() - startTime) / 1000;
      const imageUrl = result.generation.image_url;
      
      setGeneratedImage(imageUrl);
      updateStats(true, generationTime);
      onImageGenerated?.(imageUrl);

      const creditsMsg = result.creditsRemaining === "unlimited" 
        ? "Premium - unlimited generations" 
        : `${result.creditsRemaining} credits remaining`;

      toast.success('Image Generated!', {
        description: `Created in ${generationTime.toFixed(1)}s. ${creditsMsg}`,
      });

    } catch (error) {
      const generationTime = (Date.now() - startTime) / 1000;
      const errorMessage = error instanceof Error ? error.message : 'Generation failed';
      
      setProgress({ status: 'failed', progress: 0 });
      setError(errorMessage);
      updateStats(false, generationTime);
      onError?.(errorMessage);

    } finally {
      setIsGenerating(false);
      setTimeout(() => setProgress(null), 2000);
    }
  }, [prompt, style, resolution, user, validatePrompt, updateStats, onImageGenerated, onError]);

  const getRemainingCharacters = () => 1000 - prompt.length;
  const isPromptValid = validatePrompt(prompt).isValid;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Security & Performance Indicators */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Secure Generation</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Optimized Performance</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-gray-600">
          <div>Generated: {generationStats.totalGenerated}</div>
          <div>Success: {generationStats.successRate.toFixed(1)}%</div>
          <div>Avg: {generationStats.avgGenerationTime.toFixed(1)}s</div>
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Prompt Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="prompt" className="text-sm font-medium text-gray-700">
                Describe your image
              </label>
              <Badge variant={getRemainingCharacters() < 100 ? "destructive" : "secondary"}>
                {getRemainingCharacters()} chars left
              </Badge>
            </div>
            
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A beautiful sunset over the mountains with vibrant colors..."
              className={`min-h-[100px] resize-none ${!isPromptValid && prompt ? 'border-red-300' : ''}`}
              disabled={isGenerating}
              maxLength={1000}
            />
            
            {!isPromptValid && prompt && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {validatePrompt(prompt).message}
              </p>
            )}
          </div>

          {/* Style and Resolution Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Art Style</label>
              <Select value={style} onValueChange={setStyle} disabled={isGenerating}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STYLE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Resolution</label>
              <Select value={resolution} onValueChange={setResolution} disabled={isGenerating}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RESOLUTION_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Generation Progress */}
          {progress && (
            <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">
                  {progress.status === 'starting' && 'Initializing...'}
                  {progress.status === 'processing' && 'Generating your image...'}
                  {progress.status === 'succeeded' && 'Complete!'}
                  {progress.status === 'failed' && 'Generation failed'}
                </span>
                {progress.estimatedTime && progress.estimatedTime > 0 && (
                  <div className="flex items-center space-x-1 text-xs text-blue-600">
                    <Clock className="h-3 w-3" />
                    <span>{Math.ceil(progress.estimatedTime)}s remaining</span>
                  </div>
                )}
              </div>
              
              <Progress value={progress.progress} className="h-2" />
              
              <div className="text-xs text-blue-600">
                {progress.progress.toFixed(0)}% complete
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!isPromptValid || isGenerating || !user}
            className="w-full h-12 text-lg font-medium bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
          >
            {isGenerating ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Wand2 className="h-5 w-5" />
                <span>{user ? 'Generate Secure Image' : 'Sign in to Generate'}</span>
              </div>
            )}
          </Button>
        </div>

        {/* Generated Image Display */}
        {generatedImage && (
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Generated Image</h3>
              <img
                src={generatedImage}
                alt="Generated image"
                className="w-full max-w-md mx-auto h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
