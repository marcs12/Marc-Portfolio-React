// Importing styles
import "../styles/styles.scss";

// Importing components
import Hero from "./Hero";

function Home() {
  return (
    <main id="main-wrapper">
      <section id="hero">
        <Hero />
      </section>
    </main>
  );
}

export default Home;
