// Scene.jsx

import { useEffect } from "react";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { LogoModel } from "./LogoModel"; // Import as a named export

const Scene = () => {
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

  return (
    <Canvas
      id="canvas"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: -1, // Add z-index to ensure canvas is on top
      }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <LogoModel position={[0, 0, 0]} />
      <mesh position={[0, 0, -5]}>
        <meshBasicMaterial color={"#ffffff"} />
      </mesh>
      <Text
        color={"#ffffff"}
        fontSize={0.5}
        font="/src/assets/DMSerifDisplay-Regular.ttf"
        position={[-0.13, 0.175, 0]}
        // -0.13, 0.2, 0
        rotation={[0, 0, 0]}
        textAlign={"center"}
        anchorX="center"
        anchorY="middle"
      >
        MARC
      </Text>
      <Text
        color={"#ffffff"}
        fontSize={0.5}
        font="/src/assets/DMSerifDisplay-Regular.ttf"
        position={[0.23, -0.175, 0]}
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
