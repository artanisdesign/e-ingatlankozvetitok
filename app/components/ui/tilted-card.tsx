"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface TiltProps {
  children: React.ReactNode;
  maxTilt?: number;
  scale?: number;
  className?: string;
  disableBelow?: "sm" | "md" | "lg"; // optional breakpoint
}

export function Tilt({
  children,
  maxTilt = 15,
  scale = 1,
  className,
  disableBelow = "md",
}: TiltProps) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const media =
      disableBelow === "md"
        ? "(min-width: 768px)"
        : disableBelow === "lg"
        ? "(min-width: 1024px)"
        : "(min-width: 640px)";

    const mql = window.matchMedia(media);

    const update = () => setEnabled(mql.matches);
    update();

    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [disableBelow]);

  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!enabled) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y / height) - 0.5) * -maxTilt;
    const rotateY = ((x / width) - 0.5) * maxTilt;

    setTransform({ rotateX, rotateY, scale });
  }

  function handleMouseLeave() {
    if (!enabled) return;
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
  }

  return (
    <div
      className={className}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{
          rotateX: transform.rotateX,
          rotateY: transform.rotateY,
          scale: transform.scale,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
