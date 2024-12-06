import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three';

const Boat = (props) => {
    const { translateX, translateZ } = props;
    const boatRef = useRef();
    const obj = useLoader(OBJLoader, '/assets/textures/sprite/boat/Sail.obj');
    const [texture1, texture2] = useLoader(TextureLoader, [
        '/assets/textures/Tex_0211_0.png',
        '/assets/textures/Tex_0212_0.png' // Corrected file name
    ]);

    obj.traverse((child) => {
        if (child.isMesh) {
            child.material.map = texture2; // Apply the first texture
            child.material.map = texture1; // Apply the second texture
        }
    });

    useFrame((state, delta) => {
        if (boatRef.current) {
            boatRef.current.position.x += -translateX * delta;
            boatRef.current.position.z += translateZ * delta;
        }
    });

    return <primitive ref={boatRef} object={obj} />;
};

export default Boat;