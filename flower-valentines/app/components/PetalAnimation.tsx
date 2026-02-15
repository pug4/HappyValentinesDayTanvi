"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  opacity: number;
  color: string;
}

const PETAL_COLORS = [
  "#F8C8DC", // Rose blush
  "#FFB6C1", // Light pink
  "#EADCF8", // Soft lavender
  "#FFC0CB", // Pink
  "#D46A92", // Deep rose (occasional)
];

export default function PetalAnimation() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const createPetal = useCallback((id: number): Petal => ({
    id,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 8 + Math.random() * 6,
    size: 10 + Math.random() * 15,
    rotation: Math.random() * 360,
    opacity: 0.4 + Math.random() * 0.4,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
  }), []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Create initial petals
    const petalCount = isMobile ? 8 : 15;
    const initialPetals = Array.from({ length: petalCount }, (_, i) => createPetal(i));
    setPetals(initialPetals);

    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile, createPetal]);

  const handleAnimationComplete = (id: number) => {
    setPetals(prev => 
      prev.map(petal => 
        petal.id === id ? createPetal(id) : petal
      )
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{
              x: `${petal.x}vw`,
              y: -50,
              rotate: petal.rotation,
              opacity: 0,
            }}
            animate={{
              y: "110vh",
              rotate: petal.rotation + 360,
              opacity: [0, petal.opacity, petal.opacity, 0],
              x: [
                `${petal.x}vw`,
                `${petal.x + (Math.random() - 0.5) * 20}vw`,
                `${petal.x + (Math.random() - 0.5) * 30}vw`,
                `${petal.x + (Math.random() - 0.5) * 20}vw`,
              ],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              ease: "linear",
              repeat: 0,
            }}
            onAnimationComplete={() => handleAnimationComplete(petal.id)}
            className="absolute"
            style={{
              width: petal.size,
              height: petal.size,
            }}
          >
            <svg
              viewBox="0 0 50 50"
              fill={petal.color}
              className="w-full h-full drop-shadow-sm"
            >
              {/* Rose petal shape */}
              <path d="M25 0 C35 10, 45 20, 45 30 C45 40, 35 50, 25 50 C15 50, 5 40, 5 30 C5 20, 15 10, 25 0 Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
