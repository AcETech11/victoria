"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState("default");
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = () => {
      const hovers = document.querySelectorAll("a, button, .group");
      hovers.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorType("hover"));
        el.addEventListener("mouseleave", () => setCursorType("default"));
      });
    };

    window.addEventListener("mousemove", moveMouse);
    handleHover();
    return () => window.removeEventListener("mousemove", moveMouse);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[10000] mix-blend-difference"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: cursorType === "hover" ? 4 : 1,
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    />
  );
}