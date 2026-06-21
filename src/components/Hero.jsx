import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Scene from "./Scene";
import { CanvasRevealEffect } from "./ui/canvas-reveal-effect";

// Local Vancouver clock via Intl. No network call, reliable on static hosting.
const formatVancouver = () => {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Vancouver",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  return `${time} PT`;
};

const ease = [0.23, 1, 0.32, 1];

const Hero = () => {
  const [clock, setClock] = useState(formatVancouver());

  useEffect(() => {
    const id = setInterval(() => setClock(formatVancouver()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-reveal" aria-hidden="true">
        <CanvasRevealEffect
          animationSpeed={3}
          colors={[
            [255, 255, 255],
            [255, 255, 255],
          ]}
          dotSize={4}
          showGradient
        />
      </div>
      <div className="hero-canvas">
        <Scene />
      </div>

      <div className="hero-grid">
        <motion.p
          className="eyebrow hero-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.9 }}
        >
          Creative developer &amp; web designer
        </motion.p>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.15 }}
        >
          I design and build fast websites, doing both the design and the
          front-end myself so the work stays consistent from layout to code.
        </motion.p>
      </div>

      <motion.div
        className="hero-hud"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <div className="hud-item">
          <span className="hud-label">Based in</span>
          <span className="hud-value">Vancouver, BC</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">Local time</span>
          <span className="hud-value mono">{clock}</span>
        </div>
        <div className="hud-item hud-scroll">
          <span className="hud-label">Scroll</span>
          <span className="hud-arrow" aria-hidden="true" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
