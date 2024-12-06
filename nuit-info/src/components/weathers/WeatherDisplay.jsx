import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';

function WeatherDisplay() {
    const [weatherData, setWeatherData] = useState(null);
    const [latitude, setLatitude] = useState(48.866667);
    const [longitude, setLongitude] = useState(2.333333);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=04daf9bf3c2e33aba6f85803c9eeb62d`);
                setWeatherData(response.data);
                toast('Données météo mises à jour !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des données météo:', error);
                toast('Erreur lors de la récupération des données météo', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        };

        fetchWeatherData();
    }, [latitude, longitude]);

    if (!weatherData) {
        return <div>Chargement des données météo...</div>;
    }

    return (
        <Card title={`Météo à ${weatherData.name}`} className="weather-card">
            <div className="weather-icon">
                <Image src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} width="100" />
            </div>
            <div className="weather-details">
                <p>Température: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
                <p>Ressenti: {(weatherData.main.feels_like - 273.15).toFixed(2)}°C</p>
                <p>Température minimale: {(weatherData.main.temp_min - 273.15).toFixed(2)}°C</p>
                <p>Température maximale: {(weatherData.main.temp_max - 273.15).toFixed(2)}°C</p>
                <p>Humidité: {weatherData.main.humidity}%</p>
                <p>Vitesse du vent: {weatherData.wind.speed} m/s</p>
                <p>Description: {weatherData.weather[0].description}</p>
            </div>
            <ToastContainer />
        </Card>
    );
}

export default WeatherDisplay;
