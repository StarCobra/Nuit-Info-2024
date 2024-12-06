import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from '@react-three/drei';
import { boatBasePos } from '../const/BoatBasePos';

const BoatCamera = ({ translateX, translateZ }) => {
    const cameraRef = useRef();

    // useFrame((delta) => {
    //     // cameraRef.current.target = new THREE.Vector3(translateX, 0, translateZ);
    //     // cameraRef.position.z += translateZ * delta;
    //     // cameraRef.position.x += -translateX * delta;
        
    // });

    return (
        <OrbitControls
            
            ref={cameraRef}
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={(Math.PI - 0.5) / 2}
            target={boatBasePos}
        />
    );
};

export default BoatCamera;
