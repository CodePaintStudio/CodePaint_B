import {Button, Col, Form, Input, Row, Select} from 'antd';

const {Option} = Select;

export default function BlogSearch({onFinish}) {

    const typeListData = [
        {
            value: 'all',
            label: '全部',
        },
        {
            value: 'HTML',
            label: "HTML"
        },
        {
            value: 'CSS',
            label: "CSS"
        },
        {
            value: 'JavaScript',
            label: "JavaScript"
        }
    ];

    let typeList
    typeListData ?
        typeList = typeListData.map(item => {
            return <Option key={item.value} value={item.value}>{item.label}</Option>
        })
        :
        typeList = []

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
                    span={5}
                >
                    <Form.Item
                        labelCol={{span: 4}}
                        label="标题"
                        name="title"
                    >
                        <Input
                            placeholder={"请输入标题"}
                        />
                    </Form.Item>
                </Col>
                <Col
                    span={5}
                    push={1}
                >
                    <Form.Item
                        labelCol={{span: 4}}
                        label="作者"
                        name="author"
                    >
                        <Input
                            placeholder={"请输入作者"}
                        />
                    </Form.Item>
                </Col>
                <Col
                    span={5}
                    push={2}
                >
                    <Form.Item
                        labelCol={{span: 4}}
                        label="类型"
                        name="type"
                    >
                        <Select
                            placeholder={"请选择类型"}
                        >
                            {typeList}
                        </Select>
                    </Form.Item>
                </Col>
                <Col
                    span={5}
                    push={3}
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
