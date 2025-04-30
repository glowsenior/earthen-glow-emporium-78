
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float } from '@react-three/drei';

function Model({ path, scale = 1, rotation = 0.01, position = [0, 0, 0], color = '#ECD4BC' }) {
  const ref = useRef();
  
  useFrame((state) => {
    ref.current.rotation.y += rotation;
  });

  // For ceramic model
  if (path === 'ceramic') {
    return (
      <mesh ref={ref} position={position} scale={scale}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
      </mesh>
    );
  }
  
  // For cosmetic model
  if (path === 'cosmetic') {
    return (
      <mesh ref={ref} position={position} scale={scale}>
        <cylinderGeometry args={[0.7, 0.7, 2, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>
    );
  }
  
  // Default cube
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
    </mesh>
  );
}

const ThreeDAnimation = ({ type = 'default', bgColor = 'transparent', height = '200px' }) => {
  return (
    <div className="three-animation" style={{ height, width: '100%', position: 'relative', background: bgColor }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Model path={type} scale={1.5} />
        </Float>
        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
};

export default ThreeDAnimation;
