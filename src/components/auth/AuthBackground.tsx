
import { Sparkles, Palette } from 'lucide-react';

export function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-100 to-blue-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full opacity-30 blur-3xl"></div>
      <Sparkles className="absolute top-20 right-20 h-6 w-6 text-violet-300 opacity-40" />
      <Palette className="absolute bottom-32 left-20 h-8 w-8 text-blue-300 opacity-30" />
    </div>
  );
}
