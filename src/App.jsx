import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Projects from "./components/Projects";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import { gsap } from "gsap";

function App() {
  useEffect(() => {
    gsap.fromTo(
      ".slide-tabs",
      { opacity: 0, width: 0 },
      { opacity: 1, width: "auto", delay: 1, duration: 1 },
    );
  }, []);

  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
