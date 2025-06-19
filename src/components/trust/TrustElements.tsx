
import React from 'react';
import { Shield, Lock, Award, CheckCircle } from 'lucide-react';

export const TrustElements = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Trusted by 50,000+ Creators
        </h3>
        <p className="text-gray-600 text-sm">
          Enterprise-grade security and quality you can rely on
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Security Badge */}
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
          <Shield className="w-5 h-5 text-green-600" />
          <div>
            <div className="font-semibold text-green-800 text-sm">Secure</div>
            <div className="text-green-600 text-xs">SSL Encrypted</div>
          </div>
        </div>

        {/* Privacy Badge */}
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <Lock className="w-5 h-5 text-blue-600" />
          <div>
            <div className="font-semibold text-blue-800 text-sm">Private</div>
            <div className="text-blue-600 text-xs">GDPR Compliant</div>
          </div>
        </div>

        {/* Quality Badge */}
        <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
          <Award className="w-5 h-5 text-purple-600" />
          <div>
            <div className="font-semibold text-purple-800 text-sm">Quality</div>
            <div className="text-purple-600 text-xs">99.9% Uptime</div>
          </div>
        </div>

        {/* Satisfaction Badge */}
        <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-yellow-600" />
          <div>
            <div className="font-semibold text-yellow-800 text-sm">Rated</div>
            <div className="text-yellow-600 text-xs">4.9/5 Stars</div>
          </div>
        </div>
      </div>

      {/* Sample Images Row */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Recent Creations:</span>
          <span className="text-xs text-gray-500">Updated live</span>
        </div>
        <div className="flex gap-2 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white text-xs font-bold animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              AI
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
