// Scene.jsx

import { useEffect, useState, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import { Text, Environment, Lightformer } from "@react-three/drei";
import { LogoModel } from "./LogoModel"; // Import as a named export
import debounce from "lodash.debounce";

const Scene = () => {
  const getScale = useCallback(() => {
    if (window.innerWidth < 760) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }, []);

  const [scale, setScale] = useState(getScale());

  useEffect(() => {
    const handleResize = debounce(() => {
      setScale(getScale());
    }, 100);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getScale]);

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

  const textProps = useMemo(
    () => ({
      color: "#ffffff",
      fontSize: 0.5 * scale,
      font: "/fonts/DMSerifDisplay-Regular.ttf",
      rotation: [0, 0, 0],
      textAlign: "center",
      anchorX: "center",
      anchorY: "middle",
    }),
    [scale],
  );

  return (
    <Canvas
      id="canvas"
      dpr={[1, 2]}
      gl={{ antialias: true }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <ambientLight intensity={0.35} />

      {/* The text sits behind the glass so the transmission material refracts it.
          Pushed back on z and rendered first so it lands in the refraction buffer. */}
      <Text {...textProps} position={[-0.13 * scale, 0.175 * scale, -0.6]}>
        MARC
      </Text>
      <Text {...textProps} position={[0.23 * scale, -0.175 * scale, -0.6]}>
        SAPA
      </Text>

      <LogoModel position={[0, 0, 0]} scale={scale} />

      {/* Procedural studio environment (no external HDRI). Gives the glass crisp
          neutral reflections + edge highlights — the difference between "cheap
          plastic" and real glass. Soft rects, kept white to stay on-palette. */}
      <Environment resolution={256}>
        <Lightformer
          intensity={3}
          color="#ffffff"
          position={[0, 3, 4]}
          scale={[12, 4, 1]}
        />
        <Lightformer
          intensity={1.6}
          color="#ffffff"
          position={[-6, 1, 2]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[8, 8, 1]}
        />
        <Lightformer
          intensity={1.6}
          color="#ffffff"
          position={[6, -1, 2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[8, 8, 1]}
        />
        <Lightformer
          intensity={2}
          color="#dfe6ff"
          position={[0, -4, 3]}
          scale={[12, 3, 1]}
        />
      </Environment>
    </Canvas>
  );
};

export default Scene;
