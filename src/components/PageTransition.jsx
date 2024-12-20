// src/components/PageTransition.jsx
import React from "react";
import { motion } from "framer-motion"; // Ensure you have installed framer-motion

// Define transition variants for sliding and fading animations
const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw", // Slide from left
  },
  animate: {
    opacity: 1,
    x: 0, // Slide to normal position
    transition: { type: "spring", stiffness: 120, damping: 25 },
  },
  exit: {
    opacity: 0,
    x: "100vw", // Slide to the right on exit
    transition: { type: "spring", stiffness: 120, damping: 25 },
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
