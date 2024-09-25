import React, { useState, useEffect } from 'react';
import { Layout, Typography, Table, Space, Button, message } from 'antd';
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;

const HandleAdd = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        key: '1',
        name: '响应式布局设计',
        author: '张三',
        type: '前端文章',
        publishTime: '2023-09-25',
        status: '已处理',
      },
      {
        key: '2',
        name: '用户界面原型',
        author: '李四',
        type: 'UI作品',
        publishTime: '2023-09-26',
        status: '未处理',
      },
      {
        key: '3',
        name: '技术分享会',
        author: '王五',
        type: '活动',
        publishTime: '2023-09-27',
        status: '未处理',
      },
      // 可以添加更多数据以便测试滚动
      // 添加更多以增加高度
    ];
    setWorks(mockData);
  }, []);

  const handleDelete = (key) => {
    setWorks(works.filter(work => work.key !== key));
    message.success('作品已删除');
  };

  const handleDetails = (key) => {
    message.info(`查看作品详情：${key}`);
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ color: status === '已处理' ? 'green' : 'red' }}>
          {status}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<InfoCircleOutlined />} 
            onClick={() => handleDetails(record.key)}
          >
            详情
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.key)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', background: '#fff' }}>
        <Title level={2}>作品管理</Title>
        <div style={{ maxHeight: '800px', overflow: 'auto' }}> {/* 设置固定高度并使滚动条生效 */}
          <Table 
            columns={columns} 
            dataSource={works} 
            rowKey="key"
            pagination={false}
            style={{ width: '100%' }} 
          />
        </div>
      </Content>
    </Layout>
  );
};

export default HandleAdd;
