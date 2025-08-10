import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import WebGLHoverEffect from "./WebGLHoverEffect";

const Projects = () => {
  const projectRefs = useRef([]);

  const projects = useMemo(
    () => ["SnackLab", "ThirtyFive", "Run Yuji", "Portfolio"],
    []
  );

  useEffect(() => {
    gsap.fromTo(
      ".project-title",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    projectRefs.current.forEach((ref) => {
      if (ref) {
        const title = ref.querySelector("h2");
        const letters = title.textContent.split("");
        title.innerHTML = letters
          .map((letter) => `<span class="letter">${letter}</span>`)
          .join("");

        gsap.fromTo(
          title.querySelectorAll(".letter"),
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power1.inOut",
            stagger: 0.1,
          }
        );

        const hrLine = ref.querySelector(".project-line");
        gsap.fromTo(
          hrLine,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 1 }
        );
      }
    });
  }, []);

  return (
    <section className="projects-section">
      <ul className="projects-list">
        {projects.map((project, index) => (
          <li key={index} ref={(el) => (projectRefs.current[index] = el)}>
            <Link to={`/works/${project.toLowerCase().replace(" ", "")}`}>
              <div className="project-title">
                <p>{`0${index + 1}. `}</p>
                <h2>{project}</h2>
              </div>
              <hr className="project-line" />
            </Link>
          </li>
        ))}
      </ul>
      <WebGLHoverEffect />
    </section>
  );
};

export default Projects;
