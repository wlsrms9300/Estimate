import { useState } from 'react'
import { Layout, Typography, Input, Table, Space, Button, Checkbox, message } from 'antd'
import { SearchOutlined, FileTextOutlined, DeleteOutlined } from '@ant-design/icons'
import { estimateListStyles } from '../../styles/content/estimatelist.styles'
import { useNavigate } from 'react-router-dom'
// hooks
import { useGetEstimateList } from '../../hooks/content/estimateService'

const { Title } = Typography

interface Estimate {
    id: string
    title: string
    author: string
    createdAt: string
}

export default function EstimateList() {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const { data: estimateList, isLoading, error } = useGetEstimateList()

    // 임시 데이터 (실제로는 API에서 가져와야 함)
    const data: Estimate[] = [
        {
            id: '1',
            title: '2024년 1분기 웹 개발 견적서',
            author: '김철수',
            createdAt: '2024-01-15',
        },
        {
            id: '2',
            title: '모바일 앱 개발 견적서',
            author: '이영희',
            createdAt: '2024-01-20',
        },
    ]

    const handleBatchDelete = () => {
        if (selectedRowKeys.length === 0) {
            message.warning('삭제할 견적서를 선택해주세요.')
            return
        }
        // 실제로는 API 호출이 필요
        console.log('일괄 삭제:', selectedRowKeys)
        message.success(`${selectedRowKeys.length}개의 견적서가 삭제되었습니다.`)
        setSelectedRowKeys([])
    }

    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            align: 'center' as const,
        },
        {
            title: '견적서명',
            dataIndex: 'title',
            key: 'title',
            render: (text: string) => (
                <Space>
                    <FileTextOutlined />
                    {text}
                </Space>
            ),
        },
        {
            title: '작성자',
            dataIndex: 'author',
            key: 'author',
            width: 120,
        },
        {
            title: '작성일',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
        },
        {
            title: '',
            key: 'action',
            width: 120,
            render: (_: any, record: Estimate) => (
                <Space size="middle">
                    <Button type="link" onClick={() => navigate(`/so/edit/estimate/${record.id}`)}>
                        수정
                    </Button>
                    {/* <Button type="link" danger onClick={() => console.log('삭제', record.id)}>
                        삭제
                    </Button> */}
                </Space>
            ),
        },
    ]

    const filteredData = data.filter(
        (item) => item.title.toLowerCase().includes(searchText.toLowerCase()) || item.author.toLowerCase().includes(searchText.toLowerCase()),
    )

    return (
        <div className={estimateListStyles.contentContainer}>
            <div className={estimateListStyles.container}>
                <Title level={2} className={estimateListStyles.title}>
                    견적서 목록
                </Title>

                <div className={estimateListStyles.searchSection}>
                    <Input
                        placeholder="견적서명 또는 작성자로 검색"
                        prefix={<SearchOutlined />}
                        size="large"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={estimateListStyles.searchInput}
                    />
                    <Space>
                        {selectedRowKeys.length > 0 && <span className={estimateListStyles.selectedCount}>{selectedRowKeys.length}개 선택됨</span>}
                        <Button
                            type="primary"
                            danger
                            size="large"
                            icon={<DeleteOutlined />}
                            onClick={handleBatchDelete}
                            className={estimateListStyles.batchDeleteButton}>
                            일괄 삭제
                        </Button>
                    </Space>
                </div>

                <div className={estimateListStyles.tableContainer}>
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        rowSelection={{
                            selectedRowKeys,
                            onChange: (newSelectedRowKeys) => {
                                setSelectedRowKeys(newSelectedRowKeys)
                            },
                        }}
                        components={{
                            header: {
                                cell: (props: any) => <th {...props} className={`${props.className} ${estimateListStyles.tableHeader}`} />,
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
