import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const rabbitModel = '/assets/textures/sprite/rabbit/Rabbid.obj';
const rabbitEyeTexture = '/assets/textures/rabbit/Tex_0012_0.png'; // yeux
const rabbitBodyTexture = '/assets/textures/rabbit/Tex_0018_0.png'; // corps
const rabbitEarTexture = '/assets/textures/rabbit/Tex_0019_0.png'; // oreilles

const Rabbit = () => {
    const rabbitRef = useRef();
    const obj = useLoader(OBJLoader, rabbitModel);
    const textures = [
        useLoader(TextureLoader, rabbitBodyTexture), // Tex_0011_0_dds
        useLoader(TextureLoader, rabbitEyeTexture),  // Tex_0012_0_dds
        useLoader(TextureLoader, rabbitEarTexture),  // Tex_0019_0_dds
    ];
    const texture = textures[Math.floor(Math.random() * textures.length)];

    obj.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshBasicMaterial({ map: texture }); // Apply the texture
            child.material.map = texture; // Apply the texture
        }
    });
    obj.scale.set(1, 1, 1); // Increase the size of the rabbit 100x

    return <primitive ref={rabbitRef} object={obj} position={[0, 1, 0]} scale={[1,1,1]} />;
};

export default Rabbit;