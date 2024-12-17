import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCss3Alt,
  faHtml5,
  faJs,
  faReact,
  faSass,
  faWordpress,
} from "@fortawesome/free-brands-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

const AboutMe = () => {
  return (
    <div className="about-me">
      <div className="profile-container">
        <div className="image-placeholder">
          <img src="" alt="Profile Placeholder" />
        </div>
        <div className="description">
          <p>
            Marc Sapa is a multidisciplinary creative with a focus on creating
            high-level work across a variety of digital mediums such as
            automotive visualization and design.
          </p>
        </div>
      </div>
      <div className="skills-container">
        <div className="skills">
          <div className="skill-icon">
            <FontAwesomeIcon icon={faReact} />
          </div>
          <div className="skill-icon">
            <FontAwesomeIcon icon={faHtml5} />
          </div>
          <div className="skill-icon">
            <FontAwesomeIcon icon={faCss3Alt} />
          </div>
          <div className="skill-icon">
            <FontAwesomeIcon icon={faJs} />
          </div>
          <div className="skill-icon">
            <FontAwesomeIcon icon={faDatabase} />
          </div>
          <div className="skill-icon">
            <FontAwesomeIcon icon={faSass} />
          </div>
          <div className="skill-icon">
            <FontAwesomeIcon icon={faWordpress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
