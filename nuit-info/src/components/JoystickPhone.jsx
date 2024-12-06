import { Joystick } from 'react-joystick-component';

import PropTypes from 'prop-types';

const JoystickPhone = ({ setTranslateX, setTranslateZ }) => {
    const handleMove = (event) => {
            setTranslateX(event.x);
            setTranslateZ(event.y);
        }
        
        const handleStop = () => {
            const intervalId = setInterval(() => {
            setTranslateX(prev => {
                const newX = prev * 0.9; // Slower deceleration
                if (Math.abs(newX) < 0.01) { // Lower threshold for stopping
                clearInterval(intervalId);
                return 0;
                }
                return newX;
            });
            setTranslateZ(prev => {
                const newZ = prev * 0.9; // Slower deceleration
                if (Math.abs(newZ) < 0.01) { // Lower threshold for stopping
                clearInterval(intervalId);
                return 0;
                }
                return newZ;
            });
            }, 50); // Interval remains the same
        }
        
    return(
            <div className="joystickContainer">
                <Joystick 
                    size={100} 
                    sticky={false} 
                    baseColor="rgba(200, 200, 200, 0.7)" 
                    stickColor="rgba(255, 255, 255, 0.8)" 
                    mode="dynamic"
                    move={handleMove}
                    stop={handleStop}
                />
        </div>
    );
}

export default JoystickPhone;

JoystickPhone.propTypes = {
    setTranslateX: PropTypes.func.isRequired,
    setTranslateZ: PropTypes.func.isRequired,
};



