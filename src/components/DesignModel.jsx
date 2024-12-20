/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MeshPhysicalMaterial } from "three";

export function DesignModel(props) {
  const group = useRef();
  const { nodes } = useGLTF("/assets/abstract-sphere.gltf");

  const material = new MeshPhysicalMaterial({
    color: "#C0C0C0", // Silver color
    metalness: 0.4, // Reflective metallic appearance
    roughness: 0.1, // Slight surface roughness
    transmission: 1, // Enable transmission for glass effect
    opacity: 0.25, // Set opacity for transparency
    transparent: true, // Enable transparency
    clearcoat: 1, // Add clear coat for shiny surface
    clearcoatRoughness: 0, // Smooth clear coat
  });

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01; // Adjust the speed of the rotation here
      group.current.rotation.x += 0.01; // Adjust the speed of the rotation here
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.part1.geometry}
        material={material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.part2.geometry}
        material={material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.part3.geometry}
        material={material}
      />
    </group>
  );
}

useGLTF.preload("/assets/abstract-sphere.gltf");