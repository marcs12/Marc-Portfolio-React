// Scene.jsx

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { LogoModel } from "./LogoModel"; // Import as a named export

const Scene = () => {
  function getScale() {
    if (window.innerWidth < 760) return 1;
    if (window.innerWidth < 1024) return 4;
    return 5;
  }

  const [scale, setScale] = useState(getScale());

  useEffect(() => {
    const handleResize = () => {
      setScale(getScale());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    gsap.fromTo(
      canvas,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.1,
        repeat: 4,
        yoyo: true,
        delay: 1.5,
        onComplete: () => gsap.killTweensOf(canvas),
      },
    );
  }, []);

  function getScale() {
    if (window.innerWidth < 760) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  return (
    <Canvas
      id="canvas"
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1, // Add z-index to ensure canvas is on top
      }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <LogoModel position={[0, 0, 0]} scale={scale} />
      <mesh position={[0, 0, -5]} scale={scale}>
        <meshBasicMaterial color={"#ffffff"} />
      </mesh>
      <Text
        color={"#ffffff"}
        fontSize={0.5 * scale}
        font="/src/assets/DMSerifDisplay-Regular.ttf"
        position={[-0.13 * scale, 0.175 * scale, 0]}
        rotation={[0, 0, 0]}
        textAlign={"center"}
        anchorX="center"
        anchorY="middle"
      >
        MARC
      </Text>
      <Text
        color={"#ffffff"}
        fontSize={0.5 * scale}
        font="/src/assets/DMSerifDisplay-Regular.ttf"
        position={[0.23 * scale, -0.175 * scale, 0]}
        rotation={[0, 0, 0]}
        textAlign={"center"}
        anchorX="center"
        anchorY="middle"
      >
        SAPA
      </Text>
    </Canvas>
  );
};

export default Scene;
