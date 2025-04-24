import { useState, useEffect, useRef } from 'react'
import { Layout, Typography, Form, Input, Button, Table, Space, Flex, InputNumber, Tooltip, Row, Col } from 'antd'
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import { addEstimateStyles } from '../../styles/content/addestimate.styles'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
// types
import { EstimateForm } from '../../types/content/estimate'

const { Title, Text } = Typography

export default function AddEstimate() {
    const bottomRef = useRef<HTMLDivElement>(null)
    const { control, handleSubmit, watch, setValue } = useForm<EstimateForm>({
        defaultValues: {
            estimateName: '견적서',
            items: [],
        },
        mode: 'onChange',
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    })

    // 아이템 추가 핸들러
    const handleAddItem = () => {
        append({
            id: Date.now().toString(),
            name: '',
            specification: '',
            unit: '',
            quantity: 0,
            unitPrice: 0,
            tax: 0,
            amount: 0,
            note: '',
        })
    }

    // 금액 자동 계산
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            const items = value.items || []

            items.forEach((item, index) => {
                if (name?.includes(`items.${index}`)) {
                    if (!item) return

                    const quantity = item.quantity || 0
                    const unitPrice = item.unitPrice || 0
                    const tax = item.tax || 0

                    // 금액 = 수량 * 단가 + 세금
                    const amount = quantity * unitPrice + tax
                    setValue(`items.${index}.amount`, amount)
                }
            })
        })

        return () => subscription.unsubscribe()
    }, [watch, setValue])

    // 폼 제출 핸들러
    const onSubmit = (data: EstimateForm) => {
        console.log('제출된 데이터:', data)
        // 여기에 API 호출 코드 추가
    }

    const columns = [
        {
            title: 'No',
            key: 'index',
            width: 50,
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: '품명',
            dataIndex: 'name',
            key: 'name',
            render: (_: any, __: any, index: number) => (
                <Controller
                    name={`items.${index}.name`}
                    control={control}
                    rules={{ required: '품명을 입력해주세요' }}
                    render={({ field, fieldState: { error } }) => (
                        <Form.Item validateStatus={error ? 'error' : ''} help={error?.message} className="mb-0">
                            <Input {...field} placeholder="품명" className={addEstimateStyles.input} />
                        </Form.Item>
                    )}
                />
            ),
        },
        {
            title: '규격',
            dataIndex: 'specification',
            key: 'specification',
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
            dataIndex: 'tax',
            key: 'tax',
            render: (_: any, __: any, index: number) => (
                <Controller
                    name={`items.${index}.tax`}
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
            dataIndex: 'amount',
            key: 'amount',
            render: (_: any, __: any, index: number) => (
                <Controller
                    name={`items.${index}.amount`}
                    control={control}
                    render={({ field }) => (
                        <InputNumber
                            {...field}
                            placeholder="금액"
                            disabled
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
            dataIndex: 'note',
            key: 'note',
            render: (_: any, __: any, index: number) => (
                <Controller
                    name={`items.${index}.note`}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder="비고" className={addEstimateStyles.input} />}
                />
            ),
        },
        {
            title: '',
            key: 'action',
            width: 50,
            render: (_: any, __: any, index: number) => <DeleteOutlined className={addEstimateStyles.deleteButton} onClick={() => remove(index)} />,
        },
    ]

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
                                name="manager"
                                control={control}
                                rules={{ required: '담당자명을 입력해주세요' }}
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
                                name="representative"
                                control={control}
                                rules={{ required: '대표자명을 입력해주세요' }}
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
                                rules={{ required: '업체명을 입력해주세요' }}
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
                                name="contactNumber"
                                control={control}
                                rules={{ required: '연락처를 입력해주세요' }}
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

                    <Controller
                        name="companyAddress"
                        control={control}
                        rules={{ required: '업체주소를 입력해주세요' }}
                        render={({ field, fieldState: { error } }) => (
                            <Form.Item
                                label="업체주소"
                                validateStatus={error ? 'error' : ''}
                                help={error?.message}
                                className={`${addEstimateStyles.formItem} ${addEstimateStyles.formItemError}`}>
                                <Input {...field} size="large" placeholder="업체주소를 입력하세요" className={addEstimateStyles.input} />
                            </Form.Item>
                        )}
                    />

                    <Row gutter={24}>
                        <Col span={12}>
                            <Controller
                                name="estimateName"
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
                                name="accountNumber"
                                control={control}
                                rules={{ required: '계좌번호를 입력해주세요' }}
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
                        name="note"
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
        </div>
    )
}
