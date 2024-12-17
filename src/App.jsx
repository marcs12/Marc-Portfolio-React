// React and hooks
import { useEffect } from "react";

// React Router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// GSAP for animations
import { gsap } from "gsap";

// Components
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import SnackLab from "./components/SnackLab";
import ThirtyFive from "./components/ThirtyFive";
import RunYuji from "./components/RunYuji";
import Portfolio from "./components/Portfolio";

function App() {
  useEffect(() => {
    gsap.fromTo(
      ".slide-tabs",
      { opacity: 0, width: 0 },
      { opacity: 1, width: "auto", delay: 1, duration: 1 },
    );
  }, []);

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
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/works/snacklab" element={<SnackLab />} />
        <Route path="/works/thirtyfive" element={<ThirtyFive />} />
        <Route path="/works/runyuji" element={<RunYuji />} />
        <Route path="/works/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
