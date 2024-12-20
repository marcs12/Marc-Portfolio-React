// Importing styles
import "../styles/styles.scss";

import React, { useEffect } from "react";

// Importing components
import Hero from "./Hero";
import Projects from "./Projects";
import About from "./About";

function Home() {
  useEffect(() => {
    try {
      VANTA.FOG({
        el: "#main-wrapper",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        highlightColor: 0x141414,
        midtoneColor: 0x111111,
        lowlightColor: 0x111111,
        baseColor: 0xc0c0c,
        blurFactor: 0.9,
        speed: 1.4,
        zoom: 0.2,
      });
    } catch (e) {
      document.body.style.backgroundColor = "#0b0b0b";
    }
  }, []);

  return (
    <div id="main-wrapper">
      <section id="hero">
        <Hero />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="about">
        <About />
      </section>
    </div>
  );
}

export default Home;
