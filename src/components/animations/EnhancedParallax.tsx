import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: [string, string];
}

export const ParallaxLayer = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  offset = ['start end', 'end start']
}: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const getTransform = (): MotionValue<number> => {
    const distance = 100 * speed;
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
      default:
        return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
    }
  };

  const transform = getTransform();
  const smoothTransform = useSpring(transform, springConfig);

  const style = direction === 'left' || direction === 'right'
    ? { x: smoothTransform }
    : { y: smoothTransform };

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  );
};

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
}

export const ParallaxContainer = ({ children, className = '' }: ParallaxContainerProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export const FloatingElement = ({
  children,
  delay = 0,
  duration = 6,
  distance = 20,
  className = ''
}: FloatingElementProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
    >
      {children}
    </motion.div>
  );
};

interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
  scaleRange?: [number, number];
}

export const ScaleOnScroll = ({
  children,
  className = '',
  scaleRange = [0.8, 1]
}: ScaleOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  });

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

interface FadeOnScrollProps {
  children: ReactNode;
  className?: string;
  fadeOut?: boolean;
}

export const FadeOnScroll = ({
  children,
  className = '',
  fadeOut = false
}: FadeOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const opacity = fadeOut
    ? useTransform(scrollYProgress, [0, 0.5], [1, 0])
    : useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div ref={ref} style={{ opacity }} className={className}>
      {children}
    </motion.div>
  );
};

interface RotateOnScrollProps {
  children: ReactNode;
  className?: string;
  rotateRange?: [number, number];
}

export const RotateOnScroll = ({
  children,
  className = '',
  rotateRange = [0, 360]
}: RotateOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);

  return (
    <motion.div ref={ref} style={{ rotate }} className={className}>
      {children}
    </motion.div>
  );
};
