import { Joystick } from 'react-joystick-component';
const JoystickPhone = () => {
    return(
        <div className="joystickContainer">
    <Joystick size={100} sticky={false} baseColor="rgba(200, 200, 200, 0.7)" stickColor="rgba(255, 255, 255, 0.8)" mode="dynamic"/>
  </div>
    )
}
export default JoystickPhone;