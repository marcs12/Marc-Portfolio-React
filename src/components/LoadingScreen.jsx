import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LogoMarc from "../assets/adjust-logo.svg";

import { gsap } from "gsap";

const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const animation = gsap.to(".loading-bar", {
      width: "100%",
      duration: 2, // Adjust the duration
      ease: "power1.inOut",
      onUpdate: () => {
        const progress = Math.round(animation.progress() * 100);
        setProgress(progress);
      },
      onComplete: onFinish,
    });

    return () => animation.kill();
  }, [onFinish]);

  return (
    <div className="loading-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 1, 0, 1, 1] }}
        transition={{ duration: 1, times: [0, 0.33, 0.66, 1], repeat: 0 }}
        className="loading-logo"
      >
        <img src={LogoMarc} alt="Logo" />
      </motion.div>
      <motion.div
        className="loading-bar"
        style={{ width: `${progress}%` }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
      />
      <p className="loading-text">{progress}%</p>
    </div>
  );
};

export default LoadingScreen;
