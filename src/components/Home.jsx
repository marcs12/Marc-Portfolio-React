// Importing styles
import "../styles/styles.scss";

// Importing components
import Hero from "./Hero";
// import Projects from "./Projects";
// import About from "./About";

function Home() {
  return (
    <div id="main-wrapper">
      <section id="hero">
        <Hero />
      </section>
      {/* <section id="projects">
        <Projects />
      </section>
      <section id="about">
        <About />
      </section> */}
    </div>
  );
}

export default Home;
