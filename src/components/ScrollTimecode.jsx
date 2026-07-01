import { useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

// Fixed timecode readout that scrubs with page scroll — the whole page reads
// as one continuous take. Desktop-only (CSS) and skipped for reduced motion.
const FPS = 24;
const RUNTIME = 90; // seconds mapped across the full page scroll

const formatTC = (p) => {
  const t = Math.max(0, Math.min(1, p)) * RUNTIME;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  const f = Math.floor((t % 1) * FPS);
  return `00:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
};

const ScrollTimecode = () => {
  const { scrollYProgress } = useScroll();
  const [tc, setTc] = useState(formatTC(0));
  const prefersReduced = useReducedMotion();

  useMotionValueEvent(scrollYProgress, "change", (p) => setTc(formatTC(p)));

  if (prefersReduced) return null;

  return (
    <div className="scroll-timecode mono" aria-hidden="true">
      <i />
      TC {tc}
    </div>
  );
};

export default ScrollTimecode;
