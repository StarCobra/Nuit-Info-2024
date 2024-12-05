import { Joystick } from 'react-joystick-component';

const JoystickPhone = () => {
    const handleMove = (event) => {
            console.log('Move:', event);
        }

        const handleStop = (event) => {
            console.log('Stop:', event);
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


