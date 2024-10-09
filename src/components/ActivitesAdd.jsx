import React, {useState, useRef} from 'react'
import {Form, Input, Upload, Button, message, Row, Col} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import RichEditor from "../components/RichEditor"
import {submitActivityServer} from '../api/activity.js'
import {baseURL} from "../utils/baseURL.js"

export default function ActivitesAdd() {
    const [form] = Form.useForm()
    const richEditorRef = useRef(null)
    const [coverImage, setCoverImage] = useState(null)
    const [fileList, setFileList] = useState([])

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
            title: values.title,
            content: content,
            creator: values.creator,
            // activityLookCount: 0,
            intro: values.intro,
            picture: coverImage ? coverImage : "uploads/1727179044831-1280X1280.PNG"
        }

        try {
            const response = await submitActivityServer(payload)
            // console.log(response.code);
            if (response) {
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

    return (
        <div style={{overflow: "auto"}}>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Row>
                    <Col span={6}>
                        <Form.Item
                            name="title"
                            label="活动标题"
                            rules={[{required: true, message: '请输入活动标题'}]}
                            style={{flex: 1, marginRight: '10px'}}
                        >
                            <Input placeholder={"请输入活动标题"}/>
                        </Form.Item>
                    </Col>
                    <Col span={6} push={1}>
                        <Form.Item
                            name="creator"
                            label="作者"
                            rules={[{required: true, message: '请输入作者'}]}
                            style={{flex: 1}}
                        >
                            <Input placeholder={"请输入作者【默认为活动撰写者】"}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Form.Item
                            name="intro"
                            label="活动简介"
                            rules={[{required: true, message: '请输入活动简介'}]}
                            style={{flex: 1, marginRight: '10px'}}
                        >
                            <Input.TextArea rows={4} placeholder={"请输入活动简介"}/>
                        </Form.Item>
                    </Col>
                    <Col span={4} push={1}>
                        <Form.Item
                            name="coverImage"
                            label="活动封面"
                            style={{flex: 1}}
                            rules={[{required: true, message: "请选择活动封面图片"}]}
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
                    <Col span={6}>
                        <Form.Item
                            style={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <Button type="primary" htmlType="submit" style={{
                                width: 192,
                                height: 96,
                                fontSize: "large",
                                fontWeight: "bold"
                            }}>
                                提交活动记录
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="活动内容" required>
                            <RichEditor ref={richEditorRef}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
