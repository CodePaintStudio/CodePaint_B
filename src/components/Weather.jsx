import {getWeatherDataServer} from "../api/Weather.js";
import {useEffect, useState} from "react";

export default function Weather() {
    const [weatherData, setWeatherData] = useState([]);

    async function getWeatherData() {
        const data = await getWeatherDataServer("成都");
        console.log(data)
    }

    useEffect(() => {
        getWeatherData()
    }, []);
    return (
        <h1>Weather</h1>
    )
}
