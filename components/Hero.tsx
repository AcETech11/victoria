"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroAlt() {
  const container = useRef<HTMLDivElement>(null);
  const topText = useRef<HTMLDivElement>(null);
  const bottomText = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=200%", // Longer scroll for more drama
        scrub: 1.5,
        pin: true,
      },
    });

    tl.to(topText.current, { xPercent: -120 }, 0)
      .to(bottomText.current, { xPercent: 120 }, 0)
      // Victoria's portrait moves slightly in the opposite direction
      .to(imageRef.current, { scale: 1.1, y: -50, opacity: 0 }, 0)
      .from(videoRef.current, { 
        scale: 1.5, // Video zooms in as it's revealed
        clipPath: "inset(100% 0% 0% 0%)", // Reveals from bottom up like a curtain
        duration: 1.5 
      }, 0);
  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen w-full bg-stone-950 overflow-hidden flex items-center justify-center">
      
      {/* 1. The Video (The Background/End Goal) */}
      <div ref={videoRef} className="absolute inset-0 z-0 w-full h-full">
        <video 
          src="/victoria-reel.mp4" 
          autoPlay muted loop playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 2. Victoria's Image (The Middle Layer) */}
      <div ref={imageRef} className="absolute inset-0 z-10 w-full h-full opacity-60">
        <Image 
          src="/victoria-portrait.jpeg" // Add her photo here
          alt="Victoria"
          fill
          className="object-cover grayscale"
          priority
        />
      </div>

      {/* 3. The Typography (The Top Layer) */}
      <div className="relative z-20 flex flex-col items-center select-none mix-blend-exclusion">
        <div ref={topText} className="overflow-hidden">
          <h1 className="text-[20vw] font-bold leading-[0.75] uppercase tracking-tighter">
            Victo
          </h1>
        </div>
        <div ref={bottomText} className="overflow-hidden">
          <h1 className="text-[20vw] font-bold leading-[0.75] uppercase tracking-tighter">
            ria
          </h1>
        </div>
      </div>

      {/* 4. Branding Metadata */}
      <div className="absolute bottom-10 w-full px-10 z-30 flex justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-accent/70">
        <span>Based in 2026</span>
        <span className="animate-pulse">● Available for Projects</span>
        <span>Motion / Graphic</span>
      </div>
    </section>
  );
}