"use client";

import { useCompletion } from "@ai-sdk/react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function StreamingLove() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasStarted, setHasStarted] = useState(false);

  const { completion, isLoading, complete } = useCompletion({
    api: "/api/love-stream",
  });

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      complete("");
    }
  }, [isInView, hasStarted, complete]);

  // Auto-restart after completion
  useEffect(() => {
    if (hasStarted && !isLoading && completion && completion.length > 0) {
      const timeout = setTimeout(() => {
        complete("");
      }, 5000); // Wait 5 seconds before restarting
      return () => clearTimeout(timeout);
    }
  }, [isLoading, completion, hasStarted, complete]);

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

        {/* Streaming text container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative min-h-[200px] p-8 md:p-12 rounded-2xl bg-white/50 backdrop-blur-sm shadow-lg border border-[#F8C8DC]/30"
        >
          {/* Decorative quotes */}
          <span className="absolute top-4 left-6 text-6xl text-[#D46A92] opacity-20 leading-none">
            &ldquo;
          </span>
          <span className="absolute bottom-4 right-6 text-6xl text-[#D46A92] opacity-20 leading-none">
            &rdquo;
          </span>

          {/* Streaming content */}
          <div className="relative z-10 min-h-[120px] flex items-center justify-center">
            {!hasStarted ? (
              <p className="text-[#2d2d2d]/50 text-lg">
                Scroll to reveal...
              </p>
            ) : (
              <p 
                className="text-lg md:text-xl lg:text-2xl text-[#2d2d2d] leading-relaxed glow"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {completion || "..."}
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

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-sm text-[#2d2d2d] mt-8 tracking-wide"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          ✨ Powered by love (and a little AI magic) ✨
        </motion.p>
      </div>
    </section>
  );
}
