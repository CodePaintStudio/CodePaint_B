import {Button, Col, DatePicker, Form, Input, Row, Select} from 'antd';

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
                    span={8}
                >
                    <Form.Item
                        labelCol={{span: 4}}
                        label="作品名称"
                        name="title"
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
                        name="author"
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
