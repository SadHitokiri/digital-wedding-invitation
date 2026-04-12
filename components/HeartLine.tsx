"use client";

import { motion } from "framer-motion";

export default function HeartLine() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="absolute inset-0 w-full h-full pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ delay: 3, duration: 0.5 }}
      preserveAspectRatio="xMidYMid slice"
    >
      <motion.path
        d="M100 170 
           C 20 100, 20 40, 60 40
           C 90 40, 100 70, 100 70
           C 100 70, 110 40, 140 40
           C 180 40, 180 100, 100 170"
        fill="transparent"
        stroke="#A67C52"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 2.2,
          duration: 4,
          ease: "easeInOut",
        }}
        style={{
          filter: "drop-shadow(0 0 8px rgba(166,124,82,0.3))",
        }}
      />
    </motion.svg>
  );
}