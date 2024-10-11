import {useState, useEffect} from "react";
import {sleep, toLocalDate} from "../utils/tools.js";

import BlogSearch from './BlogSearch.jsx';
import {message, Popconfirm, Space, Table, Pagination} from "antd";
import Details from "./Details.jsx";

import {
    deleteArticleServer,
    searchBlogServer
} from "../api/Blog.js"

export default function Blog() {
    const [blogList, setBlogList] = useState([]);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [pageInfo, setPageInfo] = useState({
        page: 1,
        pageSize: 10,
    });
    const [total, setTotal] = useState(0);

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
            key: "articleLookCount"
        },
        {
            title: "发布时间",
            dataIndex: "articleCreatedTime",
            key: "articleCreatedTime"
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
                            showDrawer(record.articleId);
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
        setSelectedBlogId(id);
    };
    const onClose = () => {
        setOpen(false);
    };

    async function getArticleList(page = pageInfo.page, pageSize = pageInfo.pageSize) {
        try {
            setLoading(true);
            const data = await searchBlogServer({
                page: page,
                pageSize: pageSize
            });
            const articleListWithKeys = data.data.map((item, index) => {
                return {
                    ...item,
                    key: index,
                    articleCreatedTime: toLocalDate(item.articleCreatedTime),
                };
            });
            setBlogList(articleListWithKeys);
            setTotal(data.total);
        } catch {
            message.error("获取博客列表失败");
        } finally {
            setLoading(false);
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

    const handleTableChange = (page, pageSize) => {
        setPageInfo({
            ...pageInfo,
            page: page,
            pageSize: pageSize
        });
        getArticleList(page, pageSize);
    };

    useEffect(() => {
        getArticleList();
    }, []);

    return (
        <>
            <div>
                <BlogSearch
                    setTotal={setTotal}
                    setPageInfo={setPageInfo}
                    setBlogList={setBlogList}
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
                    dataSource={blogList}
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
                        current={pageInfo.page}
                        pageSize={pageInfo.pageSize}
                        total={total}
                        onChange={handleTableChange}
                    />
                </div>
            </div>
            {selectedBlogId && <Details id={selectedBlogId} type={"博客"} open={open} onClose={onClose}/>}
        </>
    );
}
