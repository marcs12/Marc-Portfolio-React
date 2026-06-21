import { useMemo } from "react";
import { motion } from "framer-motion";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Canvas } from "@react-three/fiber";

import MarcPhoto from "../assets/IMG_1968.JPG";
import Reveal from "./Reveal";
import TextEffect from "./TextEffect";
import { DevelopmentModel } from "./DevelopmentModel";
import { DesignModel } from "./DesignModel";
import { PerformanceModel } from "./PerformanceModel";

// Dev / tech icons
import FramerMotionIcon from "../assets/icons/framer-motion.svg";
import GsapGreensockIconAlt from "../assets/icons/gsap-greensock.svg";
import CssIcon from "../assets/icons/icons8-css.svg";
import HtmlIcon from "../assets/icons/icons8-html.svg";
import JavascriptIcon from "../assets/icons/icons8-javascript.svg";
import PhpIcon from "../assets/icons/icons8-php.svg";
import ReactIcon from "../assets/icons/icons8-react.svg";
import WordpressIcon from "../assets/icons/icons8-wordpress.svg";
import SassIcon from "../assets/icons/sass-brands-solid.svg";
import ThreeJsIcon from "../assets/icons/threejs.svg";

// Design tool icons
import AfterEffectsIcon from "../assets/icons/after-effects-4bhU2Cqf.png";
import FigmaIcon from "../assets/icons/figma-CCcFopil.png";
import IllustratorIcon from "../assets/icons/illustrator-CG5Mii6m.png";
import PhotoshopIcon from "../assets/icons/photoshop-DCnsx6Sy.png";
import LightroomIcon from "../assets/icons/photoshop-lightroom-BDeX5MDj.png";
import PremiereProIcon from "../assets/icons/premiere-pro-DEinuioA.png";
import XdIcon from "../assets/icons/xd-Bj4jYHe2.png";

const SERVICES = [
  {
    label: "Web development",
    copy: "Hand-built React front-ends — fast, accessible, and easy to maintain.",
    Model: DevelopmentModel,
    camera: { position: [0, 0, 5], fov: 43, near: 0.1, far: 1000 },
    cameraMobile: { position: [0, 0, 35], fov: 43, near: 0.1, far: 1000 },
    light: [0, 0, 5],
  },
  {
    label: "UX/UI & prototyping",
    copy: "Interface design and prototyping in Figma, grounded in a real system.",
    Model: DesignModel,
    camera: { position: [0, 0, 400] },
    cameraMobile: { position: [0, 0, 800] },
    light: [0, 5, 5],
  },
  {
    label: "Motion & interactivity",
    copy: "Scroll-driven reveals, 3D, and micro-interactions that feel intentional.",
    Model: PerformanceModel,
    camera: { position: [0, 0, 400] },
    cameraMobile: { position: [0, 0, 800] },
    light: [0, 5, 5],
  },
];

const About = () => {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth <= 768;

  const techStackIcons = useMemo(
    () => [
      { src: HtmlIcon, alt: "HTML" },
      { src: CssIcon, alt: "CSS" },
      { src: JavascriptIcon, alt: "JavaScript" },
      { src: PhpIcon, alt: "PHP" },
      { src: ReactIcon, alt: "React" },
      { src: SassIcon, alt: "Sass" },
      { src: WordpressIcon, alt: "WordPress" },
      { src: ThreeJsIcon, alt: "Three.js" },
      { src: FramerMotionIcon, alt: "Framer Motion" },
      { src: GsapGreensockIconAlt, alt: "GSAP" },
    ],
    [],
  );

  const designToolsIcons = useMemo(
    () => [
      { src: AfterEffectsIcon, alt: "After Effects" },
      { src: FigmaIcon, alt: "Figma" },
      { src: IllustratorIcon, alt: "Illustrator" },
      { src: PhotoshopIcon, alt: "Photoshop" },
      { src: LightroomIcon, alt: "Lightroom" },
      { src: PremiereProIcon, alt: "Premiere Pro" },
      { src: XdIcon, alt: "Adobe XD" },
    ],
    [],
  );

  return (
    <section className="about-section">
      {/* Intro */}
      <div className="about-intro section-shell">
        <Reveal className="about-intro-text">
          <p className="eyebrow">About</p>
          <h1 className="about-heading">
            A front-end developer and designer who treats craft as the brief,
            not the bonus.
          </h1>
          <p className="about-lead">
            I&rsquo;m Marc — based in Vancouver. I come from web design and video
            editing, and I&rsquo;ve learned to build sites that are as careful
            about how they move as how they look. One person handling design and
            development means nothing gets lost in handoff.
          </p>
        </Reveal>

        <Reveal className="about-portrait" delay={0.1}>
          <img src={MarcPhoto} alt="Marc Sapa" loading="lazy" />
          <span className="about-portrait-tag mono">Marc Sapa — 2026</span>
        </Reveal>
      </div>

      {/* Toolkit */}
      <div className="about-stack section-shell">
        <Reveal as="p" className="eyebrow">
          The toolkit
        </Reveal>
        <Reveal className="stack-container" delay={0.05}>
          <Tabs>
            <TabList>
              <Tab>Development</Tab>
              <Tab>Design</Tab>
            </TabList>

            <TabPanel>
              <div className="stack-icons">
                {techStackIcons.map((icon) => (
                  <motion.div
                    key={icon.alt}
                    whileHover={{ y: -4 }}
                    title={icon.alt}
                  >
                    <img src={icon.src} alt={icon.alt} loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </TabPanel>

            <TabPanel>
              <div className="stack-icons">
                {designToolsIcons.map((icon) => (
                  <motion.div
                    key={icon.alt}
                    whileHover={{ y: -4 }}
                    title={icon.alt}
                  >
                    <img src={icon.src} alt={icon.alt} loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </TabPanel>
          </Tabs>
        </Reveal>
      </div>

      {/* Services */}
      <div className="about-services section-shell">
        <Reveal as="p" className="eyebrow">
          What I can do for you
        </Reveal>
        <Reveal as="h2" className="about-services-title" delay={0.05}>
          Three things, done properly.
        </Reveal>

        <div className="models-container">
          {SERVICES.map(({ label, copy, Model, camera, cameraMobile, light }, i) => (
            <Reveal as="div" className="model-item" key={label} delay={i * 0.06}>
              <div className="canvas-container">
                <Canvas camera={isMobile ? cameraMobile : camera}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={light} intensity={1} />
                  <Model />
                </Canvas>
              </div>
              <h3>{label}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="about-cta section-shell">
        <TextEffect />
      </div>
    </section>
  );
};

export default About;
