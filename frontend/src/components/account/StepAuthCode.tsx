import { useState, useEffect } from 'react'
import { Flex, Layout, Typography, Input, Button, Form, Spin } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { useAuthStore } from '../../stores/authStore'
import { accountStyles } from '../../styles/account.styles'
import { validationPatterns } from '../../utils/validation'
import { useVerifyCertNo, useSendVerificationCode } from '../../hooks/account/authService'
// components
import Timer from '../common/Timer'

interface StepCertNoProps {
    handlePrev: () => void
    handleNext: () => void
}

interface CertNoForm {
    certNo: string
}

export default function StepCertNo({ handlePrev, handleNext }: StepCertNoProps) {
    const { control, handleSubmit, watch, setFocus } = useForm<CertNoForm>({
        defaultValues: {
            certNo: '',
        },
        mode: 'onChange',
    })

    const certNo = watch('certNo')
    const email = useAuthStore((state) => state.email)
    const setCertNo = useAuthStore((state) => state.setCertNo)
    const [reSend, setReSend] = useState(false)

    const mutateCertNo = useVerifyCertNo(handleNext)
    const mutateEmail = useSendVerificationCode(() => setReSend(false))

    /**
     * @function handleTimerEnd
     * @description 타이머 종료 이벤트
     */
    const handleTimerEnd = () => {
        console.log('타이머 종료')
        setReSend(true)
    }

    /**
     * @function reSendCertNo
     * @description 인증번호 재발송
     */
    const reSendCertNo = () => {
        mutateEmail.mutate(email)
        setFocus('certNo')
    }

    /**
     * @function onSubmit
     * @description form submit 함수
     */
    const onSubmit = (data: CertNoForm) => {
        setCertNo(data.certNo)
        mutateCertNo.mutate({ email: email, certNo: data.certNo })
    }

    useEffect(() => {
        setFocus('certNo')
    }, [])

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
                                    suffix={
                                        reSend ? (
                                            mutateEmail.isPending ? (
                                                <Spin size="small" />
                                            ) : (
                                                <Typography.Link onClick={(e) => (e.preventDefault(), reSendCertNo())}>재발송</Typography.Link>
                                            )
                                        ) : (
                                            <Timer minutes={5} onTimerEnd={handleTimerEnd}>
                                                <Timer.Small />
                                            </Timer>
                                        )
                                    }
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
