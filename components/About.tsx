"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WordProps } from "@/lib/types";

const paragraph = "I transform static concepts into kinetic experiences. My work lives at the intersection of intentional graphic structure and fluid motion design, helping brands tell stories that don't just sit still—they breathe.";

export default function About() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "start 0.25"],
  });

  const words = paragraph.split(" ");

  return (
    <section ref={container} className="py-40 px-10 bg-stone-950">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.5em] mb-12">
          02 — Philosophy
        </p>
        
        <div className="flex flex-wrap text-4xl md:text-6xl font-light leading-tight tracking-tighter">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} range={[start, end]} progress={scrollYProgress}>
                {word}
              </Word>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Word({ children, range, progress }: WordProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative mr-3 mt-2">
      <motion.span style={{ opacity }} className="text-stone-100">
        {children}
      </motion.span>
    </span>
  );
}
