import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export function DevelopmentModel(props) {
  const groupRef = useRef();
  const { nodes } = useGLTF("/assets/globe_puzzle_A_OBJ_high.gltf");

  // Rotate the model over time
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Adjust the speed of rotation here
    }
  });

  return (
    <group ref={groupRef} position={[0, -6, -21]} {...props}>
      {/* Bright ambient light for overall illumination */}
      <ambientLight intensity={1.5} />

      {/* Multiple directional lights to eliminate dark spots */}
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-5, 5, -5]} intensity={2} />
      <directionalLight position={[5, -5, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={1.5} />

      {/* Loop through the nodes to apply the material dynamically */}
      {Array.from({ length: 29 }).map((_, index) => {
        const meshName = `globe_puzzle_pieces${String(index).padStart(2, "0")}`;
        return (
          <mesh key={meshName} geometry={nodes[meshName].geometry}>
            <meshStandardMaterial
              color="#C0C0C0" // Silver color
              metalness={0.4} // Reflective metallic appearance
              roughness={0.6} // Slight surface roughness
            />
          </mesh>
        );
      })}
    </group>
  );
}

useGLTF.preload("/assets/globe_puzzle_A_OBJ_high.gltf");
