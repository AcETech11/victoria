"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useSpring } from "framer-motion";

function subscribePointer(callback: () => void) {
  const mediaQuery = window.matchMedia("(pointer: fine)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getPointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getPointerServerSnapshot() {
  return false;
}

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState("default");
  const isPointerFine = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getPointerServerSnapshot
  );

  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    if (!isPointerFine) return;

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => setCursorType("hover");
    const handleMouseLeave = () => setCursorType("default");

    const elements = document.querySelectorAll("a, button, .group");
    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", moveMouse);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isPointerFine, mouseX, mouseY]);

  if (!isPointerFine) return null;

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
