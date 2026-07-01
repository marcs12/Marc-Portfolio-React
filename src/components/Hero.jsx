import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

// Wordmark entrance: each letter swings up + flips in, staggered.
const wordmarkContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } },
};
const wordmarkLetter = {
  hidden: { opacity: 0, y: 70, rotateX: -70 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 1, ease } },
};

const GhostWord = ({ text }) => (
  <span className="hero-word" aria-hidden="true">
    {text.split("").map((ch, i) => (
      <motion.span className="hero-letter" variants={wordmarkLetter} key={i}>
        {ch}
      </motion.span>
    ))}
  </span>
);

// Second half of the identity line — cycles to say "all of it, one person".
const ROLES = ["Video Editor", "Motion Designer", "Web Designer", "Colorist"];

const Hero = () => {
  const [clock, setClock] = useState(formatVancouver());
  const [role, setRole] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setClock(formatVancouver()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2400);
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

      {/* Oversized ghost wordmark — sits BEHIND the particle logo (z:-1).
          Outlined editorial type, staggered, so the 3D mark reads in front. */}
      <motion.h1
        className="hero-wordmark"
        aria-label="Marc Sapa"
        variants={wordmarkContainer}
        initial="hidden"
        animate="show"
      >
        <GhostWord text="Marc" />
        <GhostWord text="Sapa" />
      </motion.h1>

      <div className="hero-grid">
        <motion.p
          className="eyebrow hero-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.9 }}
        >
          Creative technologist
        </motion.p>

        <motion.p
          className="hero-roles mono"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.05 }}
          aria-label={`Front-end developer and ${ROLES.join(", ")}`}
        >
          <span>Front-End Developer</span>
          <span className="hero-roles-x" aria-hidden="true">
            &times;
          </span>
          <span className="hero-roles-flip" aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={ROLES[role]}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                exit={{ y: "-110%" }}
                transition={{ duration: 0.45, ease }}
              >
                {ROLES[role]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.p>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.15 }}
        >
          One person from first frame to final build. I design the interface,
          write the front-end, and cut the film. Everything ships speaking the
          same language.
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
