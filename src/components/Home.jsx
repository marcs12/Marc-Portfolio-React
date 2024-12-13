// Importing styles
import "../styles/styles.scss";

// Importing components
import Hero from "./Hero";
import SocialLinks from "./SocialLinks";

function Home() {
  return (
    <main id="main-wrapper">
      <section id="hero">
        <SocialLinks />
        <Hero />
      </section>
    </main>
  );
}

export default Home;
