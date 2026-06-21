import { useRef, useEffect } from "react";
import gsap from "gsap";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";

export function LogoModel(props) {
  const { nodes } = useGLTF("/models/updated-glass.glb");

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
      <directionalLight position={[5, 8, 6]} intensity={0.8} />
      <mesh
        ref={meshRef}
        geometry={nodes.Curve.geometry}
        scale={window.innerWidth >= 1024 ? [14, 14, 14] : [18, 18, 18]}
        position={[0, 0, 0.5]}
        rotation={[1.6, 0, 0]}
      >
        {/* Tuned values (dialed in via leva). samples/resolution = quality. */}
        <MeshTransmissionMaterial
          samples={6}
          resolution={1024}
          transmission={0.97}
          roughness={0}
          thickness={0.06}
          ior={1}
          chromaticAberration={0.28}
          anisotropicBlur={0.05}
          distortion={0.04}
          distortionScale={0.15}
          temporalDistortion={0.04}
          clearcoat={1}
          clearcoatRoughness={0.12}
          attenuationDistance={2}
          attenuationColor="#ffffff"
          color="#ffffff"
          envMapIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

// Preload the model to improve performance
useGLTF.preload("/models/updated-glass.glb");
