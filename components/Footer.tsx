"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-stone-100 text-stone-950 rounded-t-[3rem] py-20 px-10 overflow-hidden">
      {/* 1. Main Content Wrapper - Added z-10 to stay on top */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Massive CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32">
          <div className="max-w-2xl">
            <h2 className="text-[12vw] md:text-[8vw] font-bold leading-[0.85] uppercase tracking-tighter mb-8">
              Let&apos;s <br /> 
              <span className="italic font-serif font-light text-stone-500">Move</span> Together.
            </h2>
            <p className="text-xl md:text-2xl text-stone-600 font-light max-w-md">
              Currently accepting new motion and branding projects for Q2 {currentYear}.
            </p>
          </div>

          <motion.a
            href="mailto:Josephvictoria2334@gmail.com"
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 md:mt-0 bg-stone-950 text-stone-100 px-10 py-10 rounded-full font-mono text-xs uppercase tracking-widest flex items-center justify-center aspect-square text-center"
          >
            Get in <br /> touch
          </motion.a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-stone-300 pt-10">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[10px] text-stone-400 uppercase tracking-[0.2em]">Socials</p>
            <div className="flex flex-col gap-2 font-medium">
              <Link href="https://www.instagram.com/emezyjoe_" className="hover:opacity-50 transition-opacity">Instagram</Link>
              <Link href="https://x.com/emezyjoe?s=21" className="hover:opacity-50 transition-opacity">Twitter</Link>
              <Link href="https://www.behance.net/josephvictoria3" className="hover:opacity-50 transition-opacity">Behance</Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[10px] text-stone-400 uppercase tracking-[0.2em]">Location</p>
            <div className="font-medium">
              <p>Remote / GMT+1</p>
              <p className="text-stone-400 font-normal">Lagos, Nigeria</p>
            </div>
          </div>

          <div className="col-span-2 md:text-right flex flex-col justify-end">
            <p className="font-mono text-[10px] text-stone-400 uppercase mb-2 tracking-[0.2em]">
              © {currentYear} Victoria Studio
            </p>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest">
              Design & Direction
            </p>
          </div>
        </div>
      </div>
      
      {/* 2. Background Decorative Text - Set to z-0 and lighter color */}
      <div className="absolute -bottom-10 -right-10 text-[22vw] font-bold text-stone-200/50 z-0 pointer-events-none select-none leading-none">
        VICTORIA
      </div>
    </footer>
  );
}