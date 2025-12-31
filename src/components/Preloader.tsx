'use client';

import { motion } from 'framer-motion';
import { PenTool, Palette, Brush, Baseline, Circle, Square } from 'lucide-react';
import React from 'react';

const icons = [
  { icon: PenTool, position: { top: '10%', left: '10%' }, delay: 0.1 },
  { icon: Palette, position: { top: '20%', left: '85%' }, delay: 0.2 },
  { icon: Brush, position: { top: '80%', left: '5%' }, delay: 0.3 },
  { icon: Baseline, position: { top: '85%', left: '90%' }, delay: 0.4 },
  { icon: Circle, position: { top: '15%', left: '50%' }, delay: 0.5 },
  { icon: Square, position: { top: '65%', left: '60%' }, delay: 0.6 },
];

const Preloader = () => {
  const name = "SHARMILA S";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const iconVariant = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: custom + 0.5, // Delay icons until after text starts appearing
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    }),
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  };
  

  return (
    <motion.div 
      className="fixed inset-0 z-[101] flex items-center justify-center bg-background"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <div className="relative flex items-center justify-center">
        {icons.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              className="absolute text-foreground/30"
              style={{ ...item.position }}
              variants={iconVariant}
              custom={item.delay}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Icon className="w-8 h-8 md:w-10 md:h-10" />
            </motion.div>
          );
        })}

        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {name.split("").map((char, i) => (
            <motion.span key={i} variants={charVariants}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default Preloader;
