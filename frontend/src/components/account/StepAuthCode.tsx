// components/account/StepEmail.tsx
import React from 'react'
import { Flex, Layout, Typography, Input, Button, Form } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { useAuthStore } from '../../stores/authStore'
import { accountStyles } from '../../styles/account.styles'
import { validateAuthCode, validationPatterns } from '../../utils/validation'

interface StepAuthCodeProps {
    handlePrev: () => void
    handleNext: () => void
}

interface AuthCodeForm {
    authCode: string
}

export default function StepAuthCode({ handlePrev, handleNext }: StepAuthCodeProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<AuthCodeForm>({
        defaultValues: {
            authCode: '',
        },
        mode: 'onChange',
    })

    const authCode = watch('authCode')
    const setAuthCode = useAuthStore((state) => state.setAuthCode)

    /**
     * @function onSubmit
     * @description form submit 함수
     */
    const onSubmit = (data: AuthCodeForm) => {
        setAuthCode(data.authCode)
        handleNext()
    }

    return (
        <Layout className={accountStyles.stepContainer}>
            <Flex vertical gap={24}>
                <div className="mb-4">
                    <Typography.Title level={3}>메일로 전송된 인증코드 입력</Typography.Title>
                </div>

                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Controller
                        name="authCode"
                        control={control}
                        rules={{
                            required: '인증코드를 입력해주세요',
                            pattern: {
                                value: validationPatterns.authCode,
                                message: '6자리 숫자를 입력해주세요.',
                            },
                        }}
                        render={({ field }) => (
                            <Form.Item
                                label="인증코드"
                                validateStatus={authCode ? (validateAuthCode(authCode) ? 'success' : 'error') : ''}
                                help={
                                    authCode ? (
                                        validateAuthCode(authCode) ? (
                                            ''
                                        ) : (
                                            <Typography.Text className="!text-red-500 ml-2.5 !text-[12px]">6자리 숫자를 입력해주세요</Typography.Text>
                                        )
                                    ) : (
                                        ''
                                    )
                                }>
                                <Input {...field} size="large" placeholder="6자리 인증코드 입력" className="!rounded-xl" allowClear maxLength={6} />
                            </Form.Item>
                        )}
                    />
                </Form>
                <Form.Item>
                    <Flex justify="space-between" className="!mt-10" gap={10}>
                        <Button className={accountStyles.buttonSize} onClick={handlePrev}>
                            <Typography.Text>이전</Typography.Text>
                        </Button>
                        <Button type="primary" htmlType="submit" className={accountStyles.buttonSize} disabled={!validateAuthCode(authCode)}>
                            인증코드 확인
                        </Button>
                    </Flex>
                </Form.Item>
            </Flex>
        </Layout>
    )
}
