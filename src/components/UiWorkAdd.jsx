'use client'

import React, { useState } from 'react'
import { Form, Input, Upload, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { submitUiServer } from '../api/uiWork.js'
import { baseURL } from "../utils/baseURL.js"

export default function UiWorkAdd() {
  const [form] = Form.useForm()
  const [coverImage, setCoverImage] = useState(null)
  const [fileList, setFileList] = useState([])
  const [workTagsList, setWorkTagsList] = useState([])

  const onFinish = async (values) => {
    const payload = {
      workTitle: values.workTitle,
      workTags: workTagsList.map(file => file.response?.data?.data || file.url),
      workAuthor: values.workAuthor,
      workLookCount: 0,
      workType: values.workType,
      workDescription: values.workDescription,
      workCover: coverImage || "uploads/1727179044831-1280X1280.PNG"
    }

    try {
      const response = await submitUiServer(payload)
      if (response && response.code === 200) {
        message.success('提交成功！')
        form.resetFields()
        setCoverImage(null)
        setFileList([])
        setWorkTagsList([])
      } else {
        message.error(`提交失败：${response?.data?.message || '未知错误'}`)
      }
    } catch (error) {
      message.error(`提交时发生错误：${error.message || '未知错误'}`)
    }
  }

  const handleCoverChange = async (info) => {
    const { file, fileList } = info
    setFileList(fileList)
    
    if (file.status === 'done') {
      const fileUrl = file.response.data.data
      setCoverImage(fileUrl)
      message.success(`${file.name} 文件上传成功`)
    } else if (file.status === 'error') {
      message.error(`${file.name} 文件上传失败`)
    }
  }

  const handleWorkTagsChange = ({ fileList }) => {
    setWorkTagsList(fileList)
  }

  const customRequest = async ({ file, onSuccess, onError }) => {
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
    <div style={{ height: "calc(100vh - 48px)", overflow: "auto", padding: '20px' }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Form.Item
            name="workTitle"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
            style={{ flex: 1, marginRight: '10px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="workAuthor"
            label="作者"
            rules={[{ required: true, message: '请输入作者' }]}
            style={{ flex: 1 }}
          >
            <Input />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
          <Form.Item
            name="workDescription"
            label="文章简介"
            rules={[{ required: true, message: '请输入文章简介' }]}
            style={{ flex: 1, marginRight: '10px' }}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="coverImage"
            label="封面图片"
            style={{ flex: 1 }}
          >
            <Upload
              accept="image/*"
              name='file'
              fileList={fileList}
              onChange={handleCoverChange}
              customRequest={customRequest}
              listType="picture-card"
              maxCount={1}
            >
              {fileList.length === 0 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>上传</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </div>
        <Form.Item
          name="workType"
          label="类型"
          rules={[{ required: true, message: '请选择类型' }]}
          style={{ marginBottom: '16px' }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="workTags"
          label="作品集"
          rules={[{ required: true, message: '请上传至少一张作品图片' }]}
          style={{ marginBottom: '16px' }}
        >
          <Upload
            accept="image/*"
            name='file'
            fileList={workTagsList}
            onChange={handleWorkTagsChange}
            customRequest={customRequest}
            listType="picture-card"
            multiple
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>上传作品</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}