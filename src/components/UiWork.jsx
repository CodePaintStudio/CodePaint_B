import dayjs from "dayjs";
import {useState, useEffect} from "react";
import {clearObj, sleep} from "../utils/tools.js";
import moment from "moment";

import UiSearch from './UiSearch.jsx';
import {message, Popconfirm, Space, Table} from "antd";

import {
    getArticleListServer,
    deleteArticleServer
} from "../api/articelsCate.js"

import {
    getWorkListServer
} from "../api/uiWork.js"

export default function UiWork() {
    const [uiWorkList, setUiWorkList] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: "名称",
            dataIndex: "workTitle",
            key: "workTitle"
        },
        {
            title: "作者",
            dataIndex: "workAuthor",
            key: "workAuthor"
        },
        {
            title: "浏览量",
            dataIndex: "workLookCount",
            sorter: (a, b) => a- b,
            key: "workLookCount"
        },
        {
            title: "类型",
            dataIndex: "workType",
            key: "workType",
        },
        {
            title: "发布时间",
            dataIndex: "workCreatedTime",
            key: "workCreatedTime",
            sorter: (a, b) => a - b
        },
        {
            title: "ID",
            dataIndex: "workId",
            key: "workId",
            hidden: true
        },
        {
            title: "操作",
            key: "action",
            fixed: "right",
            render: (text, record) => (
                <Space
                    size="middle"
                >
                    <a
                        style={{color: "#85bbb5"}}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        详情
                    </a>
                    <Popconfirm
                        title="警告"
                        description="是否要删除"
                        onConfirm={() => {
                            deleteArticle(record.workId)
                        }}
                        onCancel={() => {
                            message.info('取消删除');
                        }}
                        okText="是"
                        cancelText="否"
                    >
                        <a
                            style={{color: "#85bbb5"}}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >删除</a>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    async function getWorkList() {
        try {
            setLoading(true)
            const data = await getWorkListServer();
            const workListWithKeys = data.data.map((item, index) => {
                return {
                    ...item,
                    key: index,
                    workCreatedTime: moment(item.workCreatedTime).local().format("YYYY-MM-DD HH:mm:ss"),
                };
            });
            setUiWorkList(workListWithKeys);
            message.success("获取作品列表成功")
        } catch {
            message.error("获取作品列表失败");
        } finally {
            setLoading(false)
        }

    }

    function handleSubmit(values) {
        values = clearObj(values);
        if (values.publishTime) values.publishTime = dayjs(values.publishTime).format("YYYY-MM-DD");
        if (!Object.keys(values).length) return message.warning("请补全查询条件");
        console.log(values)

        /*TODO: 搜索提交*/
    }

    async function deleteArticle(id) {
        try {
            setLoading(true)
            const data = await deleteArticleServer(id);
            message.info(data.message);
        } catch (err) {
            message.warning("删除失败");
        } finally {
            setLoading(false);
            sleep(1000).then(()=>{
                getWorkList();
            })
        }
    }

    useEffect(() => {
        getWorkList();
    }, []);

    return (
        <>
            <div>
                <UiSearch
                    onFinish={handleSubmit}
                />

            </div>
            <div
                style={{
                    padding: 24
                }}
            >
                <Table
                    loading={loading}
                    scroll={{
                        x: 1500,
                        y: 600,
                    }}
                    dataSource={uiWorkList}
                    columns={columns}
                />
            </div>
        </>
    );
}
