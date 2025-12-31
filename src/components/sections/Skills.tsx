'use client'
import { motion } from 'framer-motion'
import { skillIcons } from '@/components/icons/skill-icons';
import React from 'react';

const skills = {
  "Design Tools": ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Sketch"],
  "Development": ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  "Soft Skills": ["User Research", "Prototyping", "Wireframing", "Communication", "Teamwork"]
}

const LIQUID_GLASS_CLASSES = "backdrop-blur-xl saturate-180 bg-white/5 dark:bg-black/10 border border-white/10 shadow-lg shadow-black/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"

const Bubble = ({ children, index, icon }: { children: React.ReactNode, index: number, icon: React.ElementType }) => {
  const Icon = icon;
  return (
    <motion.div
      className={`${LIQUID_GLASS_CLASSES} rounded-full px-5 py-3 flex items-center gap-3`}
      whileHover={{ y: -5, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      custom={index}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{children}</span>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="w-full max-w-5xl mx-auto py-24 md:py-32 px-4 text-center">
      <motion.h2 
        className="text-4xl md:text-5xl font-bold mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        My Skillset
      </motion.h2>
      <div className="space-y-12">
        {Object.entries(skills).map(([category, items]) => (
          <motion.div 
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-foreground/80">{category}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {items.map((skill, i) => (
                <Bubble key={skill} index={i} icon={skillIcons[skill]}>{skill}</Bubble>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
