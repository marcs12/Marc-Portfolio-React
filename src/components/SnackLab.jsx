import { section } from "framer-motion/client";
import React from "react";
import SnackLabVideo from "../assets/mockup-desktop/snacklab-mockups-4OBXVgqv.mp4";

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
    </section>
  );
};

export default SnackLab;
