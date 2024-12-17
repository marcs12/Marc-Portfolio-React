import { useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import WebGLHoverEffect from "./WebGLHoverEffect"; // Your WebGLHoverEffect component

const Projects = () => {
  useEffect(() => {
    // Split the text of each project title into individual letters and wrap them in <span>
    gsap.utils.toArray(".project-title h2").forEach((title) => {
      const letters = title.textContent.split("");
      title.innerHTML = letters
        .map((letter) => `<span class="letter">${letter}</span>`)
        .join("");

      // Animate each letter with GSAP
      gsap.fromTo(
        title.querySelectorAll(".letter"),
        { opacity: 0, x: -20 }, // Initial state: letters are off-screen and invisible
        {
          opacity: 1, // Final state: letters become visible
          x: 0, // Final position: letters move to their natural position
          duration: 0.3,
          ease: "power1.inOut",
          stagger: 0.1, // Stagger animation for each letter
        },
      );
    });
  }, []);

  return (
    <section className="projects-section">
      <ul className="projects-list">
        <li>
          <Link to="/works/snacklab">
            <div className="project-title">
              <p>01. </p>
              <h2>SnackLab</h2>
            </div>
            <hr className="project-line" />
          </Link>
        </li>
        <li>
          <Link to="/works/thirtyfive">
            <div className="project-title">
              <p>02. </p>
              <h2>35mm</h2>
            </div>
            <hr className="project-line" />
          </Link>
        </li>
        <li>
          <Link to="/works/runyuji">
            <div className="project-title">
              <p>03. </p>
              <h2>Run Yuji</h2>
            </div>
            <hr className="project-line" />
          </Link>
        </li>
        <li>
          <Link to="/works/portfolio">
            <div className="project-title">
              <p>04. </p>
              <h2>Portfolio</h2>
            </div>
            <hr className="project-line" />
          </Link>
        </li>
      </ul>

      <WebGLHoverEffect />
    </section>
  );
};

export default Projects;
