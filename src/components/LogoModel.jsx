import { useRef, useEffect } from "react";
import gsap from "gsap";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";

export function LogoModel(props) {
  const { nodes } = useGLTF("/src/assets/updated-glass.glb");

  const meshRef = useRef();

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const mouseX = (event.clientX / innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / innerHeight) * 2 + 1;

      gsap.to(meshRef.current.rotation, {
        x: -mouseY * 0.2 + 1.6, // Invert the movement on the x-axis
        y: -mouseX * 0.2, // Invert the movement on the y-axis
        duration: 5, // Increase duration for smoother movement
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <group {...props}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} />
      <mesh
        ref={meshRef}
        geometry={nodes.Curve.geometry}
        scale={window.innerWidth >= 1024 ? [14, 14, 14] : [18, 18, 18]}
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
