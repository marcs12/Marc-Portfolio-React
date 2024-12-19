import React from "react";
import Barcode from "../assets/barcode-long.png";
import { useEffect, useRef } from "react";
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
          alt=""
          aria-hidden="true"
        />
        <div className="vl"></div>
        <div className="photo-intro">
          <img className="marc-photo" src={MarcPhoto} alt="Marc Sapa" />
          <p className="introduction">
            Marc Sapa is a multidisciplinary creative with a focus on creating
            high-level work across a variety of digital mediums such as
            automotive visualization and design.
          </p>
        </div>
      </article>

      <article className="my-stack">
        <div className="stack-container">
          <Tabs>
            <TabList>
              <Tab>Development Tools</Tab>
              <Tab>Design Tools</Tab>
            </TabList>

            <TabPanel>
              <div className="stack-icons">
                {[
                  FramerMotionIcon,
                  GsapGreensockIconAlt,
                  CssIcon,
                  HtmlIcon,
                  JavascriptIcon,
                  PhpIcon,
                  ReactIcon,
                  WordpressIcon,
                  SassIcon,
                  ThreeJsIcon,
                ].map((icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <img src={icon} alt="" />
                  </motion.div>
                ))}
              </div>
            </TabPanel>

            <TabPanel>
              <div className="stack-icons">
                {[
                  AfterEffectsIcon,
                  FigmaIcon,
                  IllustratorIcon,
                  PhotoshopIcon,
                  LightroomIcon,
                  PremiereProIcon,
                  XdIcon,
                ].map((icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <img src={icon} alt="" />
                  </motion.div>
                ))}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </article>
    </section>
  );
};

export default About;
