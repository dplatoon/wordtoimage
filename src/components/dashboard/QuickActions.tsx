import { motion } from 'framer-motion';
import { Wand2, Upload, Palette, Image, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickActions = [
  {
    title: 'Generate Image',
    description: 'Create from text',
    icon: Wand2,
    href: '/text-to-image',
    gradient: 'from-primary to-neon-coral'
  },
  {
    title: 'AI Enhance',
    description: 'Upscale & edit',
    icon: Sparkles,
    href: '/ai-enhance',
    gradient: 'from-neon-coral to-neon-amber'
  },
  {
    title: 'Style Gallery',
    description: 'Browse styles',
    icon: Palette,
    href: '/ai-templates',
    gradient: 'from-neon-amber to-primary'
  },
  {
    title: 'Batch Generate',
    description: 'Multiple at once',
    icon: Layers,
    href: '/batch-generator',
    gradient: 'from-primary via-neon-coral to-neon-amber'
  }
];

export const QuickActions = () => {
  return (
    <div className="glass-card rounded-2xl p-6 border-primary/20">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={action.href}>
                <div className="group relative p-4 rounded-xl bg-background/50 hover:bg-background/80 border border-primary/10 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                  {/* Hover glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative">
                    <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${action.gradient} mb-3 group-hover:scale-110 group-hover:shadow-neon transition-all duration-300`}>
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground text-sm">{action.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};