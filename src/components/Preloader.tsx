'use client';

import { motion } from 'framer-motion';

const Preloader = () => {
  const name = "SHARMILA S";
  const variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[101] flex items-center justify-center bg-background"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1
        className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {name.split("").map((char, i) => (
          <motion.span key={i} custom={i} variants={variants}>
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
};

export default Preloader;
