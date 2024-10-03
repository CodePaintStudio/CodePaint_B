import {Card, Row, Col} from "antd";

import Weather from "../components/Weather.jsx";
import ThisTime from "../components/ThisTime.jsx";
import RandomShow from "../components/RandomShow.jsx";
import LookCount from "../components/LookCount.jsx";
import CateCounts from "../components/CateCounts.jsx";

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
                    span={8}
                >
                    <Card
                        hoverable
                        style={{
                            width: "90%",
                            height: 150
                        }}
                    >
                    <span
                        style={{
                        fontSize: "x-large",
                        fontWeight: "bold",
                        color: "rgb(107, 172, 163)",
                    }}>
                    当前时间：
                    </span>
                        <br/>
                        <ThisTime/>
                        <RandomShow/>
                    </Card>
                </Col>
                <Col
                    hoverable
                    span={16}
                >
                    <Card
                        hoverable
                        style={{
                            width: 300,
                            height: 150
                        }}
                    >
                        <Weather/>
                    </Card>
                </Col>

            </Row>
            <Row
                style={{
                    marginTop: 40
                }}
                justify={"space-around"}>
                <Col
                    span={8}
                >
                    <Card
                        hoverable
                        style={{
                            width: "90%",
                            height: 500
                        }}
                    >
                        <CateCounts/>
                    </Card>
                </Col>
                <Col
                    span={16}
                >
                    <Card
                        hoverable
                        style={{
                            width: "100%",
                            height: 500
                        }}
                    >
                        <LookCount/>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default HomePage;

