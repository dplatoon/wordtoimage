import { motion } from 'framer-motion';
import { Image, Heart, Sparkles, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface DashboardOverviewProps {
  totalGenerations: number;
  totalFavorites: number;
  credits: number;
  subscriptionTier: string;
}

export const DashboardOverview = ({
  totalGenerations,
  totalFavorites,
  credits,
  subscriptionTier
}: DashboardOverviewProps) => {
  const stats = [
    {
      label: 'Total Generations',
      value: totalGenerations,
      icon: Image,
      gradient: 'from-violet-500 to-purple-600',
      bgGlow: 'violet'
    },
    {
      label: 'Favorites',
      value: totalFavorites,
      icon: Heart,
      gradient: 'from-rose-500 to-pink-600',
      bgGlow: 'rose'
    },
    {
      label: 'Credits Available',
      value: credits,
      icon: Sparkles,
      gradient: 'from-amber-500 to-orange-600',
      bgGlow: 'amber'
    },
    {
      label: 'Plan',
      value: subscriptionTier === 'pro' ? 'Pro' : 'Free',
      icon: TrendingUp,
      gradient: subscriptionTier === 'pro' ? 'from-emerald-500 to-teal-600' : 'from-slate-500 to-gray-600',
      bgGlow: subscriptionTier === 'pro' ? 'emerald' : 'slate'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden bg-card hover:shadow-lg transition-all duration-300 border-border/50">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    </p>
                  </div>
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
