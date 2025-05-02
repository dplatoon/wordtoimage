
import { PenTool, Wand2, Download } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  demoContent: string;
  illustration?: string; // Added illustration property for screenshots
}

export const steps: Step[] = [
  {
    title: "Enter Your Text",
    description: "Input any text or phrase that you want to visualize. Our AI understands complex descriptions and contexts.",
    icon: PenTool,
    color: "bg-blue-100 text-blue-600",
    demoContent: "Type your prompt here, like 'A sunset over a calm ocean with sailboats on the horizon'...",
    illustration: "/lovable-uploads/60da266c-4810-4f41-9449-ae54c2026373.png"
  },
  {
    title: "Choose a Style",
    description: "Select from a variety of artistic styles, from photorealistic to abstract art and everything in between.",
    icon: Wand2,
    color: "bg-purple-100 text-purple-600",
    demoContent: "Choose your preferred style: Photorealistic, Watercolor, Oil Painting, Digital Art, Sketch...",
    illustration: "/lovable-uploads/610669b3-849e-4ee2-a163-df90a0e6704e.png"
  },
  {
    title: "Generate & Download",
    description: "Our AI instantly creates your image. Preview, adjust if needed, and download in high resolution.",
    icon: Download,
    color: "bg-green-100 text-green-600",
    demoContent: "Your image is ready! Click to download in PNG, JPG, or SVG formats.",
    illustration: "/lovable-uploads/7f38eaf1-216c-4148-b05c-9a2f87de6ffc.png"
  }
];
