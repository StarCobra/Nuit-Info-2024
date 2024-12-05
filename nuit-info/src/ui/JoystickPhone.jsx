import { Joystick } from 'react-joystick-component';

const JoystickPhone = ({ translateX, translateZ ,setTranslateX, setTranslateZ }) => {
    const handleMove = (event) => {
            console.log('Move:', event);
            setTranslateX(event.x);
            setTranslateZ(event.y);
            console.group("joystick")
            console.log("translateX",translateX)
            console.log("translateY",translateZ)
            console.groupEnd()
        }

        const handleStop = (event) => {
            setTranslateX(0);
            setTranslateZ(0);
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


