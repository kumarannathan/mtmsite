import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  direction = 'up',
  className = '' 
}: FadeInProps) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 30 };
      case 'down':
        return { opacity: 0, y: -30 };
      case 'left':
        return { opacity: 0, x: 30 };
      case 'right':
        return { opacity: 0, x: -30 };
      case 'none':
      default:
        return { opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'none':
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={getAnimatePosition()}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;

