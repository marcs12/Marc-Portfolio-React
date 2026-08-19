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
    // Spiral needs a beat to read as motion before we ever cut away.
    const MIN_DURATION = 1.2;
    const start = performance.now();
    let done = false;

    // Drive a plain counter (not the bar's width) so React owns the bar via
    // `progress` and gsap owns the timing. LOAD_DURATION is the hard cap:
    // if nothing signals ready, the loader still completes on its own.
    const counter = { v: 0 };
    const tween = gsap.to(counter, {
      v: 100,
      duration: LOAD_DURATION,
      ease: "power1.out",
      onUpdate: () => setProgress(Math.round(counter.v)),
      onComplete: () => {
        if (done) return;
        done = true;
        setProgress(100);
        setFading(true);
        // Match the CSS fade before handing off to the site.
        window.setTimeout(() => onFinish && onFinish(), 900);
      },
    });

    // Finish as soon as the assets that gate first paint are ready — the
    // wordmark font (the hero's LCP element) plus a full-load backstop — but
    // never before MIN_DURATION so the spiral still forms. Once ready, rush
    // the bar to 100 by speeding the tween up rather than snapping it.
    let sped = false;
    const rushToEnd = () => {
      if (sped || done) return;
      sped = true;
      const elapsed = (performance.now() - start) / 1000;
      gsap.delayedCall(Math.max(0, MIN_DURATION - elapsed), () => {
        if (!done) gsap.to(tween, { timeScale: 6, duration: 0.3, ease: "power2.in" });
      });
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(rushToEnd);
    } else {
      rushToEnd();
    }
    if (document.readyState === "complete") {
      rushToEnd();
    } else {
      window.addEventListener("load", rushToEnd, { once: true });
    }

    return () => {
      tween.kill();
      window.removeEventListener("load", rushToEnd);
    };
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
