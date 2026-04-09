import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Avatar3D from "./Avatar3D";

export default function Viewer({ currentAnimation }) {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Canvas
        camera={{ position: [0, 1.5, 3] }}
        style={{ background: "#1a1a2e" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Avatar3D animation={currentAnimation} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}