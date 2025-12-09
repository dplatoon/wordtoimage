import { motion } from 'framer-motion';
import { Image, Heart, Sparkles, TrendingUp } from 'lucide-react';

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
      gradient: 'from-primary to-neon-coral',
      glow: 'shadow-neon'
    },
    {
      label: 'Favorites',
      value: totalFavorites,
      icon: Heart,
      gradient: 'from-neon-coral to-neon-amber',
      glow: 'shadow-neon-coral'
    },
    {
      label: 'Credits Available',
      value: credits,
      icon: Sparkles,
      gradient: 'from-neon-amber to-primary',
      glow: 'shadow-neon'
    },
    {
      label: 'Plan',
      value: subscriptionTier === 'pro' ? 'Pro' : 'Free',
      icon: TrendingUp,
      gradient: subscriptionTier === 'pro' ? 'from-primary to-neon-coral' : 'from-muted to-muted-foreground',
      glow: subscriptionTier === 'pro' ? 'shadow-neon' : ''
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
            <div className="relative overflow-hidden glass-card rounded-2xl p-5 hover:border-primary/40 transition-all duration-300 group">
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </p>
                </div>
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} ${stat.glow}`}>
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${stat.gradient} opacity-50`} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};