import React from "react";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <section className="projects-section">
      <ul className="projects-list">
        <li>
          <div className="project-title">
            <p>01. </p>
            <h2>SnackLab</h2>
          </div>

          <hr />
        </li>
        <li>
          <div className="project-title">
            <p>02. </p>
            <h2>35mm</h2>
          </div>
          <hr />
        </li>
        <li>
          <div className="project-title">
            <p>03. </p>
            <h2>Run Yuji</h2>
          </div>
          <hr />
        </li>
        <li>
          <div className="project-title">
            <p>04. </p>
            <h2>Portfolio</h2>
          </div>
          <hr />
        </li>
      </ul>
    </section>
  );
};

export default Projects;
