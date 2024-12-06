import React, { Suspense, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import "./styles.css";
import JoystickPhone from "./components/JoystickPhone";
import { Sky } from '@react-three/drei'
import Boat from './components/Boat';
import Ocean from "./components/Ocean";
import BoatCamera from './components/BoatCamera';
import axios from 'axios';
import WeathersEffectsComponent from "./components/weathers/WeathersEffectsComponent";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [translateX, setTranslateX] = useState(0);
  const [translateZ, setTranslateZ] = useState(0);


  let weather;
  function getPosition(latitude, longitude) {

    latitude = 48.866667
    longitude = 2.333333

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      latitude = crd.latitude;
      longitude = crd.longitude;
      console.log("Votre position actuelle est :");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude : ${crd.longitude}`);
      console.log(`La précision est de ${crd.accuracy} mètres.`);
      toast('Votre position est activée ! prise en compte de la météo. . .', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    } axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=04daf9bf3c2e33aba6f85803c9eeb62d`)
      .then(response => {
        console.log(response.data.weather[0].main);
        weather = response.data.weather[0].main
      })
      .catch(error => {
        console.log(error);
      });

    function error(err) {
      console.warn(`ERREUR (${err.code}): ${err.message}`);
      let latitude = 48.866667;
      let longitude = 2.333333;
      toast('Votre position est désactivée Paris sera la position par défaut', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=04daf9bf3c2e33aba6f85803c9eeb62d`)
        .then(response => {
          console.log(response.data.weather[0].main);
          weather = response.data.weather[0].main
        })
        .catch(error => {
          console.log(error);
        });
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

  }
  useEffect(() => {
    getPosition();
  }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight
          position={[-10, -10, -10]}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[100, 100, 100]} />
        <pointLight position={[-100, -100, -100]} />
        <Boat translateX={translateX} translateZ={translateZ} />

        <Suspense fallback={null}>
          <Ocean />
        </Suspense>
        <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
        <BoatCamera translateX={translateX} translateZ={translateZ} />
      </Canvas>
      <WeathersEffectsComponent weather={weather} />
      <JoystickPhone translateX={translateX} translateZ={translateZ} setTranslateX={setTranslateX} setTranslateZ={setTranslateZ} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
