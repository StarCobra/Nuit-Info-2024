import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { boatBasePos, boatBaseScale } from "../const/BoatBasePos";

const Boat = (props) => {
    const { translateX, translateZ } = props;
    const boatRef = useRef();

    useFrame((state, delta) => {
        if (boatRef.current) {
            // boatRef.current.rotation.x += delta;
            boatRef.current.position.x += -translateX * delta;
            boatRef.current.position.z += translateZ * delta;
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
