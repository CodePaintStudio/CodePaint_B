import {getWeatherDataServer} from "../api/Weather.js";
import {useEffect, useState} from "react";
import {Descriptions, message} from "antd";
import {sleep} from "../utils/tools.js";

export default function Weather() {
    const [weatherData, setWeatherData] = useState([]);

    async function getWeatherData() {
        try {
            const data = await getWeatherDataServer("成都");
            if (data.resultcode !== '112') {
                setWeatherData(data.result);
            } else {
                setWeatherData(null);
                throw new Error();
            }
        } catch {
            sleep(2000).then(() => {
                message.error("获取天气详情失败");
            })
        }
    }

    useEffect(() => {
        getWeatherData()
    }, []);

    const itemStyle = {
        fontSize: "larger",
        fontWeight: "bold",
        color: "rgb(107, 172, 163)",
    }
    const contentStyle = {
        fontSize: "larger",
        fontWeight: "bold",
        color: "rgb(107, 172, 164)",
    }
    return (
        <>
            <h1 style={{
                color: "rgb(107, 172, 163)",
                fontSize: "x-large",
                fontWeight: "bold"
            }}>
                今日天气
            </h1>
            {weatherData ? <Descriptions
                    column={2}
                >
                    <Descriptions.Item
                        labelStyle={itemStyle}
                        contentStyle={contentStyle}
                        label={"状况"}>
                    <span>
                        {weatherData.info}
                    </span>
                    </Descriptions.Item>
                    <Descriptions.Item
                        contentStyle={contentStyle}
                        labelStyle={itemStyle}
                        label={"湿度"}>
                    <span>
                        {weatherData.humidity}
                    </span>
                    </Descriptions.Item>
                    <Descriptions.Item
                        labelStyle={itemStyle}
                        contentStyle={contentStyle}
                        label={"温度"}>
                    <span>
                        {weatherData.temperature}
                    </span>
                    </Descriptions.Item>
                    <Descriptions.Item
                        labelStyle={itemStyle}
                        contentStyle={contentStyle}
                        label={"空气质量"}>
                    <span>
                        {weatherData.aqi}
                    </span>
                    </Descriptions.Item>
                </Descriptions>
                :
                <span
                    style={{
                        color: "rgb(127, 139, 189)",
                        fontSize: "large",
                        fontWeight: "bold",
                    }}
                >获取天气信息失败~</span>
            }
        </>
    )
}
