import {Button, Col, Form, Input, Row, Select} from 'antd';
import {getBlogTypeListServer} from "../api/articelsCate.js";
import {useEffect, useState} from "react";


export default function BlogSearch({onFinish}) {

    const [blogTypeList, setBlogTypeList] = useState([]);

    async function getBlogTypeList() {
        const data = await getBlogTypeListServer()
        if (data.data) {
            let typeList = data.data.map((item => {
                return {
                    value: item,
                    label: item
                }
            }))
            setBlogTypeList(typeList)
        }

    }

    useEffect(() => {
        getBlogTypeList()
    }, [])

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
                        label="博客名"
                        name="title"
                    >
                        <Input
                            placeholder={"输入关键字以搜索"}
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
                            placeholder={"输入作者以搜索"}
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
                            defaultValue={"全部"}
                            placeholder={"请选择类型"}
                            options={blogTypeList}
                        />
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
