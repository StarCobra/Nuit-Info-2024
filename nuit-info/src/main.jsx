import { Suspense, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import "./styles.css";
import JoystickPhone from "./components/JoystickPhone";
import { Sky } from '@react-three/drei'
import Boat from './components/Boat';
import Ocean from "./components/Ocean";
import BoatCamera from './components/BoatCamera';
import CollectiblesManager from "./components/Collectible";

export function App() {
    const [translateX, setTranslateX] = useState(0);
    const [translateZ, setTranslateZ] = useState(0);
    
    const boatRef = useRef();
    
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

            {/* Boat */}
            <Boat translateX={translateX} translateZ={translateZ} boatRef={boatRef} />

            {/* Ocean an Sky */}
            <Suspense fallback={null}>
                <Ocean />
            </Suspense>
            <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />

            {/* Boat Camera */}
            <BoatCamera translateX={translateX} translateZ={translateZ} />

            {/* <Collectibles /> */}
            <CollectiblesManager boatRef={boatRef} />
        </Canvas>
        <JoystickPhone translateX={translateX} translateZ={translateZ} setTranslateX={setTranslateX} setTranslateZ={setTranslateZ} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
