
export interface ComparisonFeature {
  name: string;
  free: boolean;
  pro: boolean;
}

export interface ComparisonCategory {
  category: string;
  features: ComparisonFeature[];
}

export const comparisonFeatures: ComparisonCategory[] = [
  {
    category: 'Image Generation',
    features: [
      { name: 'Basic AI generation', free: true, pro: true },
      { name: 'HD quality (2K+)', free: false, pro: true },
      { name: 'Watermark removal', free: false, pro: true },
      { name: 'Unlimited generations', free: false, pro: true },
      { name: 'Priority processing', free: false, pro: true },
    ]
  },
  {
    category: 'Styles & Features',
    features: [
      { name: 'Basic styles (5)', free: true, pro: false },
      { name: 'Premium styles (50+)', free: false, pro: true },
      { name: 'Custom style upload', free: false, pro: true },
      { name: 'Batch generation', free: false, pro: true },
      { name: 'Image-to-image transform', free: false, pro: true },
    ]
  },
  {
    category: 'Storage & Export',
    features: [
      { name: 'Gallery storage (10 images)', free: true, pro: false },
      { name: 'Unlimited gallery storage', free: false, pro: true },
      { name: 'High-res downloads', free: false, pro: true },
      { name: 'Bulk export', free: false, pro: true },
      { name: 'Cloud sync', free: false, pro: true },
    ]
  }
];
