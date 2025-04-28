import { useState, useEffect, useRef } from 'react'
import { Layout, Typography, Form, Input, Button, Table, Space, Flex, InputNumber, Tooltip, Row, Col } from 'antd'
import { PlusOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons'
import { addEstimateStyles } from '../../styles/content/addestimate.styles'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
// components
import PostCode from '../common/PostCode'
// hooks
import { useGetProfile } from '../../hooks/account/authService'
import { useCreateEstimate } from '../../hooks/content/estimateService'
// types
import { EstimateForm } from '../../types/content/estimate'

const { Title } = Typography

export default function AddEstimate() {
    const bottomRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const { data: profile } = useGetProfile()
    const { mutate: createEstimate } = useCreateEstimate()
    const { control, handleSubmit, watch, setValue } = useForm<EstimateForm>({
        defaultValues: {
            title: '견적서',
            items: [],
        },
        mode: 'onChange',
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    })

    /**
     * @function handlePostComplete
     * @description 주소 검색 완료 핸들러
     */
    const handlePostComplete = (data: any) => {
        setValue('postCode', data.zonecode)
        setValue('address', data.address)
        setValue('roadAddress', data.roadAddress)
        setValue('sido', data.sido)
        setValue('sigungu', data.sigungu)
        setValue('sigunguCode', data.sigunguCode)
        setValue('bName', data.bname)
        setValue('buildingName', data.buildingName)
    }

    /**
     * @function handleAddItem
     * @description 품목 추가 핸들러
     */
    const handleAddItem = () => {
        append({
            itemName: '',
            specification: '',
            unit: '',
            quantity: 0,
            unitPrice: 0,
            vat: 0,
            totalPrice: 0,
            memo: '',
        })
    }

    /**
     * @function onSubmit
     * @description 폼 제출 핸들러
     */
    const onSubmit = (data: EstimateForm) => {
        console.log('제출된 데이터:', data)
        createEstimate(data, {
            onSuccess: () => {
                navigate('/so/list/estimate')
            },
        })
    }

    const columns = [
        {
            title: 'No',
            key: 'index',
            width: 50,
            align: 'center' as const,
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: '품명',
            dataIndex: 'itemName',
            key: 'itemName',
            align: 'center' as const,
            render: (_: any, __: any, index: number) => (
                <Controller
                    name={`items.${index}.itemName`}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder="품명" className={addEstimateStyles.input} />}
                />
            ),
        },
        {
            title: '규격',
            dataIndex: 'specification',
            key: 'specification',
            align: 'center' as const,
            render: (_: any, __: any, index: number) => (
                <Controller
                    name={`items.${index}.specification`}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder="규격" className={addEstimateStyles.input} />}
                />
            ),
        },
        {
            title: '단위',
            dataIndex: 'unit',
            key: 'unit',
            align: 'center' as const,
            render: (_: any, __: any, index: number) => (
                <Controller
                    name={`items.${index}.unit`}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder="단위" className={addEstimateStyles.input} />}
                />
            ),
        },
        {
            title: '수량',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center' as const,
            render: (_: any, __: any, index: number) => (
                <Controller
                    name={`items.${index}.quantity`}
                    control={control}
                    render={({ field }) => (
                        <InputNumber
                            {...field}
                            placeholder="수량"
                            min={0}
                            className={`w-full ${addEstimateStyles.input}`}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ''))}
                        />
                    )}
                />
            ),
        },
        {
            title: '단가',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            align: 'center' as const,
            render: (_: any, __: any, index: number) => (
                <Controller
                    name={`items.${index}.unitPrice`}
                    control={control}
                    render={({ field }) => (
                        <InputNumber
                            {...field}
                            placeholder="단가"
                            min={0}
                            className={`w-full ${addEstimateStyles.input}`}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ''))}
                        />
                    )}
                />
            ),
        },
        {
            title: '세금(VAT)',
            dataIndex: 'vat',
            key: 'vat',
            align: 'center' as const,
            render: (_: any, __: any, index: number) => (
                <Controller
                    name={`items.${index}.vat`}
                    control={control}
                    render={({ field }) => (
                        <InputNumber
                            {...field}
                            placeholder="세금"
                            min={0}
                            className={`w-full ${addEstimateStyles.input}`}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ''))}
                        />
                    )}
                />
            ),
        },
        {
            title: '금액',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'center' as const,
            render: (_: any, __: any, index: number) => (
                <Controller
                    name={`items.${index}.totalPrice`}
                    control={control}
                    render={({ field }) => (
                        <InputNumber
                            {...field}
                            placeholder="금액"
                            min={0}
                            className={`w-full ${addEstimateStyles.input}`}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ''))}
                        />
                    )}
                />
            ),
        },
        {
            title: '비고',
            dataIndex: 'memo',
            key: 'memo',
            align: 'center' as const,
            render: (_: any, __: any, index: number) => (
                <Controller
                    name={`items.${index}.memo`}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder="비고" className={addEstimateStyles.input} />}
                />
            ),
        },
        {
            title: '',
            key: 'action',
            width: 50,
            align: 'center' as const,
            render: (_: any, __: any, index: number) => <CloseOutlined className={addEstimateStyles.deleteButton} onClick={() => remove(index)} />,
        },
    ]

    useEffect(() => {
        if (profile) {
            setValue('managerName', profile.userName)
            setValue('ceoName', profile.userName)
        }
    }, [profile])

    return (
        <div className={addEstimateStyles.contentContainer}>
            <div className={addEstimateStyles.container}>
                <Title level={2} className={addEstimateStyles.title}>
                    견적서 작성
                </Title>

                <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className={addEstimateStyles.formSection}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Controller
                                name="managerName"
                                control={control}
                                // rules={{ required: '담당자명을 입력해주세요' }}
                                render={({ field, fieldState: { error } }) => (
                                    <Form.Item
                                        label="담당자명"
                                        validateStatus={error ? 'error' : ''}
                                        help={error?.message}
                                        className={`${addEstimateStyles.formItem} ${addEstimateStyles.formItemError}`}>
                                        <Input {...field} size="large" placeholder="담당자명을 입력하세요" className={addEstimateStyles.input} />
                                    </Form.Item>
                                )}
                            />
                        </Col>
                        <Col span={12}>
                            <Controller
                                name="ceoName"
                                control={control}
                                // rules={{ required: '대표자명을 입력해주세요' }}
                                render={({ field, fieldState: { error } }) => (
                                    <Form.Item
                                        label="대표자명"
                                        validateStatus={error ? 'error' : ''}
                                        help={error?.message}
                                        className={`${addEstimateStyles.formItem} ${addEstimateStyles.formItemError}`}>
                                        <Input {...field} size="large" placeholder="대표자명을 입력하세요" className={addEstimateStyles.input} />
                                    </Form.Item>
                                )}
                            />
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={12}>
                            <Controller
                                name="companyName"
                                control={control}
                                // rules={{ required: '업체명을 입력해주세요' }}
                                render={({ field, fieldState: { error } }) => (
                                    <Form.Item
                                        label="업체명"
                                        validateStatus={error ? 'error' : ''}
                                        help={error?.message}
                                        className={`${addEstimateStyles.formItem} ${addEstimateStyles.formItemError}`}>
                                        <Input {...field} size="large" placeholder="업체명을 입력하세요" className={addEstimateStyles.input} />
                                    </Form.Item>
                                )}
                            />
                        </Col>
                        <Col span={12}>
                            <Controller
                                name="phone"
                                control={control}
                                // rules={{ required: '연락처를 입력해주세요' }}
                                render={({ field, fieldState: { error } }) => (
                                    <Form.Item
                                        label="연락처"
                                        validateStatus={error ? 'error' : ''}
                                        help={error?.message}
                                        className={`${addEstimateStyles.formItem} ${addEstimateStyles.formItemError}`}>
                                        <Input {...field} size="large" placeholder="연락처를 입력하세요" className={addEstimateStyles.input} />
                                    </Form.Item>
                                )}
                            />
                        </Col>
                    </Row>

                    <Form.Item label="업체주소" className={`${addEstimateStyles.formItem} ${addEstimateStyles.formItemError}`}>
                        <Row gutter={8}>
                            <Col span={6}>
                                <Controller
                                    name="postCode"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <Input
                                            {...field}
                                            readOnly
                                            size="large"
                                            placeholder="우편번호"
                                            className={addEstimateStyles.input}
                                            onClick={() => setIsOpen(true)}
                                        />
                                    )}
                                />
                            </Col>
                            <Col span={9}>
                                <Controller
                                    name="address"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <Input
                                            {...field}
                                            readOnly
                                            size="large"
                                            placeholder="주소"
                                            className={addEstimateStyles.input}
                                            onClick={() => setIsOpen(true)}
                                        />
                                    )}
                                />
                            </Col>
                            <Col span={9}>
                                <Controller
                                    name="addressDetail"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <Input {...field} size="large" placeholder="상세주소" className={addEstimateStyles.input} />
                                    )}
                                />
                            </Col>
                        </Row>
                    </Form.Item>

                    <Row gutter={24}>
                        <Col span={12}>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <Form.Item label="견적서명" className={addEstimateStyles.formItem}>
                                        <Input {...field} size="large" placeholder="견적서명을 입력하세요" className={addEstimateStyles.input} />
                                    </Form.Item>
                                )}
                            />
                        </Col>
                        <Col span={12}>
                            <Controller
                                name="bankAccount"
                                control={control}
                                // rules={{ required: '계좌번호를 입력해주세요' }}
                                render={({ field, fieldState: { error } }) => (
                                    <Form.Item
                                        label="입금받을 계좌번호"
                                        validateStatus={error ? 'error' : ''}
                                        help={error?.message}
                                        className={`${addEstimateStyles.formItem} ${addEstimateStyles.formItemError}`}>
                                        <Input {...field} size="large" placeholder="계좌번호를 입력하세요" className={addEstimateStyles.input} />
                                    </Form.Item>
                                )}
                            />
                        </Col>
                    </Row>

                    <Controller
                        name="memo"
                        control={control}
                        render={({ field }) => (
                            <Form.Item label="비고" className={addEstimateStyles.formItem}>
                                <Input.TextArea {...field} placeholder="비고사항을 입력하세요" rows={4} className={addEstimateStyles.input} />
                            </Form.Item>
                        )}
                    />

                    <Typography.Title level={4} className={addEstimateStyles.sectionTitle}>
                        품목 정보
                    </Typography.Title>

                    <div className={addEstimateStyles.tableContainer}>
                        <Table
                            columns={columns}
                            dataSource={fields}
                            rowKey="id"
                            pagination={false}
                            bordered
                            size="middle"
                            scroll={{ x: true }}
                            className="w-full"
                            tableLayout="fixed"
                            components={{
                                header: {
                                    cell: (props: any) => <th {...props} className={`${props.className} ${addEstimateStyles.tableHeader}`} />,
                                },
                            }}
                        />
                    </div>

                    <div className={addEstimateStyles.addButton} onClick={handleAddItem}>
                        <PlusOutlined /> <span className="ml-2">품목 추가하기</span>
                    </div>

                    <div ref={bottomRef} />
                </Form>

                <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    size="large"
                    onClick={handleSubmit(onSubmit)}
                    className={addEstimateStyles.floatingButton}>
                    저장하기
                </Button>
            </div>
            <PostCode isOpen={isOpen} toggleModal={setIsOpen} onComplete={handlePostComplete} />
        </div>
    )
}
