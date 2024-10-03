import dayjs from "dayjs";
import {useState, useEffect} from "react";
import {clearObj, sleep, toLocalDate} from "../utils/tools.js";

import UiSearch from './UiSearch.jsx';
import Details from "./Details.jsx";
import {message, Popconfirm, Space, Table, Pagination} from "antd";

import {
    getWorkListServer,
    searchWorkServer,
    deleteWorkServer
} from "../api/uiWork.js"

export default function UiWork() {
    const [uiWorkList, setUiWorkList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedWorkId, setSelectedWorkId] = useState(null);
    const [pageInfo, setPageInfo] = useState({
        page: 1,
        pageSize: 10,
    });
    const [total, setTotal] = useState(0);

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
            sorter: (a, b) => a - b,
            key: "workLookCount"
        },
        {
            title: "类型",
            dataIndex: "workType",
            key: "workType",
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
                            showDrawer(record.workId)
                        }}
                    >
                        详情
                    </a>
                    <Popconfirm
                        title="警告"
                        description="是否要删除"
                        onConfirm={() => {
                            deleteWork(record.workId)
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

    const showDrawer = (id) => {
        setOpen(true);
        setSelectedWorkId(id)
    };
    const onClose = () => {
        setOpen(false);
    };

    async function getWorkList(page = pageInfo.page, pageSize = pageInfo.pageSize) {
        try {
            setLoading(true);
            const data = await searchWorkServer({
                page: page,
                pageSize: pageSize
            });
            const workListWithKeys = data.data.map((item, index) => ({
                ...item,
                key: index,
            }));
            setUiWorkList(workListWithKeys);
            setTotal(data.total);
        } catch {
            message.error("获取作品列表失败");
        } finally {
            setLoading(false);
        }
    }

    async function deleteWork(id) {
        try {
            setLoading(true);
            await deleteWorkServer(id);
            message.success("删除成功");
        } catch (err) {
            message.error("删除失败");
        } finally {
            setLoading(false);
            sleep(1000).then(() => {
                getWorkList();
            });
        }
    }

    const handleTableChange = (page, pageSize) => {
        setPageInfo({
            ...pageInfo,
            page: page,
            pageSize: pageSize
        });
        getWorkList(page, pageSize);
    };

    useEffect(() => {
        getWorkList();
    }, [])


    return (
        <>
            <div>
                <UiSearch
                    setTotal={setTotal}
                    setPageInfo={setPageInfo}
                    setUiWorkList={setUiWorkList}
                    setLoading={setLoading}
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
                        y: 500,
                    }}
                    dataSource={uiWorkList}
                    columns={columns}
                    pagination={false}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "end",
                    }}
                >
                    <Pagination
                        style={{marginTop: 16, textAlign: 'right'}}
                        total={total}
                        current={pageInfo.page}
                        pageSize={pageInfo.pageSize}
                        onChange={handleTableChange}
                    />
                </div>
            </div>
            {selectedWorkId && <Details id={selectedWorkId} type={"作品"} open={open} onClose={onClose}/>}
        </>
    );
}
