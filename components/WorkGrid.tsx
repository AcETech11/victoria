"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SanityProject } from "@/lib/types";

export default function WorkGrid({ projects }: { projects: SanityProject[] }) {
  // 1. If no projects exist, show placeholder
  if (!projects || projects.length === 0) {
    return (
      <section className="py-32 px-10 bg-stone-950 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="border-2 border-dashed border-stone-800 rounded-3xl p-20 text-center max-w-2xl w-full">
          <h2 className="text-3xl font-serif italic text-stone-500 mb-4 text-white">Curating the Gallery...</h2>
          <p className="text-stone-600 font-mono text-sm uppercase tracking-widest leading-relaxed">
            Victoria is currently rendering new motion magic. <br /> Check back shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-stone-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-6xl md:text-7xl font-serif italic text-stone-100 tracking-tight leading-none">
              Selected Works
            </h2>
            <p className="text-stone-500 mt-4 text-lg">Blending pixels with perspective.</p>
          </div>
          <p className="hidden md:block font-mono text-[10px] text-accent uppercase tracking-[0.5em]">
            01 — Projects
          </p>
        </div>

        {/* The Bento Grid Logic */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[350px] md:auto-rows-[400px]">
          {projects.map((project: SanityProject, i: number) => {
            // Pattern: Large, Small, Small, Large, Full-Width
            const spanClass = 
              i === 0 || i === 3 ? "md:col-span-7" : 
              i === 4 ? "md:col-span-12" : "md:col-span-5";

            const imageUrl = project.mainImage || project.image;

            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${spanClass} group relative overflow-hidden rounded-[2.5rem] bg-stone-900 border border-white/5`}
              >
                <Link href={`/project/${project.slug}`} className="block w-full h-full">
                  {/* Media Layer */}
                  <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-900 flex items-center justify-center text-stone-700 font-mono text-xs italic">
                        Media Preview Unavailable
                      </div>
                    )}
                  </div>

                  {/* Gradient & Text Overlay */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent">
                    <div className="overflow-hidden">
                       <motion.p 
                         className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3"
                         initial={{ y: 20 }}
                         whileInView={{ y: 0 }}
                       >
                        {project.projectType || "Motion Design"}
                      </motion.p>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tighter leading-none">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
