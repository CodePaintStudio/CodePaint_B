import {Button, Col, Form, Input, Row} from 'antd';

export default function ActivitiesSearch({onFinish}) {

    return (
        <Form
            style={{
                fontWeight: "bold",
                borderBottom: "1px solid rgb(217, 217, 217)",
                padding: 24,
                paddingBottom: 0
            }}
            labelAlign="right"
            onFinish={onFinish}
            autoComplete="off"
        >
            <Row>
                <Col
                    span={8}
                >
                    <Form.Item
                        labelCol={{span: 4}}
                        label="活动名称"
                        name="title"
                    >
                        <Input
                            placeholder={"输入关键字以搜索"}
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
