import { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Projects = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(
      ".project-line",
      { width: "0%" },
      {
        width: "100%",
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top 80%",
        },
      },
    );

    gsap.utils.toArray(".project-title h2").forEach((title) => {
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
          stagger: 0.2,
          scrollTrigger: {
            trigger: title,
            start: "top 100%",
          },
        },
      );
    });
  }, []);

  return (
    <section className="projects-section">
      <ul className="projects-list">
        <li>
          <Link to="/snacklab">
            <div className="project-title">
              <p>01. </p>
              <h2>SnackLab</h2>
            </div>
            <hr className="project-line" />
          </Link>
        </li>
        <li>
          <div className="project-title">
            <p>02. </p>
            <h2>
              <Link to="/thirtyfive">35mm</Link>
            </h2>
          </div>
          <hr className="project-line" />
        </li>
        <li>
          <div className="project-title">
            <p>03. </p>
            <h2>
              <Link to="/runyuji">Run Yuji</Link>
            </h2>
          </div>
          <hr className="project-line" />
        </li>
        <li>
          <div className="project-title">
            <p>04. </p>
            <h2>
              <Link to="/portfolio">Portfolio</Link>
            </h2>
          </div>
          <hr className="project-line" />
        </li>
      </ul>
    </section>
  );
};

export default Projects;
