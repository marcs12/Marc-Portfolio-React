import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import WebGLHoverEffect from "./WebGLHoverEffect"; // Your WebGLHoverEffect component

const Projects = () => {
  const projectRefs = useRef([]);

  const projects = useMemo(
    () => ["SnackLab", "ThirtyFive", "Run Yuji", "Portfolio"],
    [],
  );

  useEffect(() => {
    projectRefs.current.forEach((ref) => {
      if (ref) {
        const title = ref.querySelector("h2");
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

        // Animate the hr line with GSAP
        const hrLine = ref.querySelector(".project-line");
        gsap.fromTo(
          hrLine,
          { scaleX: 0, transformOrigin: "left center" }, // Initial state: line is not visible, origin is left
          {
            scaleX: 1, // Final state: line is fully visible
            duration: 1,
            ease: "power1.inOut",
          },
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
