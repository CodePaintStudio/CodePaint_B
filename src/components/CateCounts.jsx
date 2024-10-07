import {useEffect, useRef, useState} from 'react';
import * as echarts from 'echarts';

import {
    getBlogCountServer,
    getWorkCountServer,
    getActivityCountServer
} from "../api/Home.js";

import {message} from "antd";

const CateCounts = () => {
    const chartRef = useRef(null);
    const [option, setOption] = useState({});

    async function getCounts() {
        try {
            const [blogCount, activityCount, workCount] = await Promise.all([
                getBlogCountServer(),
                getActivityCountServer(),
                getWorkCountServer()
            ]);

            const data = [
                {value: blogCount.data, name: '博客'},
                {value: activityCount.data, name: '活动'},
                {value: workCount.data, name: '作品'}
            ];

            const updatedOption = {
                ...option,
                series: [
                    {
                        data: data
                    }
                ]
            };

            setOption(updatedOption);

            const chartInstance = echarts.getInstanceByDom(chartRef.current) || echarts.init(chartRef.current);
            chartInstance.setOption(updatedOption);
        } catch (error) {
            message.warning("获取文章数量失败");
        }
    }

    useEffect(() => {
        getCounts();

        // 初始化ECharts实例
        const chartInstance = echarts.init(chartRef.current);

        const initialOption = {
            title: {
                text: '文章数量',
                left: 'center',
                textStyle: {
                    color: 'rgb(107, 172, 163)',
                    fontSize: 24
                }
            },
            tooltip: {
                trigger: 'item',
                textStyle: {
                    color: 'rgb(107, 172, 163)',
                }
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: "文章数量:",
                    type: "pie",
                    radius: "50%",
                    data: [], // 初始为空，稍后通过API获取数据填充
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 20,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(107, 172, 163)'
                        },
                        label: {
                            show: true,
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'rgb(107, 172, 163)'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                const colorList = ['rgb(97, 192, 191)', 'rgba(187, 222, 214)', 'rgb(250, 227, 217)'];
                                return colorList[params.dataIndex % colorList.length];
                            }
                        }
                    }
                }
            ]
        };

        setOption(initialOption);
        chartInstance.setOption(initialOption);

        return () => {
            chartInstance.dispose();
        };
    }, []);

    return (
        <div ref={chartRef} style={{width: '100%', height: 500}}></div>
    );
};

export default CateCounts;
