import dayjs from "dayjs";
import {useState, useEffect} from "react";
import {clearObj, sleep} from "../utils/tools.js";
import moment from "moment";

import SearchForm from './BlogSearch.jsx';
import BlogDetail from "./BlogDetail.jsx";
import {message, Popconfirm, Space, Table} from "antd";

import {
    getArticleListServer,
    deleteArticleServer,
    getBlogListByTypeServer
} from "../api/articelsCate.js"

export default function Blog() {
    const [blogList, setBlogList] = useState([]);
    const [selectedBlogId, setSelectedBlogId] = useState(null); // 添加状态
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const columns = [
        {
            title: "名称",
            dataIndex: "articleTitle",
            key: "articleTitle"
        },
        {
            title: "作者",
            dataIndex: "articleAuthor",
            key: "articleAuthor"
        },
        {
            title: "类型",
            dataIndex: "articleType",
            key: "articleType",
        },
        {
            title: "浏览量",
            dataIndex: "articleLookCount",
            sorter: (a, b) => a - b,
            key: "articleLookCount"
        },
        {
            title: "发布时间",
            dataIndex: "articleCreatedTime",
            key: "articleCreatedTime",
            sorter: (a, b) => a - b
        },
        {
            title: "ID",
            dataIndex: "articleId",
            key: "articleId",
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
                            showDrawer(record.articleId)
                        }}
                    >
                        详情
                    </a>
                    <Popconfirm
                        title="警告"
                        description="是否要删除"
                        onConfirm={() => {
                            deleteArticle(record.articleId)
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
        setSelectedBlogId(id)
    };
    const onClose = () => {
        setOpen(false);
    };

    async function getArticleList() {
        try {
            setLoading(true)
            const data = await getArticleListServer();
            const articleListWithKeys = data.data.map((item, index) => {
                return {
                    ...item,
                    key: index,
                    articleCreatedTime: moment(item.articleCreatedTime).local().format("YYYY-MM-DD HH:mm:ss"),
                };
            });
            setBlogList(articleListWithKeys);
        } catch {
            message.error("获取列表失败");
        } finally {
            setLoading(false)
        }

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
            sleep(1000).then(() => {
                getArticleList();
            })
        }
    }

    async function getBlogListByType(type) {
        try {
            setLoading(true)
            const data = await getBlogListByTypeServer(type)
            const articleListWithKeys = data.data.map((item, index) => {
                return {
                    ...item,
                    key: index,
                    articleCreatedTime: moment(item.articleCreatedTime).local().format("YYYY-MM-DD HH:mm:ss"),
                };
            });
            setBlogList(articleListWithKeys);
        } catch {
            message.warning("查询失败");
        } finally {
            setLoading(false)
        }
    }

    function handleSubmit(values) {
        values = clearObj(values);
        if (values.publishTime) values.publishTime = dayjs(values.publishTime).format("YYYY-MM-DD");
        if (!Object.keys(values).length) return message.warning("请补全查询条件");

        /*TODO: 搜索提交*/
        if (values.type) {
            getBlogListByType(values.type)
        }
    }

    useEffect(() => {
        getArticleList();
    }, []);

    return (
        <>
            <div>
                <SearchForm
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
                    dataSource={blogList}
                    columns={columns}
                />
            </div>
            <BlogDetail onClose={onClose} open={open} selectedBlogId={selectedBlogId}/>
        </>
    );
}
