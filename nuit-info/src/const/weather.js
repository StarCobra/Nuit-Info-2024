/* Weather type */

export const WEATHER_TYPE_VALUE_CLEAR_SKY = 'clear sky';
export const WEATHER_TYPE_VALUE_FEW_CLOUDS = 'few clouds';
export const WEATHER_TYPE_VALUE_SCATTERED_CLOUDS = 'scattered clouds';
export const WEATHER_TYPE_VALUE_BROKEN_CLOUDS = 'broken clouds';
export const WEATHER_TYPE_VALUE_SHOWER_RAIN = 'shower rain';
export const WEATHER_TYPE_VALUE_RAIN = 'rain';
export const WEATHER_TYPE_VALUE_THUNDERSTORM = 'thunderstorm';
export const WEATHER_TYPE_VALUE_SNOW = 'snow';
export const WEATHER_TYPE_VALUE_MIST = 'mist';

export const WEATHER_TYPES = {
    [WEATHER_TYPE_VALUE_CLEAR_SKY]: {
        id: WEATHER_TYPE_VALUE_CLEAR_SKY,
        color: "#00BFFF",
    },
    [WEATHER_TYPE_VALUE_FEW_CLOUDS]: {
        id: WEATHER_TYPE_VALUE_FEW_CLOUDS,
        color: "#87CEEB",
    },
    [WEATHER_TYPE_VALUE_SCATTERED_CLOUDS]: {
        id: WEATHER_TYPE_VALUE_SCATTERED_CLOUDS,
        color: "#B0E0E6",
    },
    [WEATHER_TYPE_VALUE_BROKEN_CLOUDS]: {
        id: WEATHER_TYPE_VALUE_BROKEN_CLOUDS,
        color: "#87AFC7",
    },
    [WEATHER_TYPE_VALUE_SHOWER_RAIN]: {
        id: WEATHER_TYPE_VALUE_SHOWER_RAIN,
        color: "#5F9EA0",
    },
    [WEATHER_TYPE_VALUE_RAIN]: {
        id: WEATHER_TYPE_VALUE_RAIN,
        color: "#4682B4",
    },
    [WEATHER_TYPE_VALUE_THUNDERSTORM]: {
        id: WEATHER_TYPE_VALUE_THUNDERSTORM,
        color: "#2F4F4F",
    },
    [WEATHER_TYPE_VALUE_SNOW]: {
        id: WEATHER_TYPE_VALUE_SNOW,
        color: "#B0E0E6",
    },
    [WEATHER_TYPE_VALUE_MIST]: {
        id: WEATHER_TYPE_VALUE_MIST,
        color: "#D3D3D3",
    },
};

export const WEATHER_TYPE_LIST = Object.values(WEATHER_TYPES);
