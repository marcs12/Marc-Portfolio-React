// Importing styles
import "../styles/styles.scss";

// Importing React hooks
import { useEffect } from "react";

// Importing components
import Hero from "./Hero";
import MissionStatement from "./MissionStatement";
import Projects from "./Projects";
import ColorOverlay from "./ColorOverlay";

function Home() {
  useEffect(() => {
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
  }, []);

  return (
    <main id="main-wrapper">
      <ColorOverlay />
      <section id="hero">
        <Hero />
      </section>
      <section id="mission">
        <MissionStatement />
      </section>
      <section id="projects">
        <Projects />
      </section>
    </main>
  );
}

export default Home;
