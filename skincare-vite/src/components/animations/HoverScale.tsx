import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

const HoverScale = ({ 
  children, 
  scale = 1.05, 
  duration = 0.2,
  className = '' 
}: HoverScaleProps) => {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default HoverScale;

