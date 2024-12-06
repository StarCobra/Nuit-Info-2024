import { Joystick } from 'react-joystick-component';

const JoystickPhone = ({ translateX, translateZ ,setTranslateX, setTranslateZ }) => {
    const handleMove = (event) => {
            setTranslateX(event.x);
            setTranslateZ(event.y);
        }
        const handleStart = (event) => {
            const accelerate = () => {
            setTranslateX(prev => prev + event.x * 0.1); // Adjust the acceleration factor as needed
            setTranslateZ(prev => prev + event.y * 0.1); // Adjust the acceleration factor as needed
            };

            const intervalId = setInterval(() => {
            setTranslateX(prev => prev + event.x * 0.1); // Adjust the acceleration factor as needed
            setTranslateZ(prev => prev + event.y * 0.1); // Adjust the acceleration factor as needed
            }, 50); // Interval remains the same

            return () => clearInterval(intervalId); // Cleanup interval on stop
        }
        const handleStop = (event) => {
            const decelerate = () => {
            setTranslateX(prev => {
                const newX = prev * 0.9; // Slower deceleration
                return Math.abs(newX) < 0.01 ? 0 : newX; // Lower threshold for stopping
            });
            setTranslateZ(prev => {
                const newZ = prev * 0.9; // Slower deceleration
                return Math.abs(newZ) < 0.01 ? 0 : newZ; // Lower threshold for stopping
            });
            };

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
    )
}
export default JoystickPhone;


