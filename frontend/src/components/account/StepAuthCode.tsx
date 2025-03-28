// components/account/StepAuthCode.tsx
import React from 'react'
import { Flex, Layout, Typography, Input, Button, Form } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { useAuthStore } from '../../stores/authStore'
import { accountStyles } from '../../styles/account.styles'
import { validationPatterns } from '../../utils/validation'
import { useVerifyCertNo } from '../../hooks/account/authService'

interface StepCertNoProps {
    handlePrev: () => void
    handleNext: () => void
}

interface CertNoForm {
    certNo: string
}

export default function StepCertNo({ handlePrev, handleNext }: StepCertNoProps) {
    const { control, handleSubmit, watch } = useForm<CertNoForm>({
        defaultValues: {
            certNo: '',
        },
        mode: 'onChange',
    })

    const certNo = watch('certNo')
    const email = useAuthStore((state) => state.email)
    const setCertNo = useAuthStore((state) => state.setCertNo)

    const mutateCertNo = useVerifyCertNo(handleNext)

    /**
     * @function onSubmit
     * @description form submit 함수
     */
    const onSubmit = (data: CertNoForm) => {
        setCertNo(data.certNo)
        mutateCertNo.mutate({ email: email, certNo: data.certNo })
    }

    return (
        <Layout className={accountStyles.stepContainer}>
            <Flex vertical gap={24}>
                <div className="mb-4">
                    <Typography.Title level={3}>메일로 전송된 인증코드 입력</Typography.Title>
                </div>

                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Controller
                        name="certNo"
                        control={control}
                        rules={{
                            required: '인증코드를 입력해주세요',
                            pattern: {
                                value: validationPatterns.certNo,
                                message: '6자리 숫자를 입력해주세요.',
                            },
                        }}
                        render={({ field }) => (
                            <Form.Item
                                label="인증코드"
                                validateStatus={certNo ? (validationPatterns.certNo.test(certNo) ? 'success' : 'error') : ''}
                                help={
                                    certNo ? (
                                        validationPatterns.certNo.test(certNo) ? (
                                            ''
                                        ) : (
                                            <Typography.Text className="!text-red-500 ml-2.5 !text-[12px]">6자리 숫자를 입력해주세요</Typography.Text>
                                        )
                                    ) : (
                                        ''
                                    )
                                }>
                                <Input
                                    {...field}
                                    size="large"
                                    placeholder="6자리 인증코드를 입력하세요"
                                    className="!rounded-xl"
                                    allowClear
                                    maxLength={6}
                                />
                            </Form.Item>
                        )}
                    />
                    <Form.Item>
                        <Flex justify="space-between" className="!mt-10" gap={10}>
                            <Button className={accountStyles.buttonSize} onClick={handlePrev}>
                                <Typography.Text>이전</Typography.Text>
                            </Button>
                            <Button
                                loading={mutateCertNo.isPending}
                                type="primary"
                                htmlType="submit"
                                className={accountStyles.buttonSize}
                                disabled={!validationPatterns.certNo.test(certNo)}>
                                인증코드 확인
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </Flex>
        </Layout>
    )
}
