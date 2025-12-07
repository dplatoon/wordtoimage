import { motion } from 'framer-motion';
import { Wand2, Upload, Palette, Image, Sparkles, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const quickActions = [
  {
    title: 'Generate Image',
    description: 'Create from text',
    icon: Wand2,
    href: '/text-to-image',
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    title: 'AI Enhance',
    description: 'Upscale & edit',
    icon: Sparkles,
    href: '/ai-enhance',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    title: 'Style Gallery',
    description: 'Browse styles',
    icon: Palette,
    href: '/ai-templates',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    title: 'Batch Generate',
    description: 'Multiple at once',
    icon: Layers,
    href: '/batch-generator',
    gradient: 'from-cyan-500 to-blue-600'
  }
];

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
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
                  <div className="group p-4 rounded-xl bg-muted/50 hover:bg-muted border border-transparent hover:border-primary/20 transition-all duration-300">
                    <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${action.gradient} mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-medium text-foreground text-sm">{action.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
