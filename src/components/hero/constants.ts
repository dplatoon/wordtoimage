
export const MAX_PROMPT_LENGTH = 200;

export const DEFAULT_STYLES = [
  'Photorealistic',
  'Watercolor',
  'Low-poly',
  'Digital Art',
  'Anime',
  'Pixel Art',
  'Pencil Sketch'
] as const;

export type ArtStyle = typeof DEFAULT_STYLES[number];

export const RESOLUTIONS = ['512x512', '1024x1024'] as const;
export type Resolution = typeof RESOLUTIONS[number];

export const IMAGE_COUNTS = [1, 2, 3, 4] as const;
export type ImageCount = typeof IMAGE_COUNTS[number];
