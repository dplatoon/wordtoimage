
import { PenTool, Wand2, Download } from 'lucide-react';

export const steps = [
  {
    title: "Enter Your Text",
    description: "Input any text or phrase that you want to visualize. Our AI understands complex descriptions and contexts.",
    icon: PenTool,
    color: "bg-blue-100 text-blue-600",
    demoContent: "Type your prompt here, like 'A sunset over a calm ocean with sailboats on the horizon'...",
  },
  {
    title: "Choose a Style",
    description: "Select from a variety of artistic styles, from photorealistic to abstract art and everything in between.",
    icon: Wand2,
    color: "bg-purple-100 text-purple-600",
    demoContent: "Choose your preferred style: Photorealistic, Watercolor, Oil Painting, Digital Art, Sketch...",
  },
  {
    title: "Generate & Download",
    description: "Our AI instantly creates your image. Preview, adjust if needed, and download in high resolution.",
    icon: Download,
    color: "bg-green-100 text-green-600",
    demoContent: "Your image is ready! Click to download in PNG, JPG, or SVG formats.",
  }
];
