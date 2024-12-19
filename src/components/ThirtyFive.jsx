import { useState, memo } from "react";
import { motion } from "framer-motion";
import ThirtyFiveMMVideo from "../assets/compressed/thirtyfive-desktop.mp4";
import ThirtyFiveMMMobile from "../assets/compressed/thirtyfive-mobile.mp4";

// Icons
import AdobeXD from "../assets/icons/xd-Bj4jYHe2.png";
import Sass from "../assets/icons/sass-brands-solid.svg";
import React from "../assets/icons/icons8-react.svg";

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
      <p>Adobe XD for Design Planning and Reference</p>
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
    I served as both a designer and developer for the ThirtyFiveMM project,
    handling the design in Adobe Photoshop and making a High Fidelity mockup
    with Adobe XD. As a developer, I used React to build the site and used the
    TMDB API to fetch the data. I also used Sass for styling.
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

const ThirtyFiveMM = () => {
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
          src={ThirtyFiveMMVideo}
          playsInline
          autoPlay
          muted
          loop
          className="desktop-video"
          aria-label="ThirtyFiveMM desktop mockup video"
        ></video>
        <div className="heading-text-wrap">
          <p>01.</p>
          <h1>ThirtyFiveMM</h1>
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
              "School Project",
              "2024",
              "Developer",
              "React Database & TMDB API",
              "Marc Sapa, Mahdi Roozbahani, Yining Li, Kate Shepherd",
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
          <a href="https://github.com/marcs12/react-movie-project">
            GitHub Repo
          </a>
          <a href="https://marcsapa.com/35mm-app/">Visit Site</a>
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
            {[AdobeXD, React, Sass].map((icon, index) => (
              <motion.li
                key={index}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
              >
                <img src={icon} alt={`Icon ${index + 1}`} />
              </motion.li>
            ))}
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
              {"ThirtyFiveMM is a website that uses the TMDB API to showcase New and Upcoming Films. The site is built using using REACT with functionalities such as being able to favourite your films, search and choosing categories. For styling, Sass was used. This project was a great learning experience in using APIs, useState, useEffect and more."
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
            src={ThirtyFiveMMMobile}
            playsInline
            autoPlay
            muted
            loop
            className="mobile-video"
            aria-label="ThirtyFiveMM mobile mockup video"
          ></video>
        </div>
      </motion.article>
    </motion.section>
  );
};

export default ThirtyFiveMM;
