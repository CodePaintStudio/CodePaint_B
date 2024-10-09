import React, {useState, useRef, useEffect} from 'react'
import {Form, Input, Upload, Button, message, Row, Col, Select, Space} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import RichEditor from "../components/RichEditor"
import {getBlogTypeListServer, submitBlogServer} from '../api/Blog.js'
import {baseURL} from "../utils/baseURL.js"

export default function BlogAdd() {
    const [form] = Form.useForm()
    const richEditorRef = useRef(null)
    const [coverImage, setCoverImage] = useState(null)
    const [fileList, setFileList] = useState([])
    const [blogTypeList, setBlogTypeList] = useState([])
    const [addItem, setAddItem] = useState(null)

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

    const onFinish = async (values) => {
        if (!richEditorRef.current.isSaved()) {
            message.warning("请先保存内容，保存后再提交")
            return
        }

        const content = richEditorRef.current.getContent()

        if (!content || content === "<p><br></p>") {
            message.warning("请输入内容！")
            return
        }

        const payload = {
            articleTitle: values.articleTitle,
            articleContent: content,
            articleAuthor: values.articleAuthor,
            articlelookCount: 0,
            articleType: values.articleType,
            articleInfo: values.articleInfo,
            articleImgUrl: coverImage ? coverImage : "uploads/1727179044831-1280X1280.PNG"
        }

        try {
            const response = await submitBlogServer(payload)
            if (response && response.code === 200) {
                message.success('提交成功！')
                form.resetFields()
                richEditorRef.current.clearContent()
                setCoverImage(null)
                setFileList([])
            } else {
                message.error(`提交失败：${response?.data?.message || '未知错误'}`)
                console.error('提交失败:', response)
            }
        } catch (error) {
            message.error(`提交时发生错误：${error.message || '未知错误'}`)
            console.error('提交错误:', error)
        }
    }

    function handleNewTypeChange(e) {
        setAddItem(e.target.value)
    }

    const handleChange = async (info) => {
        const {file, fileList} = info
        setFileList(fileList)

        if (file.status === 'done') {
            const fileUrl = file.response.data.data
            console.log(fileUrl);
            setCoverImage(fileUrl)
            message.success(`${file.name} 文件上传成功`)
        } else if (file.status === 'error') {
            message.error(`${file.name} 文件上传失败`)
        }
    }

    const customRequest = async ({file, onSuccess, onError}) => {
        const isImage = file.type.startsWith('image/')
        if (!isImage) {
            message.error('只能上传图片文件!')
            onError(new Error('只能上传图片文件!'))
            return
        }

        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('图片必须小于2MB!')
            onError(new Error('图片必须小于2MB!'))
            return
        }

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch(`${baseURL}/upload/photo`, {
                method: 'POST',
                body: formData,
                headers: {
                    authorization: 'authorization-text',
                },
            })

            if (!response.ok) {
                throw new Error('上传失败')
            }
            const result = await response.json()
            onSuccess(result, file)
        } catch (error) {
            onError(error)
        }
    }

    const handleAddNewType = () => {
        setBlogTypeList([
            ...blogTypeList,
            {
                value: addItem,
                label: addItem
            }
        ])
        setAddItem("")
    };

    useEffect(() => {
        getBlogTypeList()
    }, []);

    return (
        <div style={{overflow: "auto"}}>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Row>
                    <Col span={6}>
                        <Form.Item
                            name="articleTitle"
                            label="标题"
                            rules={[{required: true, message: '请输入标题'}]}
                            style={{flex: 1, marginRight: '10px'}}
                        >
                            <Input placeholder="请输入标题"/>
                        </Form.Item>
                    </Col>
                    <Col
                        span={6}
                        push={1}
                    >
                        <Form.Item
                            name="articleAuthor"
                            label="作者"
                            rules={[{required: true, message: '请输入作者'}]}
                            style={{flex: 1}}
                        >
                            <Input placeholder="请输入作者"/>
                        </Form.Item>
                    </Col>
                    <Col
                        span={6}
                        push={2}
                    >
                        <Form.Item
                            name="articleType"
                            label="类型"
                            rules={[{required: true, message: '请选择类型'}]}
                        >
                            <Select
                                defaultValue={"全部"}
                                placeholder={"请选择类型"}
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Space
                                            style={{
                                                marginTop: 8,
                                                padding: '0 8px 4px',
                                            }}
                                        >
                                            <Input
                                                placeholder="请输入新增类型"
                                                value={addItem}
                                                onChange={handleNewTypeChange}
                                                onKeyDown={(e) => e.stopPropagation()}
                                            />
                                            <Button type="primary" icon={<PlusOutlined/>} onClick={handleAddNewType}>
                                                新增类型
                                            </Button>
                                        </Space>
                                    </>
                                )}
                                options={blogTypeList}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={6}>
                        <Form.Item
                            name="articleInfo"
                            label="文章简介"
                            rules={[{required: true, message: '请输入文章简介'}]}
                        >
                            <Input.TextArea rows={4} placeholder="请输入文章简介~"/>
                        </Form.Item>
                    </Col>
                    <Col span={2} push={1}>
                        <Form.Item
                            name="coverImage"
                            label="封面图片"
                            style={{flex: 1}}
                            rules={[{required: true, message: "请选择封面图片"}]}
                        >
                            <Upload
                                accept="image/*"
                                name='file'
                                fileList={fileList}
                                onChange={handleChange}
                                customRequest={customRequest}
                                listType="picture-card"
                                maxCount={1}
                            >
                                {fileList.length === 0 && (
                                    <div>
                                        <PlusOutlined/>
                                        <div style={{marginTop: 8}}>上传</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={6} push={2}>
                        <Form.Item
                            style={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <Button type="primary" htmlType="submit" style={{
                                height: 96,
                                width: 192,
                                fontSize: "x-large",
                                fontWeight: "bold"
                            }}>
                                提交文章
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="内容" required>
                            <RichEditor ref={richEditorRef}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
