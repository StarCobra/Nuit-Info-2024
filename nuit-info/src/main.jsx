import React, { Suspense, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import "./styles.css";
import JoystickPhone from "./components/JoystickPhone";
import { Sky } from '@react-three/drei'
import Boat from './components/Boat';
import Ocean from "./components/Ocean";
import BoatCamera from './components/BoatCamera';

function App() {
    const [translateX, setTranslateX] = useState(0);
    const [translateZ, setTranslateZ] = useState(0);
    const oceanRef = useRef();
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
            <Boat translateX={translateX} translateZ={translateZ} oceanRef={oceanRef}/>

            <Suspense fallback={null}>
                <Ocean ref={oceanRef}/>
            </Suspense>
            <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
            <BoatCamera translateX={translateX} translateZ={translateZ} />
        </Canvas>
        <JoystickPhone translateX={translateX} translateZ={translateZ} setTranslateX={setTranslateX} setTranslateZ={setTranslateZ} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
