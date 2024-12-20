import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { DesignModel } from "./DesignModel";
import { DevelopmentModel } from "./DevelopmentModel";
import { PerformanceModel } from "./PerformanceModel";

export default function ModelsScene() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 2, 5]} intensity={1} />

        <group position={[-3, 0, 0]}>
          <DesignModel />
        </group>

        <group position={[0, 0, 0]}>
          <DevelopmentModel />
        </group>

        <group position={[3, 0, 0]}>
          <PerformanceModel />
        </group>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
