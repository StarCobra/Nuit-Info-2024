import React, { useRef, useEffect } from 'react';
import { Canvas, useLoader, extend } from '@react-three/fiber';
import * as THREE from 'three';

extend(THREE);
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three';

const rabbitModel = '/assets/sprite/boat/Rabbid.obj';
const rabbitTexture1 = '/assets/textures/rabbit/Tex_0012_0.png';
const rabbitTexture2 = '/assets/textures/rabbit/Tex_0018_0.png';
const rabbitTexture3 = '/assets/textures/rabbit/Tex_0019_0.png';

import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three';

const Rabbit = (props) => {
    const { translateX, translateZ } = props;
    const boatRef = useRef();
    const obj = useLoader(OBJLoader, rabbitModel);
    const [texture1, texture2] = useLoader(TextureLoader, [
        rabbitTexture1,
        rabbitTexture2,
        rabbitTexture3
    ]);

    obj.traverse((child) => {
        if (child.isMesh) {
            child.material.map = texture3; // Apply the first texture
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

    return <primitive ref={boatRef} object={obj} />;
};

export default Rabbit;