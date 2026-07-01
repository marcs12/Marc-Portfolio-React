import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal from "./Reveal";

// The whole practice laid out as an editor's timeline: the section pins,
// scroll scrubs the track sideways, and a red playhead + timecode ride along.
const STAGES = [
  {
    no: "01",
    title: "Concept",
    body: "Every build starts as a storyboard, whether it ships as a website or a film. What's the story, and what should it feel like at second three?",
    tags: ["Storyboards", "References", "Scope"],
  },
  {
    no: "02",
    title: "Design",
    body: "Type, layout, and a component system in Figma that survives contact with real content. Decisions, not decoration.",
    tags: ["Figma", "Design Systems", "Prototypes"],
  },
  {
    no: "03",
    title: "Build",
    body: "Hand-written React, GSAP, and Three.js. Fast, accessible, and animated with intent. No page builders, no templates.",
    tags: ["React", "GSAP", "Three.js", "Sass"],
  },
  {
    no: "04",
    title: "Shoot & Cut",
    body: "Camera out, then into Premiere. Cuts that land on the beat, a grade that matches the brand. The same timing instincts at 24 frames a second.",
    tags: ["Premiere", "After Effects", "Color"],
  },
  {
    no: "05",
    title: "Ship",
    body: "Performance pass, accessibility check, deploy. Then we press play and watch it run.",
    tags: ["QA", "Perf", "Deploy"],
  },
];

const FPS = 24;
const RUNTIME = 24; // fake runtime in seconds for the scrub timecode

const formatTC = (p) => {
  const t = Math.max(0, Math.min(1, p)) * RUNTIME;
  const s = Math.floor(t);
  const f = Math.floor((t - s) * FPS);
  return `00:00:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
};

const RULER_TICKS = 48;

const PipelineTimeline = () => {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [maxShift, setMaxShift] = useState(0);
  const [tc, setTc] = useState(formatTC(0));
  const [isNarrow, setIsNarrow] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // How far the track must travel so its last card ends flush right.
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return;
      setMaxShift(
        Math.max(
          0,
          trackRef.current.scrollWidth - viewportRef.current.clientWidth,
        ),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [isNarrow]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -maxShift]);
  const playhead = useTransform(scrollYProgress, (p) => `${p * 100}%`);

  useMotionValueEvent(scrollYProgress, "change", (p) => setTc(formatTC(p)));

  const flat = isNarrow || prefersReduced;

  return (
    <section
      className={`pipeline${flat ? " is-flat" : ""}`}
      id="pipeline"
      ref={sectionRef}
    >
      <div className="pipeline-sticky" ref={viewportRef}>
        <div className="section-shell pipeline-head">
          <Reveal>
            <p className="eyebrow">The pipeline</p>
          </Reveal>
          {!flat && (
            <span className="pipeline-tc mono" aria-hidden="true">
              TC {tc}
            </span>
          )}
        </div>

        <motion.ol
          className="pipeline-track"
          ref={trackRef}
          style={flat ? undefined : { x }}
        >
          {STAGES.map((s, i) => (
            <Reveal
              as="li"
              className="pipeline-card"
              key={s.no}
              delay={flat ? i * 0.05 : 0}
            >
              <span className="pipeline-card-no mono">{s.no}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ul className="pipeline-card-tags">
                {s.tags.map((t) => (
                  <li key={t} className="mono">
                    {t}
                  </li>
                ))}
              </ul>
              <span className="pipeline-card-frame mono" aria-hidden="true">
                {String(i * 120).padStart(4, "0")}f
              </span>
            </Reveal>
          ))}
        </motion.ol>

        {!flat && (
          <div className="pipeline-ruler" aria-hidden="true">
            {Array.from({ length: RULER_TICKS }, (_, i) => (
              <span
                key={i}
                className={`pipeline-tick${i % 8 === 0 ? " is-major" : ""}`}
              />
            ))}
            <motion.span
              className="pipeline-playhead"
              style={{ left: playhead }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PipelineTimeline;
