import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const rabbitModel = '/assets/textures/sprite/rabbit/Rabbid.obj';
const rabbitEyeTexture = '/assets/textures/rabbit/Tex_0012_0.png'; // yeux
const rabbitBodyTexture = '/assets/textures/rabbit/Tex_0018_0.png'; // corps
const rabbitEarTexture = '/assets/textures/rabbit/Tex_0019_0.png'; // oreilles

const Rabbit = ({ boatRef }) => {
    const rabbitRef = useRef();
    const obj = useLoader(OBJLoader, rabbitModel);
    const textures = [
        useLoader(TextureLoader, rabbitBodyTexture),
        useLoader(TextureLoader, rabbitEyeTexture),
        useLoader(TextureLoader, rabbitEarTexture),
    ];
    const texture = textures[Math.floor(Math.random() * textures.length)];

    obj.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshBasicMaterial({ map: texture });
        }
    });

    obj.scale.set(1, 2, 1);
    useFrame(() => {
        if (boatRef?.current && rabbitRef.current) {
            rabbitRef.current.position.y = boatRef.current.position.y + 0.5; // Montée sur l'axe des y
        }
    });

    return <primitive ref={rabbitRef} object={obj} position={[0, 2, 0]} scale={[1, 1, 1]} />;
};

export default Rabbit;