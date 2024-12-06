import React, { Suspense, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import "./styles.css";
import { OrbitControls } from "@react-three/drei";
import JoystickPhone from "./components/JoystickPhone";
import { Sky } from '@react-three/drei'
import Boat from './components/Boat';
import Ocean from "./components/Ocean";
import BoatCamera from './components/BoatCamera';
import { ToastContainer, toast } from 'react-toastify';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; // Importez le thème ici
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons
import WeatherDisplay from "./components/weathers/WeatherDisplay";
import axios from 'axios';
import { Image } from 'primereact/image';
import Rabbit from "./components/Rabbit";
import JSConfetti from 'js-confetti'

function App() {
  const [translateX, setTranslateX] = useState(0);
  const [translateZ, setTranslateZ] = useState(0);

  const emojis = ['😥', '😱', '😁', '😃', '💫', '🌸'];

  const launchConfetti = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        emojis: emojis,
    });
};
const selectRandomEmoji = () => {
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  setSelectedEmoji(randomEmoji);
  launchConfetti();
};
  let weather;
  const [visible, setVisible] = useState(false);
  const [visibleWeather, setVisibleWeather] = useState(false);

  const canvas = document.getElementById('your_custom_canvas_id')


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
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cce00159b97183936f67eee6bb380c15`)
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

  const pokemonList = [
    { name: "Carapagos", src: "/QRCode/Carapagos.png" },
    { name: "Etournmi", src: "/QRCode/Etournmi.png" },
    { name: "Flamiaou", src: "/QRCode/Flamiaou.png" },
    { name: "Gorythmic", src: "/QRCode/Gorythmic.png" },
    { name: "Leopardus", src: "/QRCode/Leopardus.png" },
    { name: "Lougaroc", src: "/QRCode/Lougaroc.png" },
    { name: "Mustebouee", src: "/QRCode/Mustebouee.png" },
    { name: "Nemelios", src: "/QRCode/Nemelios.png" },
    { name: "Pandaspiegle", src: "/QRCode/Pandaspiegle.png" },
    { name: "Phanpy", src: "/QRCode/Phanpy.png" },
    { name: "Poussacha", src: "/QRCode/Poussacha.png" },
    { name: "Rhinoferos", src: "/QRCode/Rhinoferos.png" },
    { name: "Ursaring", src: "/QRCode/Ursaring.png" },
    { name: "Wailmer", src: "/QRCode/Wailmer.png" }
  ];

  return (
    <>
      <div className="headerFIN">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <h2>QR CODE</h2>

          <div>
            {pokemonList.map((pokemon, index) => (
              <Image
                key={index}
                src={pokemon.src}
                alt={pokemon.name}
                preview
                width="250"
              />
            ))}
          </div>
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
          <ToastContainer />
        </Sidebar>

        <Sidebar visible={visibleWeather} position="right" onHide={() => setVisibleWeather(false)}>
          <PrimeReactProvider>
            <WeatherDisplay />
          </PrimeReactProvider>

        </Sidebar>
        <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
        <Button icon="pi pi-arrow-left" onClick={() => setVisibleWeather(true)} />
        <Button icon="pi pi-arrow-right" onClick={() => selectRandomEmoji} />

      </div>
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
        <Rabbit />
        <Boat translateX={translateX} translateZ={translateZ} />

        <Suspense fallback={null}>
          <Ocean />
        </Suspense>
        <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
        <BoatCamera translateX={translateX} translateZ={translateZ} />
        <OrbitControls />
      </Canvas>
      <JoystickPhone translateX={translateX} translateZ={translateZ} setTranslateX={setTranslateX} setTranslateZ={setTranslateZ} />

    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
