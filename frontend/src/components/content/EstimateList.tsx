import { useState } from 'react'
import { Layout, Typography, Input, Table, Space, Button, Checkbox, message } from 'antd'
import { SearchOutlined, FileTextOutlined, DeleteOutlined } from '@ant-design/icons'
import { estimateListStyles } from '../../styles/content/estimatelist.styles'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
// hooks
import { useGetEstimateList, useDeleteEstimate } from '../../hooks/content/estimateService'
// types
import { EstimateListItem } from '../../types/content/estimate'

const { Title } = Typography

export default function EstimateList() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [searchText, setSearchText] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const { data: estimateList, isLoading } = useGetEstimateList()
    const { mutate: deleteEstimate } = useDeleteEstimate()

    /**
     * @function handleBatchDelete
     * @description 일괄 삭제
     */
    const handleBatchDelete = () => {
        if (selectedRowKeys.length === 0) {
            message.warning('삭제할 견적서를 선택해주세요.')
            return
        }

        deleteEstimate(selectedRowKeys.join(','), {
            onSuccess: (response) => {
                if (response.resultCd === 201) {
                    queryClient.invalidateQueries({ queryKey: ['estimateList'] })
                    setSelectedRowKeys([])
                }
            },
        })
    }

    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            align: 'center' as const,
            render: (_: any, record: EstimateListItem, index: number) => <span>{index + 1}</span>,
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
            title: '담당자',
            dataIndex: 'managerName',
            key: 'managerName',
            width: 120,
        },
        {
            title: '작성일',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            render: (_: any, record: EstimateListItem) => <span>{record.createdAt.split('T')[0]}</span>,
        },
        {
            title: '',
            key: 'action',
            width: 120,
            align: 'center' as const,
            render: (_: any, record: EstimateListItem) => (
                <Space size="middle">
                    <Button type="link" onClick={() => navigate(`/so/add/estimate`, { state: { estimateId: record.estimateId } })}>
                        수정
                    </Button>
                </Space>
            ),
        },
    ]

    const filteredData = estimateList?.filter(
        (item: any) => item.title.toLowerCase().includes(searchText.toLowerCase()) || item.author.toLowerCase().includes(searchText.toLowerCase()),
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
                        dataSource={estimateList}
                        rowKey="estimateId"
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
