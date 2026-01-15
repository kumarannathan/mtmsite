import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  dark?: boolean;
}

const GlassCard = ({ 
  children, 
  className = '',
  hover = true,
  dark = false 
}: GlassCardProps) => {
  const baseClasses = `
    backdrop-blur-md border border-opacity-20 transition-all duration-300 ease-out
    ${dark 
      ? 'bg-black bg-opacity-30 border-primary-500 shadow-glass-dark' 
      : 'bg-white bg-opacity-70 border-primary-500 shadow-glass'
    }
    ${hover ? 'hover:shadow-glass-hover hover:-translate-y-1' : ''}
    ${className}
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={hover ? { 
        y: -5,
        transition: { duration: 0.2 }
      } : {}}
      className={baseClasses}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;

