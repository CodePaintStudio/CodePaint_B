import {useState, useEffect} from "react";
import {sleep} from "../utils/tools.js";

import {message, Popconfirm, Space, Table, Pagination} from "antd";

import {
    getActivitiesServer,
    deleteActivitiesServer
} from "../api/activity.js"
import Details from "./Details.jsx";

export default function Activities() {
    const [activitiesList, setActivitiesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedActivityId, setSelectedActivityId] = useState(null);
    const [pageInfo, setPageInfo] = useState({
        currentPage: 1,
        pageSize: 10,
    });
    const [total, setTotal] = useState(0);

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
                            showDrawer(record.id);
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

    function showDrawer(id) {
        setOpen(true);
        setSelectedActivityId(id);
    }

    const onClose = () => {
        setOpen(false);
    };

    async function getActivitiesList(page = pageInfo.currentPage, pageSize = 10) {
        try {
            setLoading(true);
            const data = await getActivitiesServer({
                page: page,
                pageSize: pageSize
            });
            setTotal(data.total);
            const activitiesListWithKeys = data.data.map((item, index) => {
                return {
                    ...item,
                    key: index
                };
            });
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

    const handleTableChange = (page, pageSize) => {
        setPageInfo({
            currentPage: page,
            pageSize: pageSize
        })
        getActivitiesList(page, pageSize);
    };

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
                    pagination={false}
                />
                <div
                    style={{
                        marginTop: 20,
                        display: "flex",
                        justifyContent: "end",
                    }}
                >
                    <Pagination
                        style={{marginTop: 16, textAlign: 'right'}}
                        current={pageInfo.currentPage}
                        pageSize={pageInfo.pageSize}
                        total={total}
                        onChange={handleTableChange}
                    />
                </div>
            </div>
            {selectedActivityId && <Details id={selectedActivityId} type={"活动"} open={open} onClose={onClose}/>}
        </>
    );
}
