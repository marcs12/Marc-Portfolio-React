import { useState } from "react";
import "./styles/styles.scss";
import Hero from "./components/Hero";
import MissionStatement from "./components/MissionStatement";

function App() {
  VANTA.FOG({
    el: "#main-wrapper",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    highlightColor: 0x0,
    midtoneColor: 0x161616,
    lowlightColor: 0x141414,
    baseColor: 0xc0c0c,
    blurFactor: 0.88,
    speed: 0.2,
    zoom: 0.1,
  });

  return (
    <main id="main-wrapper">
      <Hero />
      <MissionStatement />
    </main>
  );
}

export default App;
