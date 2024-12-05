import * as THREE from 'three'
import React, { Suspense, useRef, useMemo, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, extend, useThree, useLoader, useFrame  } from "@react-three/fiber";
import "./styles.css";
import JoystickPhone from "./components/JoystickPhone";
import { OrbitControls, Sky } from '@react-three/drei'
import { Water } from 'three-stdlib'

extend({ Water })

function Ocean() {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding
    }),
    [waterNormals]
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}

// function Box() {
//   const ref = useRef()
//   useFrame((state, delta) => {
//     ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 20
//     ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta
//   })


// function Box(props) {
//   const { translateX, translateZ: translateZ } = props;
//   const meshRef = useRef();
//   const [active, setActive] = useState(false);
//   const [hovered, setHover] = useState(false);

//   useEffect(() => {
//   }, [translateX, translateZ]);

//   useFrame((state, delta) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += delta;
//       meshRef.current.position.x += -translateX * delta;
//       meshRef.current.position.z += translateZ * delta;
//     }
//   });

//   return (
//     <mesh ref={meshRef} scale={20}>
//       <boxGeometry />
//       <meshStandardMaterial />
//     </mesh>
//   );
// }

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

// function Box(props) {
//     // This reference will give us direct access to the mesh
//     const meshRef = useRef();
//     // Set up state for the hovered and active state
//     const [hovered, setHover] = useState(false);
//     const [active, setActive] = useState(false);
//     // Subscribe this component to the render-loop, rotate the mesh every frame
//     useFrame((state, delta) => (meshRef.current.rotation.x += delta));
//     // Return view, these are regular three.js elements expressed in JSX
//     return (
//         <mesh
//             {...props}
//             ref={meshRef}
//             scale={active ? 1.5 : 1}
//             onClick={(event) => setActive(!active)}
//             onPointerOver={(event) => setHover(true)}
//             onPointerOut={(event) => setHover(false)}
//         >
//             <boxGeometry args={[1, 1, 1]} />
//             <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
//         </mesh>
//     );
// }

function App() {
    const [translateX, setTranslateX] = useState(0);
    const [translateZ, setTranslateZ] = useState(0);
  
    return (
    <>
        <Canvas>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI}
            />
            <pointLight
                position={[-10, -10, -10]}
                decay={0}
                intensity={Math.PI}
            />
            <pointLight position={[100, 100, 100]} />
            <pointLight position={[-100, -100, -100]} />
            <Box position={[-1.2, 0, 0]} translateX={translateX} translateZ={translateZ} />
            <Box position={[1.2, 0, 0]} translateX={translateX} translateZ={translateZ} />

            {/* <mesh>
                <planeGeometry attach="geometry" args={[25, 15]} />
                <meshPhongMaterial attach="material" color="yellow" />
            </mesh> */}

            <Suspense fallback={null}>
                <Ocean />
                {/* <Box /> */}
            </Suspense>
            <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
            <OrbitControls />
        </Canvas>
        <JoystickPhone translateX={translateX} translateZ={translateZ} setTranslateX={setTranslateX} setTranslateZ={setTranslateZ} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
