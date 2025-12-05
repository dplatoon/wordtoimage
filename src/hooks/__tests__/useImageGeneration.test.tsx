import { renderHook, act } from '@testing-library/react';
import { useImageGeneration } from '../useImageGeneration';
import { generateImage } from '@/services/api/imageGeneration';
import { toast } from 'sonner';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('@/services/api/imageGeneration', () => ({
  generateImage: vi.fn()
}));

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn()
  }
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'test-user-id' } })
}));

describe('useImageGeneration', () => {
  const mockProps = {
    onImageGenerated: vi.fn(),
    onGeneratingChange: vi.fn(),
    onError: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle empty prompt', async () => {
    const { result } = renderHook(() => useImageGeneration(mockProps));

    await act(async () => {
      await result.current.generateImageFromPrompt('', '', false);
    });

    expect(toast.error).toHaveBeenCalledWith('Empty Prompt', expect.any(Object));
    expect(mockProps.onGeneratingChange).not.toHaveBeenCalled();
  });

  it('should handle successful image generation', async () => {
    const mockImageUrl = 'https://example.com/image.jpg';
    (generateImage as any).mockResolvedValueOnce({ 
      success: true, 
      generation: { image_url: mockImageUrl },
      creditsRemaining: 9 
    });

    const { result } = renderHook(() => useImageGeneration(mockProps));

    await act(async () => {
      await result.current.generateImageFromPrompt('test prompt', '', false);
    });

    expect(mockProps.onImageGenerated).toHaveBeenCalledWith(mockImageUrl);
    expect(mockProps.onGeneratingChange).toHaveBeenCalledTimes(2);
    expect(toast.success).toHaveBeenCalledWith('Image Generated!', expect.any(Object));
  });

  it('should handle API error', async () => {
    (generateImage as any).mockResolvedValueOnce({ 
      success: false, 
      error: 'API Error' 
    });

    const { result } = renderHook(() => useImageGeneration(mockProps));

    await act(async () => {
      await result.current.generateImageFromPrompt('test prompt', '', false);
    });

    expect(mockProps.onError).toHaveBeenCalled();
    expect(mockProps.onGeneratingChange).toHaveBeenCalledTimes(2);
    expect(toast.error).toHaveBeenCalled();
  });

  it('should handle insufficient credits error', async () => {
    (generateImage as any).mockResolvedValueOnce({ 
      success: false, 
      error: 'Insufficient credits' 
    });

    const { result } = renderHook(() => useImageGeneration(mockProps));

    await act(async () => {
      await result.current.generateImageFromPrompt('test prompt', '', false);
    });

    expect(toast.error).toHaveBeenCalledWith('Out of Credits', expect.any(Object));
  });
});
