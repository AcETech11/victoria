"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { id: "01", title: "Motion Direction", desc: "Bringing static brands to life through rhythmic movement." },
  { id: "02", title: "Visual Identity", desc: "Crafting modern aesthetics for digital-first companies." },
  { id: "03", title: "Interactive UI", desc: "Merging UX logic with high-end motion interactions." },
];

export default function Services() {
  return (
    <section className="py-32 px-10 bg-stone-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-sm font-mono text-accent uppercase tracking-[0.5em] mb-10">Capabilities</h2>
          <p className="text-4xl font-light leading-snug">
            Victoria specializes in the <span className="italic font-serif">intersection</span> of static design and kinetic energy.
          </p>
        </div>

        <div className="flex flex-col border-t border-stone-800">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group py-10 border-b border-stone-800 flex justify-between items-start hover:bg-stone-900/30 transition-colors px-4 cursor-crosshair"
            >
              <div className="flex gap-10">
                <span className="font-mono text-xs text-stone-600 mt-2">{service.id}</span>
                <div>
                  <h3 className="text-3xl font-bold mb-2 group-hover:text-accent transition-colors">{service.title}</h3>
                  <p className="text-stone-500 max-w-sm">{service.desc}</p>
                </div>
              </div>
              <div className="text-3xl opacity-0 group-hover:opacity-100 transition-opacity">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}