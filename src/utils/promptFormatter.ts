
/**
 * Formats a raw prompt with a style prefix
 * @param rawPrompt The user-entered prompt text
 * @param style The selected style option
 * @returns Formatted prompt with style prefix in brackets
 */
export const formatPrompt = (rawPrompt: string, style: string): string => {
  const trimmedPrompt = rawPrompt.trim();
  if (!trimmedPrompt) return '';
  
  return `[${style}] ${trimmedPrompt}`;
};

/**
 * Truncates a prompt to the specified maximum length
 * @param prompt The prompt to truncate
 * @param maxLength Maximum allowed length
 * @returns Truncated prompt
 */
export const truncatePrompt = (prompt: string, maxLength: number): string => {
  if (prompt.length <= maxLength) return prompt;
  return prompt.slice(0, maxLength);
};
