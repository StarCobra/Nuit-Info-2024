import { useFrame, useThree } from "@react-three/fiber"; // Importation de useThree
import { useRef } from "react";
import { OrbitControls } from '@react-three/drei';
import { boatBasePos } from '../const/BoatBasePos';

const BoatCamera = ({ translateX, translateZ }) => {
    const { camera } = useThree(); // Utilisation de useThree pour obtenir la caméra
    const controlsRef = useRef();

    // Ajout de useFrame pour mettre à jour la caméra à chaque frame
    useFrame(() => {
        if (controlsRef.current) {
            controlsRef.current.target.set(translateX, 0, translateZ); // Mise à jour de la cible de la caméra
            controlsRef.current.update(); // Mise à jour de la caméra
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            args={[camera]} // Passage de la caméra aux OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={(Math.PI - 0.5) / 2}
            target={boatBasePos}
        />
    );
};

export default BoatCamera;