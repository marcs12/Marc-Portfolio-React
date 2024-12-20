// React and hooks
import { useEffect } from "react";
import VANTA from "vanta";
import { Fog } from "vanta/dist/vanta.fog.min.js";
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
import PageTransition from "./components/PageTransition"; // Import PageTransition

import NotFound from "./components/NotFound";

function App() {
  useEffect(() => {
    gsap.fromTo(
      ".slide-tabs",
      { opacity: 0, width: 0 },
      { opacity: 1, width: "auto", delay: 1, duration: 1 },
    );
  }, []);

  useEffect(() => {
    try {
      VANTA.FOG({
        el: "html",
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

  const isLargeScreen = window.innerWidth > 1024;

  return (
    <Router>
      {isLargeScreen && <CursorTrail />}
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/works"
          element={
            <PageTransition>
              <Projects />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/works/snacklab"
          element={
            <PageTransition>
              <SnackLab />
            </PageTransition>
          }
        />
        <Route
          path="/works/thirtyfive"
          element={
            <PageTransition>
              <ThirtyFive />
            </PageTransition>
          }
        />
        <Route
          path="/works/runyuji"
          element={
            <PageTransition>
              <RunYuji />
            </PageTransition>
          }
        />
        <Route
          path="/works/portfolio"
          element={
            <PageTransition>
              <Portfolio />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
