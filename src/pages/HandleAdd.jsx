import React, {useState, useEffect} from 'react'
import {Layout, Table, Space, Button, message, Modal, Input} from 'antd'
import {DeleteOutlined, InfoCircleOutlined} from '@ant-design/icons'
import {baseURL} from "../utils/baseURL.js"
import {toLocalDate} from "../utils/tools.js";

const {Content} = Layout

export default function HandleAdd() {
    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(false)
    const [detailsModalVisible, setDetailsModalVisible] = useState(false)
    const [currentDetails, setCurrentDetails] = useState(null)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 100,
        total: 0
    })

    const fetchFeedbacks = async (page = 1, pageSize = 10) => {
        setLoading(true)
        try {
            const response = await fetch(`${baseURL}/details?page=${page}&pageSize=${pageSize}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            const detailsData = data.data;
            detailsData.data = detailsData.data.map((item, index) => {
                return {
                    ...item,
                    key: index,
                    updateTime: toLocalDate(item.updateTime),
                };
            })
            setFeedbacks(detailsData.data)

            setPagination({
                ...pagination,
                current: page,
                total: data.total
            })
        } catch (error) {
            message.error('获取反馈列表失败')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFeedbacks()
    }, [])

    const handleDelete = async (id) => {
        Modal.confirm({
            title: '确认删除',
            content: '您确定要删除这条反馈吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                try {
                    const response = await fetch(`${baseURL}/details/delete?id=${id}`, {method: 'DELETE'})
                    if (!response.ok) throw new Error('Delete failed')
                    setFeedbacks(feedbacks.filter(feedback => feedback.id !== id))
                    message.success('反馈已成功删除')
                } catch (error) {
                    message.error('删除反馈失败')
                }
            }
        });
    }

    const handleDetails = async (id) => {
        try {
            const response = await fetch(`${baseURL}/details/get?id=${id}`)
            if (!response.ok) throw new Error('Failed to fetch details')
            const details = await response.json()
            setCurrentDetails(details.data)
            setDetailsModalVisible(true)
        } catch (error) {
            message.error('获取反馈详情失败')
        }
    }

    const handleTableChange = (pagination) => {
        fetchFeedbacks(pagination.current, pagination.pageSize)
    }

    const columns = [
        {
            title: '联系方式',
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: '反馈类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: "反馈时间",
            dataIndex: 'updateTime',
            key: 'updateTime',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<InfoCircleOutlined/>}
                        onClick={() => handleDetails(record.id)}
                    >
                        查看详情
                    </Button>
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined/>}
                        onClick={() => handleDelete(record.id)}
                    >
                        删除记录
                    </Button>
                </Space>
            ),
        },
    ]

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Content style={{padding: 20, background: '#fff'}}>
                <div style={{maxHeight: 800, overflow: 'auto'}}>
                    <Table
                        columns={columns}
                        dataSource={feedbacks}
                        rowKey="id"
                        pagination={pagination}
                        loading={loading}
                        onChange={handleTableChange}
                        style={{width: '100%'}}
                    />
                </div>
                <Modal
                    title="反馈详情"
                    open={detailsModalVisible}
                    onCancel={() => setDetailsModalVisible(false)}
                    footer={null}
                >
                    {currentDetails && (
                        <Input.TextArea
                            value={currentDetails.content}
                            readOnly
                            rows={4}
                            style={{resize: 'none'}}
                        />
                    )}
                </Modal>
            </Content>
        </Layout>
    )
}
