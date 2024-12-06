import PropTypes from 'prop-types';
import { useFrame } from "@react-three/fiber";
import { boatBasePos, boatBaseScale } from "../const/BoatBasePos";

const Boat = (props) => {
    const { translateX, translateZ, boatRef } = props;
    

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

Boat.propTypes = {
    translateX: PropTypes.number.isRequired,
    translateZ: PropTypes.number.isRequired,
    boatRef: PropTypes.object.isRequired,
};

