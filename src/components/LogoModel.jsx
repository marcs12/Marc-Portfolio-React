import { useRef, useEffect } from "react";
import gsap from "gsap";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";

export function LogoModel(props) {
  const { nodes } = useGLTF("/src/assets/updated-glass.glb");

  const meshRef = useRef();

  useEffect(() => {
    gsap.to(meshRef.current.rotation, {
      z: Math.PI * 5,
      duration: 1000,
      delay: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "power-in-out",
    });
  }, []);

  return (
    <group {...props}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} />
      <mesh
        ref={meshRef}
        geometry={nodes.Curve.geometry}
        scale={[18, 18, 18]}
        position={[0, 0, 0.5]}
        rotation={[1.6, 0, 0]}
      >
        <MeshTransmissionMaterial
          transmission={0.95}
          reflectivity={0.5}
          metalness={0.1}
          envMapIntensity={1}
          roughness={0.05}
          thickness={0.2}
          ior={1}
          chromaticAberration={0.05}
        />
      </mesh>
    </group>
  );
}

// Preload the model to improve performance
useGLTF.preload("/src/assets/updated-glass.glb");
