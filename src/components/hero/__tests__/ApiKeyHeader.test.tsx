
import { render, fireEvent, screen } from '@testing-library/react';
import { ApiKeyHeader } from '../ApiKeyHeader';
import { describe, it, expect, vi } from 'vitest';

// We don't need custom type declarations as they're handled in setup.ts

describe('ApiKeyHeader', () => {
  it('should render with "Add API Key" when no key is present', () => {
    render(<ApiKeyHeader tempApiKey="" onUpdateApiKey={() => {}} />);
    
    expect(screen.getByText('Powered by OpenAI DALL-E 3')).toBeInTheDocument();
    expect(screen.getByText('Add API Key')).toBeInTheDocument();
  });

  it('should render with "Update API Key" when key is present', () => {
    render(<ApiKeyHeader tempApiKey="fake-key" onUpdateApiKey={() => {}} />);
    
    expect(screen.getByText('Update API Key')).toBeInTheDocument();
  });

  it('should call onUpdateApiKey when button is clicked', () => {
    const mockOnUpdate = vi.fn();
    render(<ApiKeyHeader tempApiKey="" onUpdateApiKey={mockOnUpdate} />);
    
    fireEvent.click(screen.getByText('Add API Key'));
    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
  });
});
