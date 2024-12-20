import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Importing framer-motion for animations

const NotFound = () => {
  return (
    <div className="notfound-container">
      <motion.div
        className="notfound-message"
        initial={{ opacity: 0, y: -100 }} // Start offscreen and transparent
        animate={{ opacity: 1, y: 0 }} // Fade in and slide down
        transition={{ duration: 1 }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }} // Start small and transparent
          animate={{ opacity: 1, scale: 1 }} // Fade in and scale up
          transition={{
            duration: 1,
            delay: 0.2,
            type: "spring",
            stiffness: 120,
          }}
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -100 }} // Start off to the left
          animate={{ opacity: 1, x: 0 }} // Slide in from the left
          transition={{ duration: 1, delay: 0.4 }}
        >
          Oops! The page you're looking for cannot be found.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} // Start slightly scaled down
          animate={{ opacity: 1, scale: 1 }} // Scale to normal size
          transition={{
            duration: 1,
            delay: 0.6,
            type: "spring",
            stiffness: 120,
          }}
        >
          <Link to="/" className="back-home-link">
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
