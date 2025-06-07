
import { Image, Sparkles, Wand2 } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="text-center px-4 sm:px-8 py-8 w-full h-full flex flex-col items-center justify-center">
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-lg border border-white/50">
          <div className="relative">
            <Image className="h-12 w-12 text-indigo-500" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute -bottom-1 -right-3 w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 -left-4 w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="space-y-3 max-w-sm">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center justify-center">
          <Wand2 className="h-5 w-5 mr-2 text-indigo-500" />
          Ready to Create Magic?
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          Describe your vision above and watch our AI transform your words into stunning artwork
        </p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-center text-xs text-gray-500">
            <Sparkles className="h-3 w-3 mr-1" />
            <span>Try: "A peaceful forest with morning sunlight"</span>
          </div>
          <div className="flex items-center justify-center text-xs text-gray-500">
            <Sparkles className="h-3 w-3 mr-1" />
            <span>Or: "Futuristic city skyline at sunset"</span>
          </div>
        </div>
      </div>
    </div>
  );
};
