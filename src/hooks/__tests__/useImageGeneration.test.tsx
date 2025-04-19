
import { renderHook, act } from '@testing-library/react';
import { useImageGeneration } from '../useImageGeneration';
import { generateImage } from '@/services/runwareService';
import { toast } from '@/components/ui/sonner';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('@/services/runwareService', () => ({
  generateImage: vi.fn()
}));

vi.mock('@/components/ui/sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn()
  }
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

  it('should handle empty API key', async () => {
    const { result } = renderHook(() => useImageGeneration(mockProps));

    await act(async () => {
      await result.current.generateImageFromPrompt('test prompt', '', false);
    });

    expect(toast.error).toHaveBeenCalledWith('API Key Required', expect.any(Object));
    expect(mockProps.onGeneratingChange).not.toHaveBeenCalled();
  });

  it('should handle empty prompt', async () => {
    const { result } = renderHook(() => useImageGeneration(mockProps));

    await act(async () => {
      await result.current.generateImageFromPrompt('', 'fake-api-key', false);
    });

    expect(toast.error).toHaveBeenCalled();
    expect(mockProps.onGeneratingChange).not.toHaveBeenCalled();
  });

  it('should handle successful image generation', async () => {
    const mockImageUrl = 'https://example.com/image.jpg';
    (generateImage as any).mockResolvedValueOnce({ imageUrl: mockImageUrl });

    const { result } = renderHook(() => useImageGeneration(mockProps));

    await act(async () => {
      await result.current.generateImageFromPrompt('test prompt', 'fake-api-key', false);
    });

    expect(mockProps.onImageGenerated).toHaveBeenCalledWith(mockImageUrl);
    expect(mockProps.onGeneratingChange).toHaveBeenCalledTimes(2);
    expect(toast.success).toHaveBeenCalledWith('Image Generated!', expect.any(Object));
  });

  it('should handle API error', async () => {
    const mockError = new Error('API Error');
    (generateImage as any).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useImageGeneration(mockProps));

    await act(async () => {
      await result.current.generateImageFromPrompt('test prompt', 'fake-api-key', false);
    });

    expect(mockProps.onError).toHaveBeenCalled();
    expect(mockProps.onGeneratingChange).toHaveBeenCalledTimes(2);
    expect(toast.error).toHaveBeenCalled();
  });

  it('should prevent concurrent retries', async () => {
    const { result } = renderHook(() => useImageGeneration(mockProps));
    
    // Start a retry
    await act(async () => {
      await result.current.generateImageFromPrompt('test prompt', 'fake-api-key', true);
    });

    // Try to generate while retrying
    await act(async () => {
      await result.current.generateImageFromPrompt('test prompt', 'fake-api-key', false);
    });

    expect(generateImage).toHaveBeenCalledTimes(1);
  });
});
