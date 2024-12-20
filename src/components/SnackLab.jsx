import { useState, memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import SnackLabVideo from "../assets/compressed/snacklab-desktop.mp4";
import SnackLabMobile from "../assets/compressed/snacklab-mobile.mp4";

// Icons
import FigmaIcon from "../assets/icons/figma-CCcFopil.png";
import WordPress from "../assets/icons/icons8-wordpress.svg";
import Sass from "../assets/icons/sass-brands-solid.svg";
import Php from "../assets/icons/icons8-php.svg";

// Memoizing Accordion for performance
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

const SnackLab = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  // Memoize content to avoid re-calculation on every render
  const projectManagementContent = useMemo(
    () => (
      <ul>
        <li>
          <p>Jira for task management and tracking</p>
        </li>
        <li>
          <p>Google Docs for documentation and collaboration</p>
        </li>
        <li>
          <p>Slack for team communication</p>
        </li>
      </ul>
    ),
    [],
  );

  const developmentContent = useMemo(
    () => (
      <ol>
        <li>
          <p>Requirement Analysis</p>
        </li>
        <li>
          <p>Design and Prototyping</p>
        </li>
        <li>
          <p>Development</p>
        </li>
        <li>
          <p>Testing</p>
        </li>
        <li>
          <p>Deployment</p>
        </li>
        <li>
          <p>Maintenance</p>
        </li>
      </ol>
    ),
    [],
  );

  const roleContent = useMemo(
    () => (
      <p>
        I served as both a designer and developer for the SnackLab project,
        handling the design in Figma and the development using WordPress, HTML,
        CSS (SASS), PHP, and JavaScript.
      </p>
    ),
    [],
  );

  const handleAccordionClick = useCallback(
    (index) => {
      setOpenAccordion((prev) => (prev === index ? null : index));
    },
    [openAccordion],
  );

  return (
    <motion.section
      className="single-wrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.article
        className="single-hero-wrap"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <video
          src={SnackLabVideo}
          playsInline
          autoPlay
          muted
          loop
          className="desktop-video"
          aria-label="SnackLab desktop mockup video"
          loading="lazy" // Lazy loading video
        ></video>
        <div className="heading-text-wrap">
          <p>01.</p>
          <h1>SnackLab</h1>
        </div>
        <div className="project-description">
          <motion.ul className="categories">
            {["Client:", "Year:", "Role:", "Category:", "Team:"].map(
              (text, index) => (
                <li key={index}>
                  <motion.p>{text}</motion.p>
                </li>
              ),
            )}
          </motion.ul>
          <motion.ul>
            {[
              "Project",
              "2024",
              "Developer",
              "E-Commerce",
              "Marc Sapa, Gustavo Yamamoto, Kaleb Link, Haw Haw Tan",
            ].map((text, index) => (
              <li key={index}>
                <motion.p>{text}</motion.p>
              </li>
            ))}
          </motion.ul>
        </div>
        <div className="project-links">
          <a href="https://github.com/marcs12/snacklab-theme">GitHub Repo</a>
          <a href="https://marcsapa.com/snacklab">Visit Site</a>
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <ul className="icon-list">
            {[FigmaIcon, WordPress, Sass, Php].map((icon, index) => (
              <motion.li key={index} initial="hidden" animate="visible">
                <img src={icon} alt={`Icon ${index + 1}`} />
              </motion.li>
            ))}
          </ul>
        </motion.article>
        <motion.article className="project-description">
          <motion.p style={{ whiteSpace: "pre-wrap" }}>
            {
              "SnackLab is a fictional company that sells snacks from around the world. The site is built using WordPress and WooCommerce. The theme is custom-built using HTML, CSS, PHP, and JavaScript. The design was created in Figma."
            }
          </motion.p>
        </motion.article>
      </div>

      <motion.article className="bottom-section">
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
            src={SnackLabMobile}
            playsInline
            autoPlay
            muted
            loop
            className="mobile-video"
            aria-label="SnackLab mobile mockup video"
            loading="lazy" // Lazy loading video
          ></video>
        </div>
      </motion.article>
    </motion.section>
  );
};

export default SnackLab;
