import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { boatBasePos, boatBaseScale } from "../const/BoatBasePos";

const Boat = (props) => {
    const { translateX, translateZ, oceanRef } = props;
    const boatRef = useRef();

    useFrame((state, delta) => {
        if (boatRef.current && oceanRef.current) {
            // Mise à jour de la position du bateau en x et z
            boatRef.current.position.x += -translateX * delta;
            boatRef.current.position.z += translateZ * delta;

            // Obtention de la hauteur des vagues à la position du bateau
            const positionAttribute = oceanRef.current.geometry.attributes.position;
            const x = boatRef.current.position.x;
            const z = boatRef.current.position.z;
            let y = 0;

            // Utiliser une méthode plus précise pour obtenir la hauteur des vagues
            const vertices = positionAttribute.array;
            const widthSegments = oceanRef.current.geometry.parameters.widthSegments;
            const heightSegments = oceanRef.current.geometry.parameters.heightSegments;
            const segmentWidth = oceanRef.current.geometry.parameters.width / widthSegments;
            const segmentHeight = oceanRef.current.geometry.parameters.height / heightSegments;

            const col = Math.floor((x + oceanRef.current.geometry.parameters.width / 2) / segmentWidth);
            const row = Math.floor((z + oceanRef.current.geometry.parameters.height / 2) / segmentHeight);

            if (col >= 0 && col < widthSegments && row >= 0 && row < heightSegments) {
                const index = (row * (widthSegments + 1) + col) * 3;
                y = vertices[index + 2];
            }

            // Mise à jour directe de la position y du bateau pour flotter sur les vagues
            boatRef.current.position.y = y;
        }
    });

    return (
        <mesh
            {...props}
            ref={boatRef}
            position={boatBasePos}
        >
            <boxGeometry args={boatBaseScale} />
            <meshStandardMaterial color={"orange"} />
        </mesh>
    );
};

export default Boat;