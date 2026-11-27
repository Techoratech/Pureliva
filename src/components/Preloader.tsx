import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const prefersReduced = useReducedMotion();

  // Signature seed accent colors (Royal Purple & Amber Gold palette)
  const seedColors = ["#680183", "#F59E0B", "#9333EA", "#FFD700", "#B45309"];

  const handleFinish = () => {
    try {
      sessionStorage.setItem("pureliva_intro_seen", "true");
    } catch {
      // ignore storage errors
    }
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  useEffect(() => {
    // If reduced motion, skip quickly
    if (prefersReduced) {
      handleFinish();
      return;
    }

    // Progress counter 0 to 100 over ~2.2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(handleFinish, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 5) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 55);

    return () => clearInterval(interval);
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="preloader"
          exit={{ y: "-100%", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 bg-[#FAF7F2] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
          onClick={handleFinish}
          role="dialog"
          aria-label="Welcome to Pureliva Foods"
        >
          {/* Subtle curved wave at bottom during slide up */}
          <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none translate-y-full">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-24 block"
            >
              <path
                d="M0,0 C480,120 960,0 1440,80 L1440,120 L0,120 Z"
                fill="#680183"
              />
            </svg>
          </div>

          {/* Ambient Glows */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#680183]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

          {/* Center composition */}
          <div className="relative flex flex-col items-center max-w-sm px-6 text-center z-10">
            {/* Step 1: SVG Leaf & Sprout draw animation */}
            <div className="w-20 h-20 mb-3 relative flex items-center justify-center">
              <svg
                width="72"
                height="72"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M12 52C12 52 16 32 36 20C48 12.8 54 10 54 10C54 10 51.2 16 44 28C32 48 12 52 12 52Z"
                  stroke="#680183"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, fill: "rgba(104, 1, 131, 0)" }}
                  animate={{
                    pathLength: 1,
                    fill: progress > 50 ? "rgba(104, 1, 131, 0.12)" : "rgba(104, 1, 131, 0)",
                  }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
                <motion.path
                  d="M12 52C22 42 34 30 54 10"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
                <motion.path
                  d="M26 38C30 35 36 33 42 32"
                  stroke="#680183"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
                <motion.path
                  d="M34 29C38 25 43 23 48 21"
                  stroke="#680183"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </svg>
            </div>

            {/* Step 2: Logo fades + scales in (0.8 -> 1) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
              className="relative z-10"
            >
              <img
                src="/images/logo/logo.webp"
                alt="Pureliva Logo"
                className="h-14 sm:h-16 w-auto object-contain mx-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/logo/logo.png";
                }}
              />
              <div className="h-8 mt-2 flex items-center justify-center">
                <motion.p
                  key={progress > 45 ? "tagline" : "welcome"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.4 }}
                  className="font-heading font-bold text-lg sm:text-xl text-[#680183]"
                >
                  {progress > 45 ? "Pure Nutrition in Every Spoon" : "Welcome to Pureliva"}
                </motion.p>
              </div>
              <p className="text-[11px] text-stone-500 font-medium">
                Patidar Enterprises • Khandwa, Madhya Pradesh
              </p>
            </motion.div>

            {/* Step 3: Small floating seed particles */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {[
                { x: -70, y: -40, rotate: 25, delay: 0.8, color: seedColors[0], scale: 1 },
                { x: 80, y: -30, rotate: -35, delay: 0.9, color: seedColors[1], scale: 1.1 },
                { x: -90, y: 50, rotate: 45, delay: 1.0, color: seedColors[2], scale: 0.9 },
                { x: 95, y: 40, rotate: -20, delay: 1.1, color: seedColors[3], scale: 1.2 },
                { x: 0, y: -65, rotate: 15, delay: 0.7, color: seedColors[4], scale: 0.85 },
                { x: -45, y: 70, rotate: -55, delay: 1.2, color: seedColors[0], scale: 0.75 },
                { x: 60, y: 75, rotate: 30, delay: 1.15, color: seedColors[2], scale: 0.95 },
              ].map((seed, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -30, scale: 0 }}
                  animate={{
                    opacity: [0, 0.9, 0.75],
                    y: seed.y,
                    x: seed.x,
                    scale: seed.scale,
                    rotate: seed.rotate,
                  }}
                  transition={{ duration: 1.2, delay: seed.delay, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/2 w-3.5 h-2 rounded-[50%]"
                  style={{ backgroundColor: seed.color }}
                />
              ))}
            </div>

            {/* Step 4: Royal Purple & Amber Gold progress line (0 -> 100%) */}
            <div className="w-56 mt-8">
              <div className="flex items-center justify-between text-xs font-mono font-semibold mb-1.5">
                <span className="text-[10px] uppercase tracking-widest text-stone-500">Loading Purity</span>
                <span className="text-[#680183] font-bold">{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-purple-100 rounded-full overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#53016A] via-[#680183] to-amber-400 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.2 }}
              className="text-[11px] text-stone-400 mt-4 tracking-wide"
            >
              Click anywhere to skip
            </motion.span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Preloader;
