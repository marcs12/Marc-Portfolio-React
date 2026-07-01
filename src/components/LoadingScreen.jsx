import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import LogoMarc from "../assets/adjust-logo.svg";
import SpiralAnimation from "./SpiralAnimation";
import GrainOverlay from "./GrainOverlay";

import { gsap } from "gsap";

// Single merged loader: the spiral forms in the background while the wordmark
// and progress bar fill on top, then the whole screen fades out to the site —
// one smooth stage instead of loader → intro.
const LOAD_DURATION = 4; // seconds — long enough for the spiral to form

// Editor-bay timecode for the load: 24fps across the loader's runtime, so the
// splash reads like a take rolling up, matching the red REC motif site-wide.
const FPS = 24;
const formatTC = (pct) => {
  const t = (pct / 100) * LOAD_DURATION;
  const s = Math.floor(t);
  const f = Math.floor((t - s) * FPS);
  return `00:00:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
};

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
        <p className="loading-meta mono">
          <span className="loading-rec">
            <i />
            REC
          </span>
          <span className="loading-tc">{formatTC(progress)}</span>
          <span className="loading-pct">{progress}%</span>
        </p>
      </div>

      <GrainOverlay />
    </div>
  );
};

LoadingScreen.propTypes = {
  onFinish: PropTypes.func,
};

export default LoadingScreen;
