import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/abstract_ball (1).gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.part1.geometry}
        material={nodes.part1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.part2.geometry}
        material={nodes.part2.material}
      />
    </group>
  );
}

useGLTF.preload("/abstract_ball (1).gltf");
