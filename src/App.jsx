import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";

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
import LoadingScreen from "./components/LoadingScreen";
import Footer from "./components/Footer";
import GrainOverlay from "./components/GrainOverlay";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isLargeScreen =
    typeof window !== "undefined" && window.innerWidth > 1024;

  if (isLoading) {
    return <LoadingScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <a href="#page-root" className="skip-link">
          Skip to content
        </a>
        <GrainOverlay />
        <div className="ambient-field" aria-hidden="true" />
        {isLargeScreen && <CursorTrail />}
        <ScrollToTop />
        <NavBar />
        <main id="page-root">
          <AnimatedRoutes />
        </main>
        <Footer />
      </Router>
    </MotionConfig>
  );
}

export default App;
