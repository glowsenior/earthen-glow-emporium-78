
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';

function Model({ path, scale = 1, rotation = 0.01, position = [0, 0, 0], color = '#ECD4BC', productType }) {
  const ref = useRef();
  
  useFrame((state) => {
    ref.current.rotation.y += rotation;
  });

  // For ceramic products
  if (path === 'ceramic' || productType === 'Ceramics') {
    if (productType === 'bowl') {
      return (
        <mesh ref={ref} position={position} scale={scale}>
          <cylinderGeometry args={[1, 0.6, 0.6, 32]} />
          <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
        </mesh>
      );
    } else if (productType === 'plate') {
      return (
        <mesh ref={ref} position={position} scale={scale}>
          <cylinderGeometry args={[1, 1, 0.1, 32]} />
          <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
        </mesh>
      );
    } else if (productType === 'vase') {
      return (
        <mesh ref={ref} position={position} scale={scale}>
          <cylinderGeometry args={[0.5, 0.7, 2, 32]} />
          <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
        </mesh>
      );
    } else if (productType === 'mug') {
      return (
        <group ref={ref} position={position} scale={scale}>
          <mesh>
            <cylinderGeometry args={[0.4, 0.4, 0.8, 32]} />
            <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
          </mesh>
          <mesh position={[0.6, 0, 0]}>
            <torusGeometry args={[0.3, 0.1, 16, 32, Math.PI * 1]} />
            <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
          </mesh>
        </group>
      );
    }
    // Default ceramic model
    return (
      <mesh ref={ref} position={position} scale={scale}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
      </mesh>
    );
  }
  
  // For cosmetic products
  if (path === 'cosmetic' || productType === 'Cosmetics') {
    if (productType === 'cream') {
      return (
        <group ref={ref} position={position} scale={scale}>
          <mesh>
            <cylinderGeometry args={[0.7, 0.7, 0.4, 32]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.2, 32]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.4} />
          </mesh>
        </group>
      );
    } else if (productType === 'bottle') {
      return (
        <mesh ref={ref} position={position} scale={scale}>
          <cylinderGeometry args={[0.4, 0.4, 1.5, 32]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
        </mesh>
      );
    } else if (productType === 'compact') {
      return (
        <mesh ref={ref} position={position} scale={scale}>
          <cylinderGeometry args={[1, 1, 0.2, 32]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
        </mesh>
      );
    }
    // Default cosmetic model
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

const ThreeDAnimation = ({ 
  type = 'default', 
  productType = null, 
  bgColor = 'transparent', 
  height = '200px', 
  color = '#ECD4BC',
  autoRotate = true 
}) => {
  return (
    <div className="three-animation" style={{ height, width: '100%', position: 'relative', background: bgColor }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Model path={type} productType={productType} scale={1.5} color={color} rotation={autoRotate ? 0.01 : 0} />
        </Float>
        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} autoRotate={autoRotate} />
      </Canvas>
    </div>
  );
};

export default ThreeDAnimation;
