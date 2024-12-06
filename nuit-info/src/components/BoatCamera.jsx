import { useRef } from "react";
import { OrbitControls } from '@react-three/drei';
import { boatBasePos } from '../const/BoatBasePos';
import PropTypes from 'prop-types';

const BoatCamera = ({ translateX, translateZ }) => {
    const cameraRef = useRef();

    return (
        <OrbitControls
            ref={cameraRef}
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={(Math.PI - 0.5) / 2}
            target={boatBasePos}
        />
    );
};

export default BoatCamera;

BoatCamera.propTypes = {
    translateX: PropTypes.number.isRequired,
    translateZ: PropTypes.number.isRequired,
};