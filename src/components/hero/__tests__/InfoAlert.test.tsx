
import { render, screen } from '@testing-library/react';
import { InfoAlert } from '../InfoAlert';
import { describe, it, expect } from 'vitest';

// Add type assertion to extend the global namespace
declare global {
  namespace Vi {
    interface JestAssertion {
      toBeInTheDocument(): void;
      toHaveAttribute(attr: string, value?: string): void;
    }
  }
}

describe('InfoAlert', () => {
  it('should render all text content correctly', () => {
    render(<InfoAlert />);
    
    expect(screen.getByText('Create Images with DALL-E 3')).toBeInTheDocument();
    expect(screen.getByText(/Generate high-quality, photorealistic images/)).toBeInTheDocument();
    
    const link = screen.getByText('Get your key');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://platform.openai.com/api-keys');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
