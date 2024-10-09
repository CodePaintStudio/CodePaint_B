import {useEffect, useState} from 'react';
import * as echarts from 'echarts';
import {getLookCountServer} from "../api/Home.js";

export default function LookCount() {
    const [chartInstance, setChartInstance] = useState(null);
    const [lookCountData, setLookCountData] = useState([]);

    useEffect(() => {
        async function getLookCount() {
            const response = await getLookCountServer();
            const formattedData = response.data.map(item => {
                return [new Date(item.accessTime).getTime(), item.pageCount];
            });
            setLookCountData(formattedData);
        }

        getLookCount();
    }, []);

    useEffect(() => {
        const chart = echarts.init(document.getElementById('lookCountChart'));
        setChartInstance(chart);
        return () => {
            chart.dispose();
        };
    }, []);

    useEffect(() => {
        if (chartInstance && lookCountData.length > 0) {
            updateChart();
        }
    }, [lookCountData, chartInstance]);


    const updateChart = () => {
        const minY = 0;
        const maxY = Math.max(...lookCountData.map(d => d[1]));
        const minDate = new Date(Math.min(...lookCountData.map(d => d[0])));
        const maxDate = new Date(Math.max(...lookCountData.map(d => d[0])));

        chartInstance.setOption({
            title: {
                text: '近日访问量~', left: 'center', textStyle: {
                    color: 'rgb(107, 172, 163)', fontWeight: "900", fontSize: 24
                }
            }, tooltip: {
                trigger: 'axis', textStyle: {
                    color: 'rgb(107, 172, 163)',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    fontSize: 14,
                },
            }, xAxis: {
                type: 'time', min: minDate, max: maxDate, axisLabel: {
                    formatter: function (value) {
                        return echarts.format.formatTime('yy-MM-dd', value);
                    }
                }, splitLine: {
                    show: false
                }
            }, yAxis: {
                type: 'value', min: minY > 5 ? minY - 3 : 0, max: maxY + 5, boundaryGap: false, splitLine: {
                    show: false
                }
            }, series: [{
                name: '当日浏览量',
                type: 'line',
                showSymbol: true,
                hoverAnimation: true,
                data: lookCountData,
                lineStyle: {
                    color: 'rgb(107, 172, 163)',
                },
                itemStyle: {
                    color: 'rgb(107, 172, 164)',
                },
                areaStyle: {
                    color: 'rgba(107, 172, 163, 0.8)'
                },
                smooth: true,
            }]
        });
    };

    return (<div id="lookCountChart" style={{width: '100%', height: 450}}></div>);
}
