import { useEffect, useRef } from "react";
import Barcode from "../assets/barcode-long.png";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import MarcPhoto from "../assets/IMG_1968.JPG";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

//icons
// Development Tools
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

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { height: "0", opacity: 0 },
      { height: "auto", opacity: 1, duration: 2 },
    );
  }, []);

  return (
    <section className="about-section">
      <article className="top-section" ref={sectionRef}>
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
            Crafting Clean & Consistent Experiences. I have a background in Web
            Design and Video Editing and with these two fields combined, I can
            create visually appealing websites that are both functional and
            user-friendly.
          </p>
        </div>
      </article>

      <motion.article
        className="my-stack"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="stack-label">02. Tech Stack</p>
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
                {[
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
                ].map((icon, index) => (
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
                {[
                  { src: AfterEffectsIcon, alt: "After Effects Icon" },
                  { src: FigmaIcon, alt: "Figma Icon" },
                  { src: IllustratorIcon, alt: "Illustrator Icon" },
                  { src: PhotoshopIcon, alt: "Photoshop Icon" },
                  { src: LightroomIcon, alt: "Lightroom Icon" },
                  { src: PremiereProIcon, alt: "Premiere Pro Icon" },
                  { src: XdIcon, alt: "XD Icon" },
                ].map((icon, index) => (
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
    </section>
  );
};

export default About;
