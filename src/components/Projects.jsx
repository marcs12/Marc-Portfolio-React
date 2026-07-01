import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import WebGLHoverEffect from "./WebGLHoverEffect";
import ReelsGallery from "./ReelsGallery";
import Reveal from "./Reveal";
import projects from "../data/projects";
import reels from "../data/reels";

// The full index: web builds up top (hover for the WebGL preview), film cuts
// below (the reels rail), and the flip-link CTA to close.
const pad = (n) => String(n).padStart(2, "0");

const Projects = () => {
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".works-row",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="works projects-section">
      <header className="works-head section-shell" ref={headRef}>
        <p className="eyebrow">The index</p>
        <h1 className="works-title">
          Built and <em>cut.</em>
        </h1>
        <p className="works-intro">
          Web builds first, film cuts after. Every entry here was designed,
          coded, or edited by one pair of hands. Hover a title to preview,
          click through for the detail.
        </p>
        <ul className="works-stats mono" aria-label="Index totals">
          <li>
            <span>Web</span>
            <b>{pad(projects.length)}</b>
          </li>
          <li>
            <span>Film</span>
            <b>{pad(reels.length)}</b>
          </li>
          <li>
            <span>Range</span>
            <b>2023 / 25</b>
          </li>
        </ul>
      </header>

      {/* 01 — Web builds */}
      <div className="works-block section-shell">
        <div className="section-index">
          <span className="section-index-no mono">01</span>
          <span className="eyebrow">Web builds</span>
          <span className="section-index-rule" aria-hidden="true" />
        </div>
      </div>

      <ul className="works-list projects-list section-shell">
        {projects.map((p) => (
          <li className="works-row" key={p.slug}>
            <Link to={`/works/${p.slug}`} className="works-link">
              <span className="works-index mono">{p.index}</span>
              <span className="works-name">
                <h2>{p.title}</h2>
              </span>
              <span className="works-discipline mono">{p.discipline}</span>
              <span className="works-year mono">{p.year}</span>
              <span className="works-go" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* 02 — Film cuts */}
      <div className="works-block works-block--film section-shell">
        <div className="section-index">
          <span className="section-index-no mono">02</span>
          <span className="eyebrow">Film cuts</span>
          <span className="section-index-rule" aria-hidden="true" />
          <span className="works-block-note mono">
            Instagram Reels · 9:16
          </span>
        </div>
        <Reveal as="p" className="works-block-sub">
          Shot, cut, and graded by me. Hover to grade a frame in; click for
          sound.
        </Reveal>
      </div>

      <ReelsGallery embedded />

      <WebGLHoverEffect />
    </section>
  );
};

export default Projects;
