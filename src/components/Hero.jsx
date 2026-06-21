import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Scene from "./Scene";

// Local Vancouver clock via Intl — no network call, reliable on static hosting.
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

        <motion.h1
          className="hero-headline"
          initial={{ opacity: 0, filter: "blur(8px)", y: 18 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1 }}
        >
          Websites with weight,
          <br />
          <em>built to be felt.</em>
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.15 }}
        >
          I design and build cinematic, fast websites — the kind that make a
          studio of one look like an agency of ten.
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
