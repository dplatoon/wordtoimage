import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap, Save, Database, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

interface ValuePropositionProps {
  className?: string;
}

const metrics = [
  {
    icon: Clock,
    value: "3-5s",
    label: "Generation",
    description: "Lightning fast AI processing"
  },
  {
    icon: Zap,
    value: "HD",
    label: "Quality",
    description: "Crystal clear 1024x1024 images"
  },
  {
    icon: Save,
    value: "Auto",
    label: "Save",
    description: "Every image saved automatically"
  },
  {
    icon: Database,
    value: "∞",
    label: "Storage",
    description: "Unlimited gallery space"
  }
];

export function ValueProposition({ className }: ValuePropositionProps) {
  return (
    <div className={className}>
      {/* Free Trial Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl p-4 mb-6"
      >
        <div className="flex items-center justify-center gap-2">
          <Gift className="h-5 w-5 text-emerald-600" />
          <span className="text-emerald-800 font-semibold">
            Try it free - first 3 images on us!
          </span>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-300">
            No signup required
          </Badge>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur border border-gray-200 rounded-lg p-4 text-center hover:bg-white/90 transition-all duration-200"
          >
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-primary/10 rounded-lg">
              <metric.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {metric.value}
            </div>
            <div className="text-sm font-medium text-gray-700 mb-1">
              {metric.label}
            </div>
            <div className="text-xs text-gray-500">
              {metric.description}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}