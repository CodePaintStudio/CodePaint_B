import {Drawer, Descriptions, Image, Card} from "antd";
import {useEffect, useState} from "react";
import parse from 'html-react-parser';

import {
    getActivityByIdServer
} from "../api/activity.js";
import {
    getWorkDetailServer
} from "../api/uiWork.js";
import {
    getBlogDetailByIdServer
} from "../api/Blog.js"
import {toLocalDate} from "../utils/tools.js";
import {baseURL} from "../utils/baseURL.js";


export default function Details({id, type, open, onClose}) {
    const [detailData, setDetailData] = useState({});

    async function getActivityById(activityId) {
        const data = await getActivityByIdServer(activityId);
        setDetailData(data.data)
    }

    async function getBlogById(blogId) {
        const data = await getBlogDetailByIdServer(blogId);
        setDetailData(data.data[0])
    }

    async function getWorkById(activityId) {
        const data = await getWorkDetailServer(activityId)
        setDetailData(data.data[0])
    }

    const CustomImage = ({src, alt, ...props}) => (
        <img
            src={src}
            alt={alt}
            style={{width: 'auto', height: '30vh'}}
            {...props}
        />
    );

    const parseContent = (content) => {
        const options = {
            replace: (domNode) => {
                if (domNode.name === 'img') {
                    return <CustomImage {...domNode.attribs} />;
                }
            }
        };

        return parse(content, options);
    };


    useEffect(() => {
        switch (type) {
            case "博客" : {
                getBlogById(id);
                break;
            }
            case "作品" : {
                getWorkById(id);
                break;
            }
            case "活动" : {
                getActivityById(id)
                break;
            }
        }
    }, [id])

    let description
    if (type && detailData) {
        switch (type) {
            case "博客": {
                description = (
                    <>
                        <Descriptions
                            bordered
                            title={detailData.articleTitle}
                            column={2}
                        >
                            <Descriptions.Item label="ID">{detailData.articleId}</Descriptions.Item>
                            <Descriptions.Item label="标题">{detailData.articleTitle}</Descriptions.Item>
                            <Descriptions.Item label="作者">{detailData.articleAuthor}</Descriptions.Item>
                            <Descriptions.Item label="分类">{detailData.articleType}</Descriptions.Item>
                            <Descriptions.Item
                                label="发布时间">{toLocalDate(detailData.articleCreatedTime)}</Descriptions.Item>
                            <Descriptions.Item label="阅读量">{detailData.articleLookCount}</Descriptions.Item>
                            <Descriptions.Item label="封面">
                                <Image
                                    width={200}
                                    src={baseURL + "/" + detailData.articleImgUrl}
                                    fallback={"https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"}
                                />
                            </Descriptions.Item>
                            <Descriptions.Item
                                lable="简介"
                            >
                                {detailData.articleInfo}
                            </Descriptions.Item>
                        </Descriptions>
                        <Card
                            title="博客内容详情"
                            style={{
                                marginTop: "5vh",
                            }}>
                            {typeof detailData.articleContent === 'string' && parseContent(detailData.articleContent)}
                        </Card>
                    </>
                );
                break;
            }
            case "作品" : {
                description = (
                    <>
                        <Descriptions
                            bordered
                            title={detailData.workTitle}
                            column={2}
                        >
                            <Descriptions.Item label="ID">{detailData.workId}</Descriptions.Item>
                            <Descriptions.Item label="标题">{detailData.workTitle}</Descriptions.Item>
                            <Descriptions.Item label="作者">{detailData.workAuthor}</Descriptions.Item>
                            <Descriptions.Item
                                label="创建时间">{toLocalDate(detailData.workCreateTime)}</Descriptions.Item>
                            <Descriptions.Item label="阅读量">{detailData.workLookCount}</Descriptions.Item>
                            <Descriptions.Item label="分类">{detailData.workType}</Descriptions.Item>
                            <Descriptions.Item label="描述">{detailData.workDescription}</Descriptions.Item>
                            <Descriptions.Item label="封面">
                                <Image
                                    width={200}
                                    src={baseURL + "/" + detailData.workCover}
                                    fallback={"https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"}
                                />
                            </Descriptions.Item>
                        </Descriptions>
                        <Card
                            title="作品展图"
                            style={{
                                marginTop: "5vh",
                            }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "space-around",
                                }}
                            >
                                {detailData.workTags?.map((tag, index) => {
                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                width: "45%",
                                                padding: "2.5%",
                                                backgroundColor: "rgba(225, 238, 237, 0.8)",
                                                borderRadius: "5%",
                                                marginBottom: "2.5%"
                                            }}
                                        >
                                            <Image
                                                key={index}
                                                width={"100%"}
                                                src={baseURL + "/" + tag}
                                                fallback={"https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </Card>
                    </>
                );
                break;
            }
            case "活动": {
                description = (
                    <>
                        <Descriptions
                            bordered
                            title={detailData.title}
                            column={2}
                        >
                            <Descriptions.Item label="ID">{detailData.id}</Descriptions.Item>
                            <Descriptions.Item label="标题">{detailData.title}</Descriptions.Item>
                            <Descriptions.Item label="作者">{detailData.creator}</Descriptions.Item>
                            <Descriptions.Item
                                label="创建时间"
                            >
                                {toLocalDate(detailData.createdAt)}
                            </Descriptions.Item>
                            <Descriptions.Item label="描述">{detailData.intro}</Descriptions.Item>
                            <Descriptions.Item label="封面">
                                <Image
                                    width={200}
                                    src={baseURL + "/" + detailData.picture}
                                    fallback={"https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"}
                                />
                            </Descriptions.Item>
                        </Descriptions>
                        <Card
                            title="活动内容详情"
                            style={{
                                marginTop: "5vh",
                            }}>
                            {typeof detailData.content === 'string' && parseContent(detailData.content)}
                        </Card>
                    </>
                )
            }
        }
    }

    return (
        <Drawer
            height={"100%"}
            placement="bottom"
            closable={true}
            open={open}
            onClose={onClose}
            maskClosable={false}
            title={type + "详情"}
        >
            {description}
        </Drawer>
    )
}
