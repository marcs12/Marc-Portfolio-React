import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import WebGLHoverEffect from "./WebGLHoverEffect";
import projects from "../data/projects";

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
        <p className="eyebrow">Selected work — 2024 / 2025</p>
        <h1 className="works-title">
          Projects, in <em>full.</em>
        </h1>
        <p className="works-intro">
          A short, honest index. Each one was designed and built end to end —
          hover a title to preview, click through for the detail.
        </p>
      </header>

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

      <WebGLHoverEffect />
    </section>
  );
};

export default Projects;
