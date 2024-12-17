import { section } from "framer-motion/client";
import React, { useState } from "react";
import SnackLabVideo from "../assets/mockup-desktop/snacklab-mockups-4OBXVgqv.mp4";
import SnackLabMobile from "../assets/phone-mockups/snacklab-mobile.mp4";

//Icons
import FigmaIcon from "../assets/icons/figma-CCcFopil.png";
import WordPress from "../assets/icons/icons8-wordpress.svg";
import Sass from "../assets/icons/sass-brands-solid.svg";
import Php from "../assets/icons/icons8-php.svg";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsOpen(!isOpen)}>
        <h3>{title}</h3>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
};

const projectManagementContent = (
  <ul>
    <li>Jira for task management and tracking</li>
    <li>Google Docs for documentation and collaboration</li>
    <li>Slack for team communication</li>
  </ul>
);

const developmentContent = (
  <ol>
    <li>Requirement Analysis</li>
    <li>Design and Prototyping</li>
    <li>Development</li>
    <li>Testing</li>
    <li>Deployment</li>
    <li>Maintenance</li>
  </ol>
);

const roleContent = (
  <p>
    I served as both a designer and developer for the SnackLab project, handling
    the design in Figma and the development using WordPress, HTML, CSS (SASS),
    PHP, and JavaScript.
  </p>
);

const SnackLab = () => {
  return (
    <section className="single-wrap">
      <article className="single-hero-wrap">
        <video src={SnackLabVideo} playsInline autoPlay muted loop></video>
        <div className="heading-text-wrap">
          <p>01.</p>
          <h1>SnackLab</h1>
        </div>
        <div className="project-description">
          <ul className="categories">
            <li>
              <p>Client:</p>
            </li>
            <li>
              <p>Year:</p>
            </li>
            <li>
              <p>Role:</p>
            </li>
            <li>
              <p>Category:</p>
            </li>
            <li>
              <p>Team:</p>
            </li>
          </ul>
          <ul>
            <li>
              <p>Project</p>
            </li>
            <li>
              <p>2024</p>
            </li>
            <li>
              <p>Developer</p>
            </li>
            <li>
              <p>E-Commerce</p>
            </li>
            <li>
              <p>Marc Sapa, Gustavo Yamamoto, Kaleb Link, Haw Haw Tan</p>
            </li>
          </ul>
        </div>
        <div className="project-links">
          <a href="https://github.com/marcs12/snacklab-theme">GitHub Repo</a>
          <a href="https://marcsapa.com/snacklab">Visit Site</a>
        </div>
      </article>
      <article className="tech-used">
        <ul className="icon-list">
          <li>
            <img src={FigmaIcon} alt="Figma" />
          </li>
          <li>
            <img src={WordPress} alt="WordPress" />
          </li>
          <li>
            <img src={Sass} alt="Sass" />
          </li>
          <li>
            <img src={Php} alt="PHP" />
          </li>
        </ul>
      </article>
      <article className="project-description">
        <p>
          SnackLab is a fictional company that sells snacks from around the
          world. The site is built using WordPress and WooCommerce. The theme is
          custom-built using HTML, CSS, PHP, and JavaScript. The design was
          created in Figma.
        </p>
      </article>
      <article className="detail-accordions">
        <Accordion
          title="Project Management"
          content={projectManagementContent}
        />
        <Accordion title="Development" content={developmentContent} />
        <Accordion title="Role" content={roleContent} />
      </article>
      <div className="mobile-mockup">
        <video src={SnackLabMobile} playsInline autoPlay muted loop></video>
      </div>
    </section>
  );
};

export default SnackLab;
