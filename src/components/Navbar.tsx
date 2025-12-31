"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useDragControls,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, User, Code, FolderKanban, Mail } from 'lucide-react';

const LIQUID_GLASS_CLASSES =
  "backdrop-blur-xl saturate-180 bg-white/5 dark:bg-black/10 border-t border-b border-white/10 shadow-lg shadow-black/20";

const links = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: User },
  { href: "#skills", label: "Skills", icon: Code },
  { href: "#projects", label: "Projects", icon: FolderKanban },
  { href: "#contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLUListElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const dragControls = useDragControls();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);

    const sections = links.map(link => document.getElementById(link.href.substring(1))).filter(s => s);
    let currentSection = 'home';
    for (const section of sections) {
      if (section && section.offsetTop <= latest + window.innerHeight / 2) {
        currentSection = section.id;
      }
    }
    setActiveSection(currentSection);
  });

  useEffect(() => {
    if (navRef.current) {
      const activeLink = navRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement;
      if (activeLink) {
        setIndicatorStyle({
          width: activeLink.offsetWidth,
          left: activeLink.offsetLeft,
        });
      }
    }
  }, [activeSection]);
  
  function onDragEnd(event: any, info: any) {
    if (!navRef.current) return;
    const navBounds = navRef.current.getBoundingClientRect();
    const indicatorWidth = indicatorStyle.width;
    let finalPosition = info.point.x - navBounds.left - indicatorWidth / 2;
    
    // Find the closest link
    let closestLink = null;
    let minDistance = Infinity;

    const linkElements = Array.from(navRef.current.querySelectorAll('li'));

    for (let i = 0; i < linkElements.length; i++) {
      const linkEl = linkElements[i];
      const linkCenter = linkEl.offsetLeft + linkEl.offsetWidth / 2;
      const distance = Math.abs(finalPosition + indicatorWidth/2 - linkCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestLink = links[i];
      }
    }

    if (closestLink) {
      const targetElement = document.getElementById(closestLink.href.substring(1));
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    }
  }

  return (
    <motion.header
      className="fixed top-4 left-0 right-0 z-40 flex justify-center"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.5 }}
    >
      <nav
        className={cn(
          "flex items-center justify-center rounded-full p-2",
          LIQUID_GLASS_CLASSES
        )}
      >
        <ul ref={navRef} className="relative flex items-center">
          <motion.div
            className="absolute h-full rounded-full nav-indicator cursor-grab"
            style={{...indicatorStyle}}
            animate={{...indicatorStyle}}
            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            drag="x"
            dragControls={dragControls}
            dragConstraints={navRef}
            dragElastic={0.1}
            onDragEnd={onDragEnd}
            whileDrag={{ cursor: 'grabbing' }}
          />
          {links.map((link) => (
            <li key={link.href} data-section={link.href.substring(1)}>
              <Link
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={cn(
                  "relative z-10 flex flex-col items-center justify-center text-xs font-medium transition-colors w-16 h-12 rounded-full",
                  activeSection === link.href.substring(1) ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                )}
              >
                <link.icon className="w-5 h-5 mb-1"/>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
