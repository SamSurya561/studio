'use client'

import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { useCollection, useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

export default function Home() {
  const firestore = useFirestore();
  const projectsQuery = firestore ? query(collection(firestore, 'projects'), orderBy('date', 'desc')) : null;
  const { data: projects, loading } = useCollection(projectsQuery);

  const products = projects?.map(p => ({
    title: p.title,
    link: `/projects/${p.id}`,
    thumbnail: p.imageUrl
  })) || [];

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-lg">Loading projects...</div>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden">
      <HeroParallax products={products}>
        <div className="relative z-10">
          <About />
          <Skills />
          <Contact />
        </div>
      </HeroParallax>
    </main>
  );
}
