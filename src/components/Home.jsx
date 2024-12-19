// Importing styles
import "../styles/styles.scss";

// Importing components
import Hero from "./Hero";

function Home() {
  return (
    <div id="main-wrapper">
      <section id="hero">
        <Hero />
      </section>
    </div>
  );
}

export default Home;
