import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import reels from "../data/reels";

const formatTC = (s) => {
  if (!Number.isFinite(s)) return "00:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

const SpeakerIcon = ({ muted }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M11 5 6 9H3v6h3l5 4V5z" />
    {muted ? (
      <path d="m16 9 5 6M21 9l-5 6" />
    ) : (
      <>
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M18.5 5.5a9 9 0 0 1 0 13" />
      </>
    )}
  </svg>
);

SpeakerIcon.propTypes = {
  muted: PropTypes.bool,
};

const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

// `embedded`: the host page provides its own section label (e.g. the Works
// index), so skip the built-in header and let the rail sit flush.
const ReelsGallery = ({ embedded = false }) => {
  const [active, setActive] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [lbMuted, setLbMuted] = useState(false);
  const [lbPaused, setLbPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [clock, setClock] = useState({ cur: 0, dur: 0 });

  const trackRef = useRef(null);
  const videoRefs = useRef([]);
  const lbVideoRef = useRef(null);

  // Play only the active preview; everything else holds its last frame.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && lightbox === null) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
    if (active === null) setProgress(0);
  }, [active, lightbox]);

  // Touch devices have no hover: drive `active` from the snap carousel via
  // IntersectionObserver instead.
  useEffect(() => {
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)");
    if (!coarse.matches || !trackRef.current) return undefined;

    const panels = Array.from(trackRef.current.children);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(panels.indexOf(e.target));
        });
      },
      { root: trackRef.current, threshold: 0.65 },
    );
    panels.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, []);

  // Lightbox: lock scroll, close on Escape.
  useEffect(() => {
    if (lightbox === null) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  // Sound in the lightbox is gated behind the click that opened it, but some
  // browsers still refuse unmuted playback — fall back to muted instead of
  // showing a frozen frame.
  useEffect(() => {
    const v = lbVideoRef.current;
    if (lightbox === null || !v) return;
    v.muted = lbMuted;
    if (!lbPaused) {
      v.play().catch(() => setLbMuted(true));
    }
  }, [lightbox, lbMuted, lbPaused]);

  const onTimeUpdate = useCallback(
    (i) => (e) => {
      if (i !== active) return;
      const v = e.currentTarget;
      setProgress(v.duration ? v.currentTime / v.duration : 0);
      setClock({ cur: v.currentTime, dur: v.duration || 0 });
    },
    [active],
  );

  const openLightbox = (i) => {
    setLbMuted(false);
    setLbPaused(false);
    setLightbox(i);
  };

  const toggleLbPlayback = () => {
    const v = lbVideoRef.current;
    if (!v) return;
    if (v.paused) {
      setLbPaused(false);
      v.play().catch(() => {});
    } else {
      setLbPaused(true);
      v.pause();
    }
  };

  const current = lightbox !== null ? reels[lightbox] : null;

  return (
    <section
      className={`reels${embedded ? " is-embedded" : ""}`}
      id="reels"
    >
      <div className="section-shell">
        {!embedded && (
          <>
            <Reveal className="section-head">
              <p className="eyebrow">In motion</p>
              <span className="reels-head-note mono">
                Instagram Reels · 9:16
              </span>
            </Reveal>

            <SplitText
              as="h2"
              className="reels-heading"
              text="Same eye, different medium."
              delay={0.05}
            />
            <Reveal as="p" className="reels-sub" delay={0.1}>
              Shot, cut, and graded by me. The same timing and rhythm that
              drive this site&rsquo;s motion, applied to film. Hover to grade a
              frame in; click for sound.
            </Reveal>
          </>
        )}

        <Reveal className="reels-stage" delay={0.12}>
          <ul
            className="reels-track"
            ref={trackRef}
            onMouseLeave={() => setActive(null)}
          >
            {reels.map((r, i) => (
              <li
                key={r.id}
                className={`reel${active === i ? " is-active" : ""}`}
              >
                <button
                  type="button"
                  className="reel-hit"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => openLightbox(i)}
                  aria-label={`Play reel: ${r.title}, ${r.location}`}
                  aria-haspopup="dialog"
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={r.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onTimeUpdate={onTimeUpdate(i)}
                    tabIndex={-1}
                  />
                  <span className="reel-scrim" aria-hidden="true" />

                  <span className="reel-top mono" aria-hidden="true">
                    <span className="reel-index">{r.index}</span>
                    <span className="reel-rec">
                      <i />
                      REC
                    </span>
                  </span>

                  <span className="reel-meta">
                    <span className="reel-title">{r.title}</span>
                    <span className="reel-place mono">
                      {r.location} · {r.year}
                    </span>
                    <span className="reel-tags">
                      {r.tags.map((t) => (
                        <span key={t} className="mono">
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>

                  <span className="reel-tc mono" aria-hidden="true">
                    {active === i
                      ? `${formatTC(clock.cur)} / ${formatTC(clock.dur)}`
                      : "9:16"}
                  </span>
                  <span
                    className="reel-progress"
                    aria-hidden="true"
                    style={{
                      transform: `scaleX(${active === i ? progress : 0})`,
                    }}
                  />
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="reel-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${current.title} — full reel`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => setLightbox(null)}
          >
            <motion.figure
              className="reel-lightbox-card"
              initial={{ scale: 0.94, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 12, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="reel-lightbox-media">
                {/* Custom controls replace the native ones on purpose. */}
                <video
                  ref={lbVideoRef}
                  src={current.src}
                  autoPlay
                  loop
                  playsInline
                  onClick={toggleLbPlayback}
                />
                {lbPaused && (
                  <span className="reel-lightbox-paused mono" aria-hidden="true">
                    Paused
                  </span>
                )}
              </div>

              <figcaption className="reel-lightbox-info">
                <span className="mono reel-lightbox-index">
                  {current.index} / {String(reels.length).padStart(2, "0")}
                </span>
                <h3>{current.title}</h3>
                <p>{current.caption}</p>
                <span className="reel-lightbox-tags">
                  {current.tags.map((t) => (
                    <span key={t} className="mono">
                      {t}
                    </span>
                  ))}
                </span>
              </figcaption>

              <div className="reel-lightbox-actions">
                <button
                  type="button"
                  onClick={() => setLbMuted((m) => !m)}
                  aria-label={lbMuted ? "Unmute" : "Mute"}
                  aria-pressed={lbMuted}
                >
                  <SpeakerIcon muted={lbMuted} />
                </button>
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  aria-label="Close"
                >
                  <CloseIcon />
                </button>
              </div>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

ReelsGallery.propTypes = {
  embedded: PropTypes.bool,
};

export default ReelsGallery;
