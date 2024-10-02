import {Card, Row, Col} from "antd";

import Weather from "../components/Weather.jsx";
import ThisTime from "../components/ThisTime.jsx";
import RandomShow from "../components/RandomShow.jsx";
import LookCount from "../components/LookCount.jsx";

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
            <Row
                style={{
                    marginTop: 20
                }}
                justify={"space-around"}>
                <Col
                    span={20}
                >
                    <Card
                    >
                        <LookCount/>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default HomePage;

