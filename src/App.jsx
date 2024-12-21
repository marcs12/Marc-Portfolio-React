import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { gsap } from "gsap";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import SnackLab from "./components/SnackLab";
import ThirtyFive from "./components/ThirtyFive";
import RunYuji from "./components/RunYuji";
import Portfolio from "./components/Portfolio";
import CursorTrail from "./components/CursorTrail";
import PageTransition from "./components/PageTransition";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen"; // Import LoadingScreen

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingFinish = () => {
    setIsLoading(false);
  };

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
    <>
      {isLoading ? (
        <LoadingScreen onFinish={handleLoadingFinish} />
      ) : (
        <Router>
          {isLargeScreen && <CursorTrail />}
          <ScrollToTop />
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
      )}
    </>
  );
}

export default App;
