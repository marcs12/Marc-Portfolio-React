// src/components/PageTransition.jsx
import React from "react";
import { motion } from "framer-motion"; // Ensure you have installed framer-motion

// GPU-only fade-up. Replaces the old full-viewport x-slide (which risked
// horizontal scroll and felt heavy). Enter is responsive (ease-out), exit snaps.
const ease = [0.23, 1, 0.32, 1];
const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease },
  },
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      className="page-container"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
