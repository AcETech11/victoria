"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[5000] mix-blend-difference"
    >
      <nav className="flex items-center gap-1 bg-stone-100/10 backdrop-blur-lg border border-white/10 px-2 py-2 rounded-full">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/#work">Work</NavLink>
        <NavLink href="/#about">About</NavLink>
        <NavLink href="/#contact">Contact</NavLink>
      </nav>
    </motion.div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="px-6 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest text-stone-300 hover:text-white hover:bg-white/10 transition-all"
    >
      {children}
    </Link>
  );
}