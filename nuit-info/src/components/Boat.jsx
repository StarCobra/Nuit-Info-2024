import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { boatBasePos, boatBaseScale } from "../const/BoatBasePos";

const Boat = (props) => {
    const { translateX, translateZ, oceanRef } = props;
    const boatRef = useRef();

    useFrame((state, delta) => {
        if (boatRef.current) {
            // boatRef.current.rotation.x += delta;
            boatRef.current.position.x += -translateX * delta;
            boatRef.current.position.z += translateZ * delta;
            // Get the height of the waves at the boat's position
            const positionAttribute = oceanRef.current.geometry.attributes.position;
            const x = boatRef.current.position.x;
            const z = boatRef.current.position.z;
            let y = 0;

            for (let i = 0; i < positionAttribute.count; i++) {
                const px = positionAttribute.getX(i);
                const pz = positionAttribute.getY(i);
                if (Math.abs(px - x) < 1 && Math.abs(pz - z) < 1) {
                    y = positionAttribute.getZ(i);
                    break;
                }
            }

            // Update boat's y position to float on the waves
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
