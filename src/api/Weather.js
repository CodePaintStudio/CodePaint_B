import { weatherKey } from "../utils/key.js";

export function getWeatherData(city) {
    if (!city) {
        return Promise.reject(new Error("City name is required."));
    }

    return fetch(`http://apis.juhe.cn/simpleWeather/query?city=${encodeURIComponent(city)}&key=${weatherKey}`, {
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            throw error;
        });
}
