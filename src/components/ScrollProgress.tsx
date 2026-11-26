import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#680183] via-amber-400 to-[#9333EA] origin-left z-50 pointer-events-none shadow-[0_0_10px_rgba(251,191,36,0.7)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;

