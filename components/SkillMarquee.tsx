"use client";

import { motion } from "framer-motion";

const skills = [
  "Motion Design", "3D Animation", "Brand Identity", 
  "UI/UX Design", "Art Direction", "Visual Storytelling",
  "Motion Design", "3D Animation", "Brand Identity" // Doubled for seamless loop
];

export default function SkillMarquee() {
  return (
    <div className="relative flex overflow-x-hidden border-y border-stone-800 bg-stone-950 py-10">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        {skills.map((skill, i) => (
          <span key={i} className="mx-10 text-6xl font-serif italic text-stone-700 uppercase tracking-tighter">
            {skill} <span className="text-accent ml-10">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}