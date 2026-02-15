"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function LoveLetter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageKey, setImageKey] = useState(0);

  // Fetch photos list on mount
  useEffect(() => {
    fetch("/api/photos")
      .then((res) => res.json())
      .then((data) => {
        if (data.photos && data.photos.length > 0) {
          setPhotos(data.photos);
          // Pick a random photo initially
          const randomIndex = Math.floor(Math.random() * data.photos.length);
          setCurrentPhoto(data.photos[randomIndex]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching photos:", err);
        setIsLoading(false);
      });
  }, []);

  // Function to pick a new random photo
  const refreshPhoto = useCallback(() => {
    if (photos.length === 0) return;
    
    // Get a different photo than current
    let newPhoto = currentPhoto;
    if (photos.length > 1) {
      while (newPhoto === currentPhoto) {
        const randomIndex = Math.floor(Math.random() * photos.length);
        newPhoto = photos[randomIndex];
      }
    }
    setCurrentPhoto(newPhoto);
    setImageKey((prev) => prev + 1); // Force re-render of image
  }, [photos, currentPhoto]);

  const letterLines = [
    "My Love,",
    "",
    "From the moment you walked into my life, everything softened.",
    "The air feels warmer. The mornings feel lighter. The world feels possible.",
    "",
    "You are my calm in chaos, my laughter in silence, my home in every place.",
    "",
    "Every flower that I see reminds me of you -",
    "beautiful, strong, and quietly powerful.",
    "",
    "I don't just love you.",
    "I choose you. Every day.",
    "",
    "Happy Valentine's Day. 🌹",
    "Forever yours."
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 px-6"
    >
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Love Letter */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="parchment rounded-lg p-8 md:p-12 relative overflow-hidden"
        >
          {/* Decorative corner flourishes */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D46A92] opacity-40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D46A92] opacity-40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D46A92] opacity-40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D46A92] opacity-40 rounded-br-lg" />

          <div className="relative z-10">
            {letterLines.map((line, index) => (
              <motion.p
                key={index}
                variants={lineVariants}
                className={`
                  ${index === 0 ? "text-3xl md:text-4xl text-[#D46A92] mb-6" : ""}
                  ${index === letterLines.length - 1 ? "text-xl md:text-2xl text-[#D46A92] mt-4" : ""}
                  ${line === "" ? "h-4" : ""}
                  ${index > 0 && index < letterLines.length - 1 && line !== "" ? "text-lg md:text-xl text-[#2d2d2d] leading-relaxed" : ""}
                `}
                style={{
                  fontFamily: index === 0 || index === letterLines.length - 1 
                    ? "var(--font-dancing)" 
                    : "var(--font-playfair)",
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Paper texture overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>

        {/* Photo display - clickable to refresh */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 3 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative"
        >
          <motion.div 
            className="relative bg-white p-4 shadow-2xl rounded-sm transform hover:rotate-0 transition-transform duration-500 cursor-pointer group"
            onClick={refreshPhoto}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Photo frame */}
            <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-[#F8C8DC] to-[#EADCF8] rounded-sm overflow-hidden">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-[#D46A92] border-t-transparent rounded-full"
                  />
                </div>
              ) : currentPhoto ? (
                <>
                  <Image
                    key={imageKey}
                    src={`/media/${encodeURIComponent(currentPhoto)}`}
                    alt="My love"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  {/* Refresh overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="bg-white/90 rounded-full p-3 shadow-lg">
                        <svg
                          className="w-6 h-6 text-[#D46A92]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#D46A92]">
                  <svg
                    className="w-16 h-16 mb-4 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p 
                    className="text-sm opacity-70"
                    style={{ fontFamily: "var(--font-dancing)" }}
                  >
                    No photos found
                  </p>
                </div>
              )}
            </div>
            
            {/* Caption */}
            <p 
              className="text-center mt-4 text-[#D46A92]"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              My favorite person 💕
            </p>
            
            {/* Click hint */}
            {photos.length > 1 && (
              <p className="text-center text-xs text-[#D46A92]/50 mt-1">
                Click for another memory
              </p>
            )}
          </motion.div>

          {/* Decorative flowers around photo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute -top-6 -right-6 text-4xl"
          >
            🌸
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute -bottom-4 -left-4 text-3xl"
          >
            🌷
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
