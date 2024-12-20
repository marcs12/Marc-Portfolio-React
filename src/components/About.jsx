import { useRef, useState, useMemo } from "react";
import Barcode from "../assets/barcode-long.png";
import { motion } from "framer-motion";
import MarcPhoto from "../assets/IMG_1968.JPG";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { OrbitControls } from "@react-three/drei";
import TextEffect from "./TextEffect";

// Icons
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

// Design Tools
import AfterEffectsIcon from "../assets/icons/after-effects-4bhU2Cqf.png";
import FigmaIcon from "../assets/icons/figma-CCcFopil.png";
import IllustratorIcon from "../assets/icons/illustrator-CG5Mii6m.png";
import PhotoshopIcon from "../assets/icons/photoshop-DCnsx6Sy.png";
import LightroomIcon from "../assets/icons/photoshop-lightroom-BDeX5MDj.png";
import PremiereProIcon from "../assets/icons/premiere-pro-DEinuioA.png";
import XdIcon from "../assets/icons/xd-Bj4jYHe2.png";

// 3D Models
import { Canvas } from "@react-three/fiber";
import { DevelopmentModel } from "./DevelopmentModel";
import { DesignModel } from "./DesignModel";
import { PerformanceModel } from "./PerformanceModel";

const About = () => {
  const sectionRef = useRef(null);

  const isMobile = window.innerWidth <= 768;

  const techStackIcons = useMemo(
    () => [
      { src: HtmlIcon, alt: "HTML Icon" },
      { src: CssIcon, alt: "CSS Icon" },
      { src: JavascriptIcon, alt: "JavaScript Icon" },
      { src: PhpIcon, alt: "PHP Icon" },
      { src: ReactIcon, alt: "React Icon" },
      { src: SassIcon, alt: "Sass Icon" },
      { src: WordpressIcon, alt: "WordPress Icon" },
      { src: ThreeJsIcon, alt: "Three.js Icon" },
      { src: FramerMotionIcon, alt: "Framer Motion Icon" },
      { src: GsapGreensockIconAlt, alt: "GSAP Greensock Icon" },
    ],
    [],
  );

  const designToolsIcons = useMemo(
    () => [
      { src: AfterEffectsIcon, alt: "After Effects Icon" },
      { src: FigmaIcon, alt: "Figma Icon" },
      { src: IllustratorIcon, alt: "Illustrator Icon" },
      { src: PhotoshopIcon, alt: "Photoshop Icon" },
      { src: LightroomIcon, alt: "Lightroom Icon" },
      { src: PremiereProIcon, alt: "Premiere Pro Icon" },
      { src: XdIcon, alt: "XD Icon" },
    ],
    [],
  );

  return (
    <section className="about-section">
      <motion.div
        className="first-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container-pic-text">
          <motion.article
            className="top-section"
            ref={sectionRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              className="barcode-ornament"
              src={Barcode}
              alt="Barcode ornament"
              aria-hidden="true"
              loading="lazy"
            />
            <div className="vl"></div>
            <div className="photo-intro">
              <img
                className="marc-photo"
                src={MarcPhoto}
                alt="Marc Sapa"
                loading="lazy"
              />
              <p className="intro-label">01. Introduction</p>
              <h1>About Me</h1>
              <p className="introduction">
                Hi, I’m Marc, a Front-End Developer and Web Designer focused on
                Crafting Clean & Consistent Experiences. I have a background in
                Web Design and Video Editing, and with these two fields
                combined, I can create visually appealing websites that are both
                functional and user-friendly.
              </p>
            </div>
          </motion.article>
        </div>

        <motion.article
          className="my-stack"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="stack-label">02. My Tech Stack</p>
          <div className="stack-container">
            <Tabs>
              <TabList>
                <Tab>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="typewriter"
                  >
                    Development Tools
                  </motion.p>
                </Tab>
                <Tab>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="typewriter"
                  >
                    Design Tools
                  </motion.p>
                </Tab>
              </TabList>

              <TabPanel>
                <div className="stack-icons">
                  {techStackIcons.map((icon, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <img src={icon.src} alt={icon.alt} loading="lazy" />
                    </motion.div>
                  ))}
                </div>
              </TabPanel>

              <TabPanel>
                <div className="stack-icons">
                  {designToolsIcons.map((icon, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <img src={icon.src} alt={icon.alt} loading="lazy" />
                    </motion.div>
                  ))}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </motion.article>
      </motion.div>
      <motion.div
        className="second-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <TextEffect />
        {/* 3D Models Section */}
        <motion.article
          className="three-models"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="stack-label">03. What I Can Do For You</p>
          <div className="models-container">
            <motion.div
              className="model-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p>Front-End Development</p>
              <div className="canvas-container">
                <Canvas
                  camera={{
                    position: isMobile ? [0, 0, 35] : [0, 0, 5],
                    fov: 43,
                    near: 0.1,
                    far: 1000,
                  }}
                >
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[0, 0, 5]} intensity={1} />
                  <DevelopmentModel />
                </Canvas>
              </div>
            </motion.div>

            <motion.div
              className="model-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p>Creative Design</p>
              <div className="canvas-container">
                <Canvas
                  camera={{ position: isMobile ? [0, 0, 800] : [0, 0, 400] }}
                >
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[0, 5, 5]} intensity={1} />
                  <DesignModel />
                </Canvas>
              </div>
            </motion.div>

            <motion.div
              className="model-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p>Prototyping</p>
              <div className="canvas-container">
                <Canvas
                  camera={{ position: isMobile ? [0, 0, 800] : [0, 0, 400] }}
                >
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[0, 5, 5]} intensity={1} />
                  <PerformanceModel />
                </Canvas>
              </div>
            </motion.div>
          </div>
        </motion.article>
      </motion.div>
    </section>
  );
};

export default About;
