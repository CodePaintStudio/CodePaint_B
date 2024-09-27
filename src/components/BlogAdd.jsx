import React, { useState, useRef } from 'react';
import { Form, Input, Select, Upload, Button, message, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import '@toast-ui/editor/dist/toastui-editor.css';
import RichEditor from "../components/RichEditor";
import { submitBlogServer } from '../api/Blog';

export default function BlogAddd() {
  const [form] = Form.useForm();
  const richEditorRef = useRef(null);
  const [coverImage, setCoverImage] = useState(null);

  const onFinish = async (values) => {
    if (!richEditorRef.current.isSaved()) {
      message.warning("请先保存内容，保存后再提交");
      return;
    }

    const content = richEditorRef.current.getContent();

    if (!content || content === "<p><br></p>") {
      message.warning("请输入内容！");
      return;
    }

    const payload = {
      articleTitle: values.articleTitle,
      articleContent: content,
      articleAuthor: values.articleAuthor,
      articlelookCount: values.articlelookCount || 0,
      articleType: values.articleType || "Vue",
      articleImgUrl: coverImage? coverImage.url : "uploads/1727179044831-1280X1280.PNG"
    };

    try {
      const response = await submitBlogServer(payload);
      console.log(response);

      if (response && response.code === 200) {
        message.success('提交成功！');
        form.resetFields();
        richEditorRef.current.clearContent();
        setCoverImage(null);
      } else {
        console.log(1111);

        message.error(`提交失败：${response?.data?.message || '未知错误'}`);
        console.error('提交失败:', response);
      }
    } catch (error) {
      message.error(`提交时发生错误：${error.message || '未知错误'}`);
      console.error('提交错误:', error);
    }
  };

  const handleCoverUpload = (info) => {
    const { status } = info.file;
    if (status === 'done') {
      setCoverImage({
        url: info.file.response.url,
        name: info.file.name,
      });
      message.success(`${info.file.name} 上传成功`);
    } else if (status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  return (
    <div style={{ height: "calc(100vh - 48px)", overflow: "auto" }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Item
            name="articleTitle"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
            style={{ flex: 1, marginRight: '10px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="articleAuthor"
            label="作者"
            rules={[{ required: true, message: '请输入作者' }]}
            style={{ flex: 1 }}
          >
            <Input />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Item
            name="articleType"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
            style={{ flex: 1, marginRight: '10px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cover"
            label="封面图片"
            rules={[{ required: true, message: '请上传封面图片' }]}
            style={{ flex: 1 }}
          >
            <Upload
              name="file"
              action="https://mock.apipost.net/mock/327765a2c464000/upload/photo?apipost_id=3843e7b372c01a"
              onChange={handleCoverUpload}
              maxCount={1}
              listType="picture-card"
            >
              {coverImage? null : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>上传封面</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </div>
        {coverImage && (
          <Form.Item label="封面预览">
            <Image
              src={coverImage.url}
              alt="封面预览"
              style={{ maxWidth: '100%', maxHeight: '200px' }}
            />
          </Form.Item>
        )}
        <Form.Item label="内容" required>
          <RichEditor ref={richEditorRef} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}