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
import CursorTrail from "./components/CursorTrail";

function App() {
  useEffect(() => {
    gsap.fromTo(
      ".slide-tabs",
      { opacity: 0, width: 0 },
      { opacity: 1, width: "auto", delay: 1, duration: 1 },
    );
  }, []);

  const isLargeScreen = window.innerWidth > 1024;

  return (
    <Router>
      {isLargeScreen && <CursorTrail />}
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
