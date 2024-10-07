import {Button, Col, Form, Input, message, Row, Select} from 'antd';
import {useEffect, useState} from "react";

import {
    searchBlogServer,
    getBlogTypeListServer
} from "../api/Blog.js";
import {clearObj, toLocalDate} from "../utils/tools.js";

export default function BlogSearch({setTotal, setPageInfo, setBlogList, setLoading}) {

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
            typeList.unshift({
                value: "all",
                label: "全部"
            });
            setBlogTypeList(typeList)
        }

    }

    async function handleSearch(values) {
        values = clearObj(values);
        if (!Object.keys(values).length) return message.warning("请补全查询条件");
        if (values.type && values.type === "all") delete values.type;
        setPageInfo({
            page: 1,
            pageSize: 1000
        })
        values = {
            ...values,
            page: 1,
            pageSize: 1000
        }
        try {
            setLoading(true);
            const data = await searchBlogServer(values);
            const articleListWithKeys = data.data.map((item, index) => {
                return {
                    ...item,
                    key: index,
                    articleCreatedTime: toLocalDate(item.articleCreatedTime),
                };
            });
            setBlogList(articleListWithKeys);
            setTotal(data.total)
        } catch {
            message.error("查询博客失败");
        } finally {
            setLoading(false);
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
            onFinish={handleSearch}
            autoComplete="off"
        >
            <Row>
                <Col
                    span={5}
                >
                    <Form.Item
                        labelCol={{span: 4}}
                        label="博客名"
                        name="keyWord"
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
