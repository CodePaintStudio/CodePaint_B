import React, { useState, useEffect } from 'react'
import { Layout, Typography, Table, Space, Button, message, Modal } from 'antd'
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { baseURL } from "../utils/baseURL.js"

const { Content } = Layout
const { Title } = Typography

export default function HandleAdd() {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(false)
  const [detailsModalVisible, setDetailsModalVisible] = useState(false)
  const [currentDetails, setCurrentDetails] = useState(null)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })

  const fetchWorks = async (page = 1, pageSize = 10) => {
    setLoading(true)
    try {
      const response = await fetch(`${baseURL}/details?page=${page}&pageSize=${pageSize}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setWorks(data.items)
      setPagination({
        ...pagination,
        current: page,
        total: data.total
      })
      message.success('获取作品列表成功')
    } catch (error) {
      console.error('Error fetching works:', error)
      message.error('获取作品列表失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorks()
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseURL}/details/delete?id=${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Delete failed')
      setWorks(works.filter(work => work.id !== id))
      message.success('作品已成功删除')
    } catch (error) {
      console.error('Error deleting work:', error)
      message.error('删除作品失败')
    }
  }

  const handleDetails = async (id) => {
    try {
      const response = await fetch(`${baseURL}/details/get?id=${id}`)
      if (!response.ok) throw new Error('Failed to fetch details')
      const details = await response.json()
      setCurrentDetails(details)
      setDetailsModalVisible(true)
      message.success('成功获取作品详情')
    } catch (error) {
      console.error('Error fetching work details:', error)
      message.error('获取作品详情失败')
    }
  }

  const handleTableChange = (pagination) => {
    fetchWorks(pagination.current, pagination.pageSize)
  }

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
      title: '发布时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<InfoCircleOutlined />} 
            onClick={() => handleDetails(record.id)}
          >
            详情
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', background: '#fff' }}>
        <Title level={2}>申请处理</Title>
        <div style={{ maxHeight: '800px', overflow: 'auto' }}>
          <Table 
            columns={columns} 
            dataSource={works} 
            rowKey="id"
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            style={{ width: '100%' }} 
          />
        </div>
        <Modal
          title="作品详情"
          visible={detailsModalVisible}
          onCancel={() => setDetailsModalVisible(false)}
          footer={null}
        >
          {currentDetails && (
            <div>
              <p><strong>名称:</strong> {currentDetails.name}</p>
              <p><strong>作者:</strong> {currentDetails.author}</p>
              <p><strong>发布时间:</strong> {currentDetails.publishTime}</p>
              {/* 可以根据需要添加更多详细信息 */}
            </div>
          )}
        </Modal>
      </Content>
    </Layout>
  )
}