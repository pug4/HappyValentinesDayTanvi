"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

// Confetti emojis - hearts and flowers
const CONFETTI_EMOJIS = [
  "❤️", "💕", "💖", "💗", "💓", "💞", "💘", "💝", 
  "🌸", "🌺", "🌷", "🌹", "🌼", "💐", "🌻", "🪻",
  "✨", "💫", "🦋"
];

interface ConfettiPiece {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

// Confetti component
function Confetti({ pieces }: { pieces: ConfettiPiece[] }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              x: `${piece.x}vw`,
              y: -50,
              rotate: 0,
              opacity: 1,
              scale: 0,
            }}
            animate={{
              y: "110vh",
              rotate: piece.rotation,
              opacity: [0, 1, 1, 1, 0],
              scale: [0, 1.2, 1, 1, 0.8],
              x: [
                `${piece.x}vw`,
                `${piece.x + (Math.random() - 0.5) * 15}vw`,
                `${piece.x + (Math.random() - 0.5) * 25}vw`,
                `${piece.x + (Math.random() - 0.5) * 15}vw`,
              ],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: "easeOut",
            }}
            className="absolute text-center select-none"
            style={{
              fontSize: piece.size,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
            }}
          >
            {piece.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Clickable animated rose
function ClickableRose({ delay, scale = 1, onClickRose }: { delay: number; scale?: number; onClickRose: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ width: 80 * scale, height: 100 * scale }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClickRose}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay + 1.2, ease: "easeOut" }}
      whileHover={{ scale: 1.15, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Hover tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 5, scale: 0.9 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          y: isHovered ? 0 : 5,
          scale: isHovered ? 1 : 0.9
        }}
        className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 px-3 py-1.5 rounded-full shadow-lg text-xs text-[#D46A92] z-20"
        style={{ fontFamily: "var(--font-dancing)" }}
      >
        Click me! 💕
      </motion.div>

      <svg viewBox="0 0 120 150" className="w-full h-full drop-shadow-md">
        {/* Stem */}
        <motion.path
          d="M60 150 Q55 120, 60 90 Q65 60, 60 50"
          stroke="#355E3B"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: delay + 1.4 }}
        />
        
        {/* Left leaf */}
        <motion.path
          d="M58 100 Q40 95, 35 80 Q45 85, 58 95"
          fill="#355E3B"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: delay + 1.6 }}
          style={{ transformOrigin: "58px 100px" }}
        />
        
        {/* Right leaf */}
        <motion.path
          d="M62 110 Q80 105, 85 90 Q75 95, 62 105"
          fill="#355E3B"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: delay + 1.7 }}
          style={{ transformOrigin: "62px 110px" }}
        />

        {/* Rose petals */}
        <motion.ellipse
          cx="60" cy="35" rx="25" ry="20"
          fill="#D46A92"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 1.8 }}
          style={{ transformOrigin: "60px 35px" }}
        />
        <motion.ellipse
          cx="45" cy="30" rx="18" ry="15"
          fill="#E07DA0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 1.9 }}
          style={{ transformOrigin: "45px 30px" }}
        />
        <motion.ellipse
          cx="75" cy="30" rx="18" ry="15"
          fill="#E07DA0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 2 }}
          style={{ transformOrigin: "75px 30px" }}
        />
        <motion.ellipse
          cx="60" cy="28" rx="15" ry="12"
          fill="#F8C8DC"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: delay + 2.1 }}
          style={{ transformOrigin: "60px 28px" }}
        />
        <motion.ellipse
          cx="55" cy="25" rx="10" ry="8"
          fill="#FFB6C1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: delay + 2.2 }}
          style={{ transformOrigin: "55px 25px" }}
        />
        <motion.ellipse
          cx="65" cy="25" rx="10" ry="8"
          fill="#FFB6C1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: delay + 2.3 }}
          style={{ transformOrigin: "65px 25px" }}
        />
        <motion.circle
          cx="60" cy="23" r="6"
          fill="#C25A82"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, delay: delay + 2.4 }}
          style={{ transformOrigin: "60px 23px" }}
        />
        
        {/* Shimmer */}
        <motion.ellipse
          cx="52" cy="22" rx="4" ry="3"
          fill="white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.2, 0.5] }}
          transition={{ duration: 2, delay: delay + 2.5, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);
  const [confettiKey, setConfettiKey] = useState(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(y, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-2deg", "2deg"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate confetti when a flower is clicked
  const triggerConfetti = useCallback(() => {
    const newPieces: ConfettiPiece[] = [];
    const pieceCount = 50;
    
    for (let i = 0; i < pieceCount; i++) {
      newPieces.push({
        id: Date.now() + i,
        emoji: CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)],
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 3 + Math.random() * 2,
        size: 20 + Math.random() * 28,
        rotation: Math.random() * 720 - 360,
      });
    }
    
    setConfettiPieces(newPieces);
    setConfettiKey((prev) => prev + 1);
    
    setTimeout(() => {
      setConfettiPieces([]);
    }, 6000);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Confetti overlay */}
      {confettiPieces.length > 0 && (
        <Confetti key={confettiKey} pieces={confettiPieces} />
      )}

      {/* Subtle background gradient orbs for parallax effect */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #F8C8DC 0%, transparent 70%)",
          x: useTransform(x, [-0.5, 0.5], [-30, 30]),
          y: useTransform(y, [-0.5, 0.5], [-30, 30]),
          top: "10%",
          left: "10%",
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #EADCF8 0%, transparent 70%)",
          x: useTransform(x, [-0.5, 0.5], [20, -20]),
          y: useTransform(y, [-0.5, 0.5], [20, -20]),
          bottom: "10%",
          right: "10%",
        }}
      />
      
      {/* Main content with parallax */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-20 text-center max-w-4xl mx-auto"
      >
        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#2d2d2d] leading-tight mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          For the girl who makes{" "}
          <span className="text-[#D46A92] glow">my world bloom.</span>
        </motion.h1>

        {/* Script subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl text-[#D46A92] mb-8"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          Happy Valentine&apos;s Day ❤️
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mx-auto w-32 h-[2px] bg-gradient-to-r from-transparent via-[#D46A92] to-transparent mb-10"
        />

        {/* Clickable flowers row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center items-end gap-2 sm:gap-4 md:gap-6 mt-4"
        >
          <ClickableRose delay={0} scale={0.7} onClickRose={triggerConfetti} />
          <ClickableRose delay={0.1} scale={0.9} onClickRose={triggerConfetti} />
          <ClickableRose delay={0.2} scale={1.1} onClickRose={triggerConfetti} />
          <ClickableRose delay={0.3} scale={0.9} onClickRose={triggerConfetti} />
          <ClickableRose delay={0.4} scale={0.7} onClickRose={triggerConfetti} />
        </motion.div>

        {/* Hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 3 }}
          className="text-sm text-[#355E3B] mt-6 tracking-wide"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          tap a flower for a surprise 🌸
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[#D46A92] opacity-60"
        >
          <span className="text-xs font-sans tracking-widest uppercase">Scroll</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
