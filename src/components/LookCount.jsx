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

    const minY = Math.min(...lookCountData.map(d => d[1]));
    const maxY = Math.max(...lookCountData.map(d => d[1]));

    const updateChart = () => {
        const minDate = new Date(Math.min(...lookCountData.map(d => d[0])));
        const maxDate = new Date(Math.max(...lookCountData.map(d => d[0])));

        chartInstance.setOption({
            title: {
                text: '近七天的浏览量~'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'time',
                min: minDate,
                max: maxDate,
                axisLabel: {
                    formatter: function (value) {
                        return echarts.format.formatTime('MM-dd', value);
                    }
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                min: minY,
                max: maxY,
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '浏览量',
                type: 'line',
                showSymbol: false,
                hoverAnimation: true,
                data: lookCountData,
                areaStyle: {}
            }]
        });
    };

    return (
        <div id="lookCountChart" style={{width: '100%', height: 450}}></div>
    );
}
