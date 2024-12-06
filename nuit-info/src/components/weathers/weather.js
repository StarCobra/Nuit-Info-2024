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
        waves1Intensity: 0.5 ,
        waves2Intensity: 0.3 ,
        waves3Intensity: 0.4 ,
    },
    [WEATHER_TYPE_VALUE_FEW_CLOUDS]: {
        id: WEATHER_TYPE_VALUE_FEW_CLOUDS,
        waves1Intensity: 0.75 ,
        waves2Intensity: 0.45 ,
        waves3Intensity: 0.6 ,
    },
    [WEATHER_TYPE_VALUE_SCATTERED_CLOUDS]: {
        id: WEATHER_TYPE_VALUE_SCATTERED_CLOUDS,
        waves1Intensity: 1 ,
        waves2Intensity: 0.6 ,
        waves3Intensity: 0.8 ,
    },
    [WEATHER_TYPE_VALUE_BROKEN_CLOUDS]: {
        id: WEATHER_TYPE_VALUE_BROKEN_CLOUDS,
        waves1Intensity: 1.25 ,
        waves2Intensity: 0.75 ,
        waves3Intensity: 1 ,
    },
    [WEATHER_TYPE_VALUE_SHOWER_RAIN]: {
        id: WEATHER_TYPE_VALUE_SHOWER_RAIN,
        waves1Intensity: 1.5 ,
        waves2Intensity: 0.9 ,
        waves3Intensity: 1.2 ,
    },
    [WEATHER_TYPE_VALUE_RAIN]: {
        id: WEATHER_TYPE_VALUE_RAIN,
        waves1Intensity: 1.75 ,
        waves2Intensity: 1.05 ,
        waves3Intensity: 1.4 ,
    },
    [WEATHER_TYPE_VALUE_THUNDERSTORM]: {
        id: WEATHER_TYPE_VALUE_THUNDERSTORM,
        waves1Intensity: 2 ,
        waves2Intensity: 1.2 ,
        waves3Intensity: 1.6 ,
    },
    [WEATHER_TYPE_VALUE_SNOW]: {
        id: WEATHER_TYPE_VALUE_SNOW,
        waves1Intensity: 0.75 ,
        waves2Intensity: 0.45 ,
        waves3Intensity: 0.6 ,
    },
    [WEATHER_TYPE_VALUE_MIST]: {
        id: WEATHER_TYPE_VALUE_MIST,
        waves1Intensity: 0.75 ,
        waves2Intensity: 0.45 ,
        waves3Intensity: 0.6 ,
    },
};

export const WEATHER_TYPE_LIST = Object.values(WEATHER_TYPES);