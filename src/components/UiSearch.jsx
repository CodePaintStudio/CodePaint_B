import {Button, Col, Form, Input, message, Row} from 'antd';
import {clearObj} from "../utils/tools.js";
import {
    searchWorkServer
} from "../api/uiWork.js"

export default function UiSearch({setUiWorkList, setLoading}) {

    async function handleSubmit(values) {
        values = clearObj(values);
        if (!Object.keys(values).length) return message.warning("请补全查询条件");
        try {
            setLoading(true);
            const data = await searchWorkServer(values);
            setUiWorkList(data.data);
            message.success("查询UI作品成功");
        } catch {
            message.warning("查询UI作品失败");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form
            style={{
                fontWeight: "bold",
                borderBottom: "1px solid rgb(217, 217, 217)",
                padding: 24,
                paddingBottom: 0
            }}
            labelAlign="right"
            onFinish={handleSubmit}
            autoComplete="off"
        >
            <Row>
                <Col
                    span={8}
                >
                    <Form.Item
                        labelCol={{span: 4}}
                        label="作品名称"
                        name="workTitle"
                    >
                        <Input
                            placeholder={"输入关键字以搜索"}
                        />
                    </Form.Item>
                </Col>
                <Col
                    span={8}
                    push={1}
                >
                    <Form.Item
                        labelCol={{span: 4}}
                        label="作者"
                        name="workAuthor"
                    >
                        <Input
                            placeholder={"输入作者以搜索"}
                        />
                    </Form.Item>
                </Col>
                <Col
                    span={8}
                    push={2}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            padding: "0 3vh"
                        }}
                    >
                        查询
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
