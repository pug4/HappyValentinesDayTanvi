"use client";

import { useCompletion } from "@ai-sdk/react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

export default function StreamingLove() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { completion, isLoading, complete, error: apiError } = useCompletion({
    api: "/api/love-stream",
    onError: (err) => {
      console.error("AI API Error:", err);
      setError("Failed to generate message. Please try again!");
    },
  });

  // Start when scrolled into view OR immediately on mount (for testing)
  useEffect(() => {
    if (!hasStarted) {
      // Start immediately, don't wait for scroll
      setHasStarted(true);
      setError(null);
      complete("");
    }
  }, [hasStarted, complete]);

  // Click handler to get a new message
  const handleClick = useCallback(() => {
    if (!isLoading) {
      setError(null);
      complete("");
    }
  }, [isLoading, complete]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-6"
    >
      {/* Background shimmer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212, 106, 146, 0.15) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* Section header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2d2d2d] mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Reasons I Love You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#D46A92] text-xl mb-12"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          (And They Never End)
        </motion.p>

        {/* Streaming text container - CLICKABLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={handleClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative min-h-[200px] p-8 md:p-12 rounded-2xl bg-white/50 backdrop-blur-sm shadow-lg border border-[#F8C8DC]/30 cursor-pointer group"
        >
          {/* Decorative quotes */}
          <span className="absolute top-4 left-6 text-6xl text-[#D46A92] opacity-20 leading-none">
            &ldquo;
          </span>
          <span className="absolute bottom-4 right-6 text-6xl text-[#D46A92] opacity-20 leading-none">
            &rdquo;
          </span>

          {/* Refresh hint on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-60 transition-opacity"
          >
            <div className="bg-[#D46A92]/10 rounded-full p-2">
              <svg className="w-5 h-5 text-[#D46A92]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </motion.div>

          {/* Streaming content */}
          <div className="relative z-10 min-h-[120px] flex items-center justify-center">
            {error ? (
              <div className="text-center">
                <p className="text-[#D46A92] text-lg mb-2">{error}</p>
                <button
                  onClick={handleClick}
                  className="text-sm text-[#D46A92] underline hover:no-underline"
                >
                  Try again
                </button>
              </div>
            ) : !hasStarted ? (
              <p className="text-[#2d2d2d]/50 text-lg">
                Scroll to reveal...
              </p>
            ) : (
              <p 
                className="text-lg md:text-xl lg:text-2xl text-[#2d2d2d] leading-relaxed glow"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {completion || (isLoading ? "..." : "Click to generate a sweet message! 💕")}
                {isLoading && (
                  <span className="inline-block w-[3px] h-[1.2em] bg-[#D46A92] ml-1 align-middle cursor-blink" />
                )}
              </p>
            )}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 rounded-full bg-[#D46A92]"
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Click hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-sm text-[#D46A92] mt-6 tracking-wide"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          💕 Tap for another reason 💕
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-xs text-[#2d2d2d] mt-3 tracking-wide"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          ✨ Powered by love (and a little AI magic) ✨
        </motion.p>
      </div>
    </section>
  );
}
