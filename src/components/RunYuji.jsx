import { useState, memo } from "react";
import { motion } from "framer-motion";
import RunYujiVideo from "../assets/compressed/runyuji-desktop.mp4";
import RunYujiMobile from "../assets/compressed/runyuji-two-desktop.mp4";

// Icons
import JavascriptIcon from "../assets/icons/icons8-javascript.svg";
import HtmlIcon from "../assets/icons/icons8-html.svg";
import CssIcon from "../assets/icons/icons8-css.svg";

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
      <p>Photoshop for the initial design</p>
    </li>
    <li>
      <p>Google Docs for documentation and concept submission</p>
    </li>
  </ul>
);

const developmentContent = (
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
      <p>Testing & Debugging</p>
    </li>
    <li>
      <p>Deployment</p>
    </li>
  </ol>
);

const roleContent = (
  <p>
    I served as both the designer and developer for the RunYuji project,
    handling the design and development using HTML, CSS, and JavaScript.
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

const RunYuji = () => {
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
          src={RunYujiVideo}
          playsInline
          autoPlay
          muted
          loop
          className="desktop-video"
          aria-label="RunYuji desktop mockup video"
        ></video>
        <div className="heading-text-wrap">
          <p>01.</p>
          <h1>RunYuji</h1>
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
              "Designer & Developer",
              "Game Development",
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
          <a href="https://github.com/marcs12/runyuji">GitHub Repo</a>
          <a href="https://marcs12.github.io/runyuji/">Play Game</a>
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
            {[JavascriptIcon, HtmlIcon, CssIcon].map((icon, index) => (
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
              {"RunYuji is an infinite scroll running game developed using HTML, CSS, and JavaScript. The game features a character named Yuji who runs endlessly, avoiding obstacles and collecting points."
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
            src={RunYujiMobile}
            playsInline
            autoPlay
            muted
            loop
            className="mobile-video"
            aria-label="RunYuji mobile mockup video"
          ></video>
        </div>
      </motion.article>
    </motion.section>
  );
};

export default RunYuji;
