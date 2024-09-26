import React, { useState, useRef } from 'react';
import { Tabs, Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import '@toast-ui/editor/dist/toastui-editor.css';
import RichEditor from "../components/RichEditor";
import axios from 'axios';
const { TabPane } = Tabs;
const { Option } = Select;

const AddArticles = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [form] = Form.useForm();
  const richEditorRef = useRef();

  const handleTabChange = (key) => {
    setActiveTab(key);
    form.resetFields();
  };

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

    const payload = { ...values, content };

    try {
      let response;
      if (activeTab === '1') {
        // 博客接口
        response = await axios.post('/api/blog', payload);
      } else if (activeTab === '2') {
        // UI作品接口
        response = await axios.post('/api/ui-work', payload);
      } else if (activeTab === '3') {
        // 活动接口
        response = await axios.post('/api/event', payload);
      }

      if (response.status === 200) {
        message.success('提交成功！');
        form.resetFields();
        richEditorRef.current.clearContent(); 
      }
    } catch (error) {
      message.error('提交失败，请重试！');
      console.error('Error submitting form:', error);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error(`${file.name} 不是图片文件`);
      }
      return isImage || Upload.LIST_IGNORE;
    },
  };

  return (
    <div style={{height:"calc(100vh - 48px)" ,overflow:"auto"}}>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="博客" key="1">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item name="title" label="标题" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="author" label="作者" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="type" label="类型" rules={[{ required: true }]}>
              <Select>
                <Option value="技术">技术</Option>
                <Option value="设计">设计</Option>
                <Option value="其他">其他</Option>
              </Select>
            </Form.Item>
            <Form.Item label="内容">
              <RichEditor ref={richEditorRef} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="UI作品" key="2">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item name="name" label="作品名称" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="author" label="作者" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="cover" label="展板" rules={[{ required: true }]}>
              <Upload {...uploadProps} listType="picture-card">
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>上传展板</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item name="introduction" label="简介" rules={[{ required: true }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="内容">
              <RichEditor ref={richEditorRef} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="活动" key="3">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item name="title" label="标题" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="author" label="作者" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="简介" rules={[{ required: true }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="cover" label="封面" rules={[{ required: true }]}>
              <Upload {...uploadProps} listType="picture-card">
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>上传封面</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label="内容">
              <RichEditor ref={richEditorRef} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AddArticles;