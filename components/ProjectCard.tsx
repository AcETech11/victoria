"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      className={`group relative overflow-hidden rounded-3xl bg-stone-900 border border-white/5 ${project.gridClass}`}
    >
      <Link href={`/project/${project.slug}`} className="block w-full h-full">
        {/* Priority: Video for Motion, Image for Graphic */}
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.2s] ease-expo"
          />
        ) : (
          <Image
            src={project.image || "/placeholder.jpg"}
            alt={project.title}
            fill
            className="object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.2s] ease-expo"
          />
        )}

        {/* Dynamic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
          <div className="flex justify-between items-end overflow-hidden">
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-accent font-mono text-[10px] uppercase tracking-widest block mb-2">
                {project.category}
              </span>
              <h3 className="text-3xl font-bold text-white tracking-tighter">
                {project.title}
              </h3>
            </div>
            
            {/* Show Figma/Live Link icon if it exists */}
            {project.externalLink && (
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}