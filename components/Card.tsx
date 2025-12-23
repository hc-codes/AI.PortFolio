import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', delay = 0, hover = true }) => {
  const { config } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`
        ${config.cardBg} 
        ${config.border} 
        border 
        rounded-xl 
        p-6 
        backdrop-blur-sm 
        shadow-sm
        transition-colors
        duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};
