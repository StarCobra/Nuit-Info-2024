import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three';
import Rabbit from './Rabbit';

const Boat = (props) => {
    const { translateX, translateZ } = props;
    const boatRef = useRef();
    const obj = useLoader(OBJLoader, '/assets/textures/sprite/boat/Sail.obj');
    const [texture1, texture2] = useLoader(TextureLoader, [
        '/assets/textures/boat/Tex_0211_0.png',
        '/assets/textures/boat/Tex_0212_0.png' // Corrected file name
    ]);

    obj.traverse((child) => {
        if (child.isMesh) {
            child.material.map = texture2; // Apply the first texture
            child.material.map = texture1; // Apply the second texture
        }
    });

    useFrame((state, delta) => {
        if (boatRef.current) {
            const time = state.clock.getElapsedTime();
            const x = boatRef.current.position.x;
            const z = boatRef.current.position.z;

            // Calculate the wave height at the boat's position
            const wave1 = Math.sin(x * 0.1 + time * 1.5) * 1;
            const wave2 = Math.sin(x * 0.2 + time * 1.0) * 0.6;
            const wave3 = Math.cos(z * 0.15 + time * 2.0) * 0.8;
            const waveHeight = wave1 + wave2 + wave3;

            // Update the boat's position
            boatRef.current.position.x += -translateX * delta;
            boatRef.current.position.z += translateZ * delta;
            boatRef.current.position.y = waveHeight; // Set the boat's vertical position to the wave height
        }
    });

    return (
        <group ref={boatRef}>
            <primitive object={obj} />
            <Rabbit translateX={translateX} translateZ={translateZ} />
        </group>
    );};

export default Boat;