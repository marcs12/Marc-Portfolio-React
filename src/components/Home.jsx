import "../styles/styles.scss";

import { Link } from "react-router-dom";
import Hero from "./Hero";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import projects from "../data/projects";

const MARQUEE = [
  "Web Design",
  "Front-End Development",
  "Motion & Interaction",
  "3D / WebGL",
  "Design Systems",
  "Brand Sites",
];

const CAPABILITIES = [
  {
    no: "01",
    title: "Design",
    body: "Interface and brand design in Figma: type, layout, and a system that holds together across every screen.",
    tags: ["UX/UI", "Prototyping", "Design Systems"],
  },
  {
    no: "02",
    title: "Build",
    body: "Hand-written React front-ends. No page builders, no bloated templates. Fast, accessible, maintainable code.",
    tags: ["React", "Sass", "Performance"],
  },
  {
    no: "03",
    title: "Motion",
    body: "Scroll-driven reveals, 3D, and micro-interactions with GSAP and Three.js. Motion that feels intentional, never noisy.",
    tags: ["GSAP", "Three.js", "WebGL"],
  },
];

const Home = () => {
  const featured = projects.slice(0, 3);

  return (
    <div id="main-wrapper">
      <Hero />

      {/* Manifesto marquee */}
      <section className="marquee-band" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <ul className="marquee-row" key={dup}>
              {MARQUEE.map((word) => (
                <li key={word}>
                  {word}
                  <span className="marquee-dot" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* Positioning statement */}
      <section className="statement" id="approach">
        <div className="section-shell">
          <Reveal as="p" className="eyebrow">
            The approach
          </Reveal>
          <Reveal as="h2" className="statement-text" delay={0.05}>
            Most sites look fine and feel forgettable. I build the other kind,
            where the typography, the motion, and the load time all pull in the{" "}
            <em>same direction.</em>
          </Reveal>
        </div>
      </section>

      {/* Selected work */}
      <section className="featured" id="selected-work">
        <div className="section-shell">
          <Reveal className="section-head">
            <p className="eyebrow">Selected work</p>
            <Link to="/works" className="section-head-link">
              All projects
              <span className="link-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </Reveal>

          <ul className="featured-list">
            {featured.map((p, i) => (
              <Reveal as="li" className="featured-item" key={p.slug} delay={i * 0.05}>
                <Link to={`/works/${p.slug}`} className="featured-link">
                  <div className="featured-media">
                    <video
                      src={p.video}
                      playsInline
                      autoPlay
                      muted
                      loop
                      aria-label={`${p.title} preview`}
                    />
                    <span className="featured-disc mono">{p.discipline}</span>
                  </div>
                  <div className="featured-meta">
                    <span className="featured-index mono">{p.index}</span>
                    <SplitText as="h3" text={p.title} />
                    <p>{p.summary}</p>
                    <span className="featured-year mono">{p.year}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities */}
      <section className="capabilities" id="capabilities">
        <div className="section-shell">
          <Reveal as="p" className="eyebrow">
            What I do
          </Reveal>
          <SplitText
            as="h2"
            className="capabilities-title"
            text="One person, the whole pipeline."
            delay={0.05}
          />

          <ul className="capability-list">
            {CAPABILITIES.map((c, i) => (
              <Reveal as="li" className="capability" key={c.no} delay={i * 0.06}>
                <span className="capability-no mono">{c.no}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <ul className="capability-tags">
                  {c.tags.map((t) => (
                    <li key={t} className="mono">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
