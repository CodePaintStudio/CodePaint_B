import React, { useState } from 'react';
import { Tabs, Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import RichEditor from "../components/RichEditor.jsx";

const { TabPane } = Tabs;
const { Option } = Select;

const WorkManagement = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [form] = Form.useForm();

  const handleTabChange = (key) => {
    setActiveTab(key);
    form.resetFields();
  };

  const onFinish = (values) => {
    const content = document.querySelector('.toastui-editor-contents')?.innerHTML;
    console.log({ ...values, content });
    message.success('提交成功！');
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
        <TabPane tab="博客" key="1" style={{height:''}}>
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
            <Form.Item name="content" label="内容" rules={[{ required: true }]}>
              <RichEditor/>
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
            <Form.Item name="showcase" label="内容" rules={[{ required: true }]}>
                <RichEditor/>
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
            <Form.Item name="content" label="内容" rules={[{ required: true }]}>
            <RichEditor/>
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

export default WorkManagement;