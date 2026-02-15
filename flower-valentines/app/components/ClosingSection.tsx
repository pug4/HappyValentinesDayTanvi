"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ClosingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200, 169, 81, 0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center max-w-2xl">
        {/* Main closing message */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1 }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#2d2d2d] leading-relaxed mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Every garden needs sunlight.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#D46A92] glow"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          You are mine.
        </motion.p>

        {/* Animated final rose */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 1, delay: 1, type: "spring", bounce: 0.4 }}
          className="mt-16"
        >
          <svg
            viewBox="0 0 120 150"
            className="w-32 h-40 mx-auto"
          >
            {/* Stem */}
            <motion.path
              d="M60 150 Q55 120, 60 90 Q65 60, 60 50"
              stroke="#355E3B"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.5, delay: 1.2 }}
            />
            
            {/* Leaves */}
            <motion.path
              d="M58 100 Q40 95, 35 80 Q45 85, 58 95"
              fill="#355E3B"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 2 }}
              style={{ transformOrigin: "58px 100px" }}
            />
            <motion.path
              d="M62 110 Q80 105, 85 90 Q75 95, 62 105"
              fill="#355E3B"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 2.2 }}
              style={{ transformOrigin: "62px 110px" }}
            />

            {/* Rose petals with golden tint */}
            <motion.ellipse
              cx="60"
              cy="35"
              rx="28"
              ry="22"
              fill="#D46A92"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
              style={{ transformOrigin: "60px 35px" }}
            />
            <motion.ellipse
              cx="42"
              cy="30"
              rx="20"
              ry="16"
              fill="#E07DA0"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.6, delay: 2.7, ease: "easeOut" }}
              style={{ transformOrigin: "42px 30px" }}
            />
            <motion.ellipse
              cx="78"
              cy="30"
              rx="20"
              ry="16"
              fill="#E07DA0"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.6, delay: 2.8, ease: "easeOut" }}
              style={{ transformOrigin: "78px 30px" }}
            />
            <motion.ellipse
              cx="60"
              cy="28"
              rx="16"
              ry="13"
              fill="#F8C8DC"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 3, ease: "easeOut" }}
              style={{ transformOrigin: "60px 28px" }}
            />
            <motion.ellipse
              cx="52"
              cy="24"
              rx="11"
              ry="9"
              fill="#FFB6C1"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.4, delay: 3.1, ease: "easeOut" }}
              style={{ transformOrigin: "52px 24px" }}
            />
            <motion.ellipse
              cx="68"
              cy="24"
              rx="11"
              ry="9"
              fill="#FFB6C1"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.4, delay: 3.2, ease: "easeOut" }}
              style={{ transformOrigin: "68px 24px" }}
            />
            
            {/* Golden center */}
            <motion.circle
              cx="60"
              cy="22"
              r="7"
              fill="#C8A951"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.4, delay: 3.4, ease: "easeOut" }}
              style={{ transformOrigin: "60px 22px" }}
            />
            
            {/* Sparkle/shimmer */}
            <motion.circle
              cx="55"
              cy="18"
              r="3"
              fill="white"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: [0, 0.7, 0.3, 0.7, 0] } : { opacity: 0 }}
              transition={{ duration: 2, delay: 3.6, repeat: Infinity, repeatDelay: 1 }}
            />
          </svg>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
          className="mt-12"
        >
          <p 
            className="text-2xl text-[#D46A92]"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            With all my love,
          </p>
          <p 
            className="text-3xl text-[#D46A92] mt-2"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            Forever & Always 💕
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, delay: 4 }}
          className="mx-auto mt-16 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#C8A951] to-transparent"
        />
      </div>
    </section>
  );
}
