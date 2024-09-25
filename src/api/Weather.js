import request from "../utils/request.js"

export function getWeatherDataServer(city) {
    return request.get(`/weather?city=${city}`)
}
