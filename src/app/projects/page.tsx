'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCollection, useFirestore } from '@/firebase'
import { collection, query, orderBy, DocumentData } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'

const LIQUID_GLASS_CLASSES = "backdrop-blur-xl saturate-180 bg-white/5 dark:bg-black/10 border border-white/10 shadow-lg shadow-black/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"

const ProjectCard = ({ project }: { project: DocumentData }) => {
  const { title, categories, imageUrl, pills, summary } = project;
  const allTags = [...(categories || []), ...(pills || [])];

  const isFeatured = allTags.includes('Mobile App') || allTags.includes('Web Design');
  const span = isFeatured ? "md:col-span-2" : "md:col-span-1";
  const height = "md:h-96";

  return (
    <motion.div
      className={`relative rounded-3xl overflow-hidden group ${LIQUID_GLASS_CLASSES} ${span} ${height} flex flex-col`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div className="relative z-10 flex flex-col h-full p-8">
        <div className="flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {allTags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="bg-black/20 dark:bg-white/20 border-none backdrop-blur-sm">{tag}</Badge>
            ))}
          </div>
          <h3 className="text-2xl font-bold text-foreground">{title}</h3>
          <p className="text-foreground/80 mt-2">{summary}</p>
        </div>
        <div className="mt-8">
          <Button variant="outline" className="rounded-full bg-transparent border-foreground/50 hover:bg-foreground/10 text-foreground">
            View Case Study <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
      <motion.div
        className="absolute top-0 left-[-100%] w-[100px] h-full z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['0%', '300%'],
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'mirror',
          duration: 3,
          ease: 'linear',
          delay: Math.random() * 5,
        }}
        style={{
          opacity: 0
        }}
        whileHover={{
          opacity: 1
        }}
      />
    </motion.div>
  )
}

export default function AllProjectsPage() {
  const firestore = useFirestore();
  const projectsQuery = firestore ? query(collection(firestore, 'projects'), orderBy('date', 'desc')) : null;
  const { data: projects, loading } = useCollection(projectsQuery);

  return (
    <main className="w-full max-w-7xl mx-auto pt-32 pb-24 md:pt-48 md:pb-32 px-4">
       <motion.div 
        className="mb-12"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
       >
        <Button variant="outline" className="group rounded-full pl-2 pr-4 py-2 text-md bg-transparent backdrop-blur-sm hover:bg-primary/10 border-white/10" asChild>
            <Link href="/">
                <span className="bg-foreground/10 rounded-full p-2 mr-2">
                    <ArrowLeft className="w-4 h-4 text-foreground/80 group-hover:-translate-x-1 transition-transform"/>
                </span>
                Back to Home
            </Link>
        </Button>
      </motion.div>

      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        All Projects
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
        {loading && Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`rounded-3xl p-8 ${i % 4 === 0 || i % 4 === 3 ? 'md:col-span-2' : 'md:col-span-1'} md:h-96 bg-white/5 dark:bg-black/10 animate-pulse`}></div>
        ))}
        {!loading && projects && projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </main>
  )
}
