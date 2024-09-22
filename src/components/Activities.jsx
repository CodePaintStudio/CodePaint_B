import {useState, useEffect} from "react";
import {sleep} from "../utils/tools.js";

import {message, Popconfirm, Space, Table} from "antd";

import {
    getActivitiesServer,
    deleteActivitiesServer
} from "../api/activity.js"

export default function Activities() {
    const [activitiesList, setActivitiesList] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: "活动名",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "作者",
            dataIndex: "creator",
            key: "creator"
        },
        {
            title: "简介",
            dataIndex: "intro",
            key: "intro",
            ellipsis: true
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
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
                            deleteActivity(record.id)
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
                        >
                            删除
                        </a>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    async function getActivitiesList() {
        try {
            setLoading(true)
            const data = await getActivitiesServer();
            const activitiesListWithKeys = data.data.map((item, index) => {
                return {
                    ...item,
                    key: index
                };
            });
            message.success("获取活动列表成功");
            setActivitiesList(activitiesListWithKeys);
        } catch {
            message.error("获取活动列表失败");
        } finally {
            setLoading(false);
        }
    }

    async function deleteActivity(id) {
        try {
            setLoading(true)
            await deleteActivitiesServer(id);
            message.info("活动删除成功");
        } catch (err) {
            message.warning("活动删除失败");
        } finally {
            setLoading(false);
            sleep(1000).then(() => {
                getActivitiesList();
            })
        }
    }

    useEffect(() => {
        getActivitiesList();
    }, []);

    return (
        <>
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
                    dataSource={activitiesList}
                    columns={columns}
                />
            </div>
        </>
    );
}
