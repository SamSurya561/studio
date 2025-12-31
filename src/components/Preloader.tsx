'use client';

import { motion } from 'framer-motion';
import { PenTool, Palette, Brush, Baseline, Circle, Square, Layout, Component, Layers } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const icons = [
  { icon: PenTool, position: { top: '10%', left: '10%' }, delay: 0.1 },
  { icon: Palette, position: { top: '20%', left: '85%' }, delay: 0.2 },
  { icon: Brush, position: { top: '80%', left: '5%' }, delay: 0.3 },
  { icon: Baseline, position: { top: '85%', left: '90%' }, delay: 0.4 },
  { icon: Circle, position: { top: '15%', left: '50%' }, delay: 0.5 },
  { icon: Square, position: { top: '65%', left: '60%' }, delay: 0.6 },
  { icon: Layout, position: { top: '40%', left: '15%' }, delay: 0.7 },
  { icon: Component, position: { top: '60%', left: '95%' }, delay: 0.8 },
  { icon: Layers, position: { top: '90%', left: '45%' }, delay: 0.9 },
];

const Preloader = () => {
  const name = "SHARMILA S";
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 18); // Fills up in ~1.8s, just before the 2s timeout

    return () => clearInterval(timer);
  }, []);

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

  const iconContainerVariant = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: custom + 0.5,
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
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          {icons.map((item, i) => {
            const Icon = item.icon;
            const randomY = (Math.random() * 2 - 1) * 15;
            const randomX = (Math.random() * 2 - 1) * 15;
            const randomRotate = (Math.random() * 2 - 1) * 20;
            
            return (
              <motion.div
                key={i}
                className="absolute text-foreground/10"
                style={{ ...item.position }}
                variants={iconContainerVariant}
                custom={item.delay}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  animate={{
                    y: [0, randomY, 0],
                    x: [0, randomX, 0],
                    rotate: [0, randomRotate, 0],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  }}
                >
                  <Icon className="w-8 h-8 md:w-10 md:h-10" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="relative z-10 flex flex-col items-center">
            <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {name.split("").map((char, i) => (
                <motion.span key={i} variants={charVariants}>
                  {char === " " ? " " : char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div 
              className="w-48 md:w-64 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Progress value={progress} className="h-2 bg-foreground/10" />
              <p className="text-center text-sm text-foreground/50 mt-2 font-mono">
                {Math.round(progress)}%
              </p>
            </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
