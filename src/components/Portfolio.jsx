import { useState, memo } from "react";
import { motion } from "framer-motion";
import PortfolioVideo from "../assets/compressed/portfolio-desktop.mp4";
import PortfolioMobile from "../assets/compressed/portfolio-mobile.mp4";

// Icons
import Figma from "../assets/icons/figma-CCcFopil.png";
import ThreeJS from "../assets/icons/threejs.svg";
import React from "../assets/icons/icons8-react.svg";
import GSAP from "../assets/icons/gsap-greensock-CPWT-giO.svg";
import FramerMotion from "../assets/icons/framer-motion.svg";
import Sass from "../assets/icons/sass-brands-solid.svg";

const Accordion = memo(({ title, content, isOpen, onClick }) => (
  <div className="accordion-item">
    <button
      className="accordion-title"
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <h3>{title}</h3>
      <span>{isOpen ? "-" : "+"}</span>
    </button>
    {isOpen && <div className="accordion-content">{content}</div>}
  </div>
));

const projectManagementContent = (
  <ul>
    <li>
      <p>Figma for Design Planning and Prototyping</p>
    </li>
    <li>
      <p>Google Docs for documentation and collaboration</p>
    </li>
    <li>
      <p>Slack for team communication</p>
    </li>
  </ul>
);

const developmentContent = (
  <ol>
    <li>
      <p>Project Requirement Analysis</p>
    </li>
    <li>
      <p>Design and Prototyping</p>
    </li>
    <li>
      <p>Task Assigning + Development</p>
    </li>
    <li>
      <p>Testing</p>
    </li>
    <li>
      <p>Deployment</p>
    </li>
  </ol>
);

const roleContent = (
  <p>
    I served as both a designer and developer for the Portfolio project,
    handling the design in Figma and making a High Fidelity mockup. As a
    developer, I used React to build the site and integrated multiple APIs and
    dependencies like ThreeJS, GSAP, and Framer Motion to provide a great UX.
  </p>
);

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 1.5 },
  },
};

const motionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1 },
};

const Portfolio = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionClick = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <motion.section className="single-wrap" {...motionProps}>
      <motion.article
        className="single-hero-wrap"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <video
          src={PortfolioVideo}
          playsInline
          autoPlay
          muted
          loop
          className="desktop-video"
          aria-label="Portfolio desktop mockup video"
        ></video>
        <div className="heading-text-wrap">
          <p>01.</p>
          <h1>Portfolio</h1>
        </div>
        <div className="project-description">
          <motion.ul
            className="categories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {["Client:", "Year:", "Role:", "Category:", "Team:"].map(
              (text, index) => (
                <li key={index}>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    {text}
                  </motion.p>
                </li>
              ),
            )}
          </motion.ul>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {[
              "Developer Portfolio",
              "2024",
              "Designer & Developer",
              "React, ThreeJS, GSAP, Framer Motion",
              "Marc Sapa",
            ].map((text, index) => (
              <li key={index}>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  {text}
                </motion.p>
              </li>
            ))}
          </motion.ul>
        </div>
        <div className="project-links">
          <a href="https://github.com/marcs12/Marc-Portfolio-React">
            GitHub Repo
          </a>
          <a href="https://marcsapa.com/">Back Home</a>
        </div>
      </motion.article>

      <motion.p
        className="number-two"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        02. Stack Used
      </motion.p>
      <div className="tech-desc-wrap">
        <motion.article
          className="tech-used"
          {...motionProps}
          transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
        >
          <ul className="icon-list">
            {[Sass, React, ThreeJS, GSAP, FramerMotion, Figma].map(
              (icon, index) => (
                <motion.li
                  key={index}
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <img src={icon} alt={`Icon ${index + 1}`} />
                </motion.li>
              ),
            )}
          </ul>
        </motion.article>
        <motion.article
          className="project-description"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}
        >
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {"Portfolio is a personal project designed to showcase my skills and projects. The site is built using React, ThreeJS, GSAP, and Framer Motion to create an engaging and interactive user experience. The design was created in Figma, and the project integrates multiple APIs and dependencies to enhance functionality and UX."
                .split("")
                .map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.05, delay: index * 0.05 }}
                  >
                    {char}
                  </motion.span>
                ))}
            </motion.p>
          </div>
        </motion.article>
      </div>
      <motion.article
        className="bottom-section"
        {...motionProps}
        transition={{ duration: 1, ease: "easeInOut", delay: 2 }}
      >
        <div className="detail-accordions">
          {[
            { title: "Project Management", content: projectManagementContent },
            { title: "Development", content: developmentContent },
            { title: "Role", content: roleContent },
          ].map((accordion, index) => (
            <Accordion
              key={index}
              title={accordion.title}
              content={accordion.content}
              isOpen={openAccordion === index}
              onClick={() => handleAccordionClick(index)}
            />
          ))}
        </div>
        <div className="mobile-mockup">
          <video
            src={PortfolioMobile}
            playsInline
            autoPlay
            muted
            loop
            className="mobile-video"
            aria-label="Portfolio mobile mockup video"
          ></video>
        </div>
      </motion.article>
    </motion.section>
  );
};

export default Portfolio;
