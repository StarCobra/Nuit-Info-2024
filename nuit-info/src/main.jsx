import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { createRoot } from 'react-dom/client';
import JoystickPhone from "./ui/JoystickPhone";

function Box(props) {
  const { translateX, translateZ: translateZ } = props;
  const meshRef = useRef();
  const [active, setActive] = useState(false);
  const [hovered, setHover] = useState(false);

  useEffect(() => {
  }, [translateX, translateZ]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.position.x += -translateX * delta;
      meshRef.current.position.z += translateZ * delta;
    }
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function App() {
  const [translateX, setTranslateX] = useState(0);
  const [translateZ, setTranslateZ] = useState(0);

  return (
    <>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} translateX={translateX} translateZ={translateZ} />
        <Box position={[1.2, 0, 0]} translateX={translateX} translateZ={translateZ} />
      </Canvas>
      <JoystickPhone translateX={translateX} translateZ={translateZ} setTranslateX={setTranslateX} setTranslateZ={setTranslateZ} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);