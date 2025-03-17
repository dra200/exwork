import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { FADE_IN_UP } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface RevealAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number; 
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
}

export function RevealAnimation({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 20,
  duration = 0.6,
}: RevealAnimationProps) {
  const [ref, isVisible] = useScrollReveal();

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: distance };
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: 'easeOut',
        delay,
      },
    },
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={variants}
      >
        {children}
      </motion.div>
    </div>
  );
}
