import React from 'react';
import { Zap, Shield, Clock, Infinity } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Clock,
    title: "3-5 Seconds",
    description: "Lightning fast generation",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Zap,
    title: "HD Quality",
    description: "Crystal clear 1024px",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Shield,
    title: "Free to Start",
    description: "No credit card needed",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Infinity,
    title: "Unlimited",
    description: "Gallery storage",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

export function ModernFeatureCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12"
    >
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={cn(
            "relative group p-4 md:p-5 rounded-2xl",
            "bg-card/60 backdrop-blur-sm border border-border/50",
            "hover:bg-card hover:border-border hover:shadow-lg",
            "transition-all duration-300 cursor-default"
          )}
        >
          {/* Hover Glow */}
          <div className={cn(
            "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            "bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
          )} />

          <div className="relative">
            <div className={cn(
              "inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl mb-3",
              feature.bgColor
            )}>
              <feature.icon className={cn("h-5 w-5 md:h-6 md:w-6", feature.color)} />
            </div>
            <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">
              {feature.title}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
