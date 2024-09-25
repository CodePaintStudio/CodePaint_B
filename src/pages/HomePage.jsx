import {useEffect, useRef} from 'react';

import {Card, Row, Col} from "antd";

import Weather from "../components/Weather.jsx";
import ThisTime from "../components/ThisTime.jsx";
import RandomShow from "../components/RandomShow.jsx";

const HomePage = () => {

    return (
        <div
            style={{
                padding: 20
            }}
        >
            <Row
                justify={"space-around"}
            >
                <Col
                >
                    <Card
                        style={{
                            width: 300,
                            height: 150
                        }}
                    >
                    <span style={{
                        fontSize: "x-large",
                        fontWeight: "bold",
                        color: "rgb(107, 172, 163)",
                    }}>
                    当前时间：
                    </span>
                        <ThisTime/>
                        <RandomShow/>
                    </Card>
                </Col>
                <Col
                >
                    <Card
                        style={{
                            width: 300,
                            height: 150
                        }}
                    >
                        <Weather/>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default HomePage;

