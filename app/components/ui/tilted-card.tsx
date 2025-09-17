"use client";

import { motion } from "motion/react";
import { useState } from "react";

interface TiltProps {
  children: React.ReactNode;
  maxTilt?: number;   // how strong the tilt is (default: 15)
  scale?: number;     // scale factor on hover (default: 1 = no scale)
  className?: string;
}

export function Tilt({ children, maxTilt = 15, scale = 1, className }: TiltProps) {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y / height) - 0.5) * -maxTilt;
    const rotateY = ((x / width) - 0.5) * maxTilt;

    setTransform({ rotateX, rotateY, scale });
  }

  function handleMouseLeave() {
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
