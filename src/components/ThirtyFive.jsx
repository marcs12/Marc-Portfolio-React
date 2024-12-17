import { section } from "framer-motion/client";
import React, { useState } from "react";
import ThirtyFiveMMVideo from "../assets/mockup-desktop/thirtyfive-mockups-DMp8_yki.mp4";
import ThirtyFiveMMMobile from "../assets/phone-mockups/35mm-mobile.mp4";

//Icons
import FigmaIcon from "../assets/icons/figma-CCcFopil.png";
import ReactIcon from "../assets/icons/icons8-react.svg";

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
      <p>Testing</p>
    </li>
    <li>
      <p>Deployment</p>
    </li>
    <li>
      <p>Maintenance</p>
    </li>
  </ol>
);

const roleContent = (
  <p>
    I served as both a designer and developer for the ThirtyFiveMM project,
    handling the design in Figma and the development using React, Node.js,
    MongoDB, and JavaScript.
  </p>
);

const ThirtyFiveMM = () => {
  return (
    <section className="single-wrap">
      <article className="single-hero-wrap">
        <video src={ThirtyFiveMMVideo} playsInline autoPlay muted loop></video>
        <div className="heading-text-wrap">
          <p>01.</p>
          <h1>ThirtyFiveMM</h1>
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
              <p>React Project + API Usage</p>
            </li>
            <li>
              <p>Marc Sapa, Mahdi Roozbahani, Yining Li, Kate Shepherd</p>
            </li>
          </ul>
        </div>
        <div className="project-links">
          <a href="https://github.com/marcs12/react-movie-project">
            GitHub Repo
          </a>
          <a href="https://marcsapa.com/35mm-app">Visit Site</a>
        </div>
      </article>
      <article className="tech-used">
        <ul className="icon-list">
          <li>
            <img src={FigmaIcon} alt="Figma" />
          </li>
          <li>
            <img src={ReactIcon} alt="React" />
          </li>
          <li>{/* <img src={NodeIcon} alt="Node.js" /> */}</li>
          <li>{/* <img src={MongoDBIcon} alt="MongoDB" /> */}</li>
        </ul>
      </article>
      <article className="project-description">
        <p>
          ThirtyFiveMM is a fictional company that offers photography services.
          The site is built using React and Node.js. The backend is powered by
          MongoDB. The design was created in Figma.
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
        <video src={ThirtyFiveMMMobile} playsInline autoPlay muted loop></video>
      </div>
    </section>
  );
};

export default ThirtyFiveMM;
