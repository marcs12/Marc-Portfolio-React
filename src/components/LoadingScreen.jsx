import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LogoMarc from "../assets/adjust-logo.svg";
import SpiralAnimation from "./SpiralAnimation";
import GrainOverlay from "./GrainOverlay";

import { gsap } from "gsap";

// Single merged loader: the spiral forms in the background while the wordmark
// and progress bar fill on top, then the whole screen fades out to the site —
// one smooth stage instead of loader → intro.
const LOAD_DURATION = 4; // seconds — long enough for the spiral to form

const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const animation = gsap.to(".loading-bar", {
      width: "100%",
      duration: LOAD_DURATION,
      ease: "power1.inOut",
      onUpdate: () => setProgress(Math.round(animation.progress() * 100)),
      onComplete: () => {
        setFading(true);
        // Match the CSS fade before handing off to the site.
        window.setTimeout(() => onFinish && onFinish(), 900);
      },
    });

    return () => animation.kill();
  }, [onFinish]);

  return (
    <div className={`loading-container has-spiral${fading ? " is-fading" : ""}`}>
      <div className="loading-spiral">
        <SpiralAnimation
          loop={false}
          duration={LOAD_DURATION + 0.6}
          particleColor="#f4f2ee"
          bgColor="#060608"
        />
      </div>

      <div className="loading-content">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0, 1, 1] }}
          transition={{ duration: 1, times: [0, 0.33, 0.66, 1], repeat: 0 }}
          className="loading-logo"
        >
          <img src={LogoMarc} alt="Logo" />
        </motion.div>
        <div className="loading-bar" style={{ width: `${progress}%` }} />
        <p className="loading-text">{progress}%</p>
      </div>

      <GrainOverlay />
    </div>
  );
};

export default LoadingScreen;
