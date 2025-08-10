import { useState, memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
// import IphoneVideo from "../assets/compressed/iphone-desktop.mp4";
// import IphoneMobile from "../assets/compressed/iphone-mobile.mp4";

// Icons
import GSAP from "../assets/icons/gsap-greensock.svg";
import ThreeIcon from "../assets/icons/threejs.svg";

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

const IphoneLandingPage = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  // Memoize content to avoid re-calculation on every render
  const designContent = useMemo(
    () => (
      <ul>
        <li>
          <p>Innovative and sleek design</p>
        </li>
        <li>
          <p>High-resolution display</p>
        </li>
        <li>
          <p>Ergonomic and user-friendly</p>
        </li>
      </ul>
    ),
    []
  );

  const developmentContent = useMemo(
    () => (
      <ol>
        <li>
          <p>Advanced A-series chip</p>
        </li>
        <li>
          <p>iOS operating system</p>
        </li>
        <li>
          <p>Seamless integration with Apple ecosystem</p>
        </li>
      </ol>
    ),
    []
  );

  const marketingContent = useMemo(
    () => (
      <p>
        Our marketing strategy focuses on highlighting the unique features and
        benefits of the iPhone, targeting tech enthusiasts and everyday users
        alike.
      </p>
    ),
    []
  );

  const handleAccordionClick = useCallback(
    (index) => {
      setOpenAccordion((prev) => (prev === index ? null : index));
    },
    [openAccordion]
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
          src={IphoneVideo}
          playsInline
          autoPlay
          muted
          loop
          className="desktop-video"
          aria-label="iPhone desktop mockup video"
          loading="lazy" // Lazy loading video
        ></video>
        <div className="heading-text-wrap">
          <p>01.</p>
          <h1>iPhone</h1>
        </div>
        <div className="project-description">
          <motion.ul className="categories">
            {["Client:", "Year:", "Role:", "Category:", "Team:"].map(
              (text, index) => (
                <li key={index}>
                  <motion.p>{text}</motion.p>
                </li>
              )
            )}
          </motion.ul>
          <motion.ul>
            {[
              "Apple",
              "2023",
              "Designer & Developer",
              "Smartphone",
              "Apple Inc.",
            ].map((text, index) => (
              <li key={index}>
                <motion.p>{text}</motion.p>
              </li>
            ))}
          </motion.ul>
        </div>
        <div className="project-links">
          <a href="https://marcsapa.com/works">Back to Works</a>
          <a href="https://marcsapa.com/apple-clone">Visit Site</a>
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
            {[DesignIcon, DevelopmentIcon, MarketingIcon, SupportIcon].map(
              (icon, index) => (
                <motion.li key={index} initial="hidden" animate="visible">
                  <img src={icon} alt={`Icon ${index + 1}`} />
                </motion.li>
              )
            )}
          </ul>
        </motion.article>
        <motion.article className="project-description">
          <motion.p style={{ whiteSpace: "pre-wrap" }}>
            {
              "The iPhone is a revolutionary smartphone designed and developed by Apple Inc. It features cutting-edge technology, a sleek design, and seamless integration with the Apple ecosystem."
            }
          </motion.p>
        </motion.article>
      </div>

      <motion.article className="bottom-section">
        <div className="detail-accordions">
          {[
            { title: "Design", content: designContent },
            { title: "Development", content: developmentContent },
            { title: "Marketing", content: marketingContent },
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
            src={IphoneMobile}
            playsInline
            autoPlay
            muted
            loop
            className="mobile-video"
            aria-label="iPhone mobile mockup video"
            loading="lazy" // Lazy loading video
          ></video>
        </div>
      </motion.article>
    </motion.section>
  );
};

export default IphoneLandingPage;
