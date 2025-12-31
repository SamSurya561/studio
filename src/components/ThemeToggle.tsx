'use client'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const LIQUID_GLASS_CLASSES = "backdrop-blur-xl saturate-180 bg-white/5 dark:bg-black/10 border border-white/10 shadow-lg shadow-black/20"

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <motion.div 
      className={cn("md:fixed md:top-6 md:right-6 md:z-50", className)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        size="icon"
        onClick={toggleTheme}
        className={`${LIQUID_GLASS_CLASSES} rounded-full w-12 h-12 hover:bg-white/10 dark:hover:bg-black/20 transition-colors text-foreground`}
        aria-label="Toggle theme"
      >
        <Sun className="h-6 w-6 scale-100 dark:scale-0 transition-transform duration-300" />
        <Moon className="absolute h-6 w-6 scale-0 dark:scale-100 transition-transform duration-300" />
      </Button>
    </motion.div>
  )
}
