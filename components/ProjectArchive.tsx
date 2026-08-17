"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SanityProject } from "@/lib/types";

interface ProjectArchiveProps {
  projects: SanityProject[];
}

export default function ProjectArchive({ projects }: ProjectArchiveProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // If there are no projects left after the Bento Grid, don't render this section
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-10 bg-stone-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="font-mono text-[10px] text-stone-500 uppercase tracking-[0.5em]">
            Full Project Index
          </h2>
          <span className="font-mono text-[10px] text-stone-600 uppercase">
            {projects.length} Entries
          </span>
        </div>
        
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <Link 
              href={`/project/${project.slug}`}
              key={project._id}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative py-10 border-b border-white/5 flex items-center justify-between transition-all duration-500 hover:px-4"
            >
              {/* Project Info */}
              <div className="flex items-center md:items-end gap-6 md:gap-16 z-10">
                <span className="text-4xl md:text-7xl font-serif italic text-stone-700 group-hover:text-stone-100 transition-colors duration-500">
                  {project.title}
                </span>
                <span className="hidden md:block font-mono text-[10px] text-stone-600 mb-3 uppercase tracking-widest group-hover:text-accent transition-colors">
                  {project.projectType || project.category}
                </span>
              </div>
              
              {/* Year/Arrow */}
              <div className="flex items-center gap-8 z-10">
                <span className="font-mono text-[10px] text-stone-600 uppercase tracking-widest">
                  {project._createdAt ? new Date(project._createdAt).getFullYear() : "2026"}
                </span>
                <motion.span 
                  animate={{ x: hoveredIndex === i ? 5 : 0 }}
                  className="text-stone-700 group-hover:text-accent"
                >
                  ↗
                </motion.span>
              </div>

              {/* Dynamic Hover Image Preview */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5, x: 50 }}
                    animate={{ opacity: 1, scale: 1, rotate: 3, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: -5, x: 50 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute right-[20%] top-1/2 -translate-y-1/2 pointer-events-none z-0 hidden lg:block"
                  >
                    <div className="w-80 h-48 relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
                      {project.mainImage ? (
                        <Image 
                          src={project.mainImage} 
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-stone-900 flex items-center justify-center italic text-stone-700 text-xs">
                          Preview Unavailable
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
