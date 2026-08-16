"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { title: "Discovery", desc: "Understanding the brand DNA and narrative goals.", color: "bg-stone-800" },
  { title: "Storyboarding", desc: "Translating ideas into visual sequences and flow.", color: "bg-accent" },
  { title: "Motion Design", desc: "Bringing static designs to life with fluid movement.", color: "bg-stone-700" },
  { title: "Sound & Polish", desc: "Integrating audio and fine-tuning easing curves.", color: "bg-stone-500" }
];

export default function Process() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      if (trackRef.current) {
        // Calculate exactly how far the track needs to move:
        // (Total width of all cards) - (The width of the visible screen)
        const scrollDistance = trackRef.current.scrollWidth - window.innerWidth;
        setTranslateX(-scrollDistance);
      }
    };

    updateScroll();
    window.addEventListener("resize", updateScroll);
    return () => window.removeEventListener("resize", updateScroll);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });

  // Now we move the track by the EXACT pixel amount calculated above
  const x = useTransform(scrollYProgress, [0, 1], [0, translateX]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.1]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-stone-900">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Background Title */}
        <motion.div 
          style={{ opacity: titleOpacity }}
          className="px-6 md:px-10 absolute top-[10%] md:top-[15%] left-0 z-0"
        >
          <p className="font-mono text-[10px] text-accent uppercase tracking-[0.5em] mb-2">03 — Method</p>
          <h2 className="text-6xl md:text-8xl font-serif italic text-white/10 leading-none">The Flow</h2>
        </motion.div>

        {/* The Motion Track - trackRef is key here */}
        <motion.div 
          ref={trackRef}
          style={{ x }} 
          className="flex gap-6 md:gap-20 px-[10vw] md:px-[15vw] z-10 w-max"
        >
          {steps.map((step, i) => (
            <ProcessCard key={i} step={step} index={i} progress={scrollYProgress} />
          ))}
        </motion.div>

        {/* Progress Bar */}
        <div className="absolute bottom-10 left-6 right-6 md:left-10 md:right-10 h-[1px] bg-white/5">
          <motion.div style={{ scaleX: scrollYProgress }} className="h-full bg-accent origin-left w-full" />
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step, index, progress }: any) {
  // Logic to make cards fade/scale individually as they pass the center
  const stepInterval = 1 / steps.length;
  const start = index * stepInterval;
  const end = (index + 1) * stepInterval;
  
  const scale = useTransform(progress, [start - 0.1, start, end, end + 0.1], [0.9, 1, 1, 0.9]);
  const opacity = useTransform(progress, [start - 0.1, start, end, end + 0.1], [0.4, 1, 1, 0.4]);

  return (
    <motion.div 
      style={{ scale, opacity }}
      className="relative flex-shrink-0 w-[80vw] md:w-[450px] h-[55vh] md:h-[500px] rounded-[2rem] bg-stone-950 border border-white/10 p-8 md:p-12 flex flex-col justify-between shadow-2xl"
    >
      <span className="text-5xl md:text-7xl font-bold text-white/5 italic">0{index + 1}</span>
      <div>
        <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-6 text-white tracking-tighter">{step.title}</h3>
        <p className="text-stone-400 text-sm md:text-lg leading-relaxed font-light">{step.desc}</p>
      </div>
      <div className={`w-10 h-[2px] ${step.color} rounded-full`} />
    </motion.div>
  );
}

