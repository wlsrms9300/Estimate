import { useEffect } from 'react'
import { Flex, Layout, Typography, Input, Button, Form } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { useAuthStore } from '../../stores/authStore'
import { accountStyles } from '../../styles/account.styles'
import { validateEmail, validationPatterns } from '../../utils/validation'
import { useSendVerificationCode } from '../../hooks/account/authService'
interface StepEmailProps {
    handlePrev: () => void
    handleNext: () => void
}

interface EmailForm {
    email: string
}

export default function StepEmail({ handlePrev, handleNext }: StepEmailProps) {
    const { control, handleSubmit, setFocus, watch } = useForm<EmailForm>({
        defaultValues: {
            email: '',
        },
        mode: 'onChange',
    })

    const email = watch('email')
    const setEmail = useAuthStore((state) => state.setEmail)

    const mutateEmail = useSendVerificationCode(handleNext)

    /**
     * @function onSubmit
     * @description form submit 함수
     */
    const onSubmit = (data: EmailForm) => {
        setEmail(data.email)
        mutateEmail.mutate(data.email)
    }

    useEffect(() => {
        setFocus('email')
    }, [])

    return (
        <Layout className={accountStyles.stepContainer}>
            <Flex vertical gap={24}>
                <div className="mb-4">
                    <Typography.Title level={3}>로그인 정보 입력</Typography.Title>
                </div>

                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: '이메일을 입력해주세요',
                            pattern: {
                                value: validationPatterns.email,
                                message: '올바른 이메일 형식이 아닙니다',
                            },
                        }}
                        render={({ field }) => (
                            <Form.Item
                                label="이메일"
                                validateStatus={email ? (validateEmail(email) ? 'success' : 'error') : ''}
                                help={
                                    email ? (
                                        validateEmail(email) ? (
                                            ''
                                        ) : (
                                            <Typography.Text className="!text-red-500 ml-2.5 !text-[12px]">
                                                올바른 이메일 형식이 아닙니다
                                            </Typography.Text>
                                        )
                                    ) : (
                                        ''
                                    )
                                }>
                                <Input {...field} size="large" placeholder="example@email.com" className="!rounded-xl" allowClear />
                            </Form.Item>
                        )}
                    />
                    <Form.Item>
                        <Flex justify="space-between" className="!mt-10" gap={10}>
                            <Button className={accountStyles.buttonSize} onClick={handlePrev}>
                                <Typography.Text>이전</Typography.Text>
                            </Button>
                            <Button
                                loading={mutateEmail.isPending}
                                type="primary"
                                htmlType="submit"
                                className={accountStyles.buttonSize}
                                disabled={!validateEmail(email)}>
                                이메일 인증
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </Flex>
        </Layout>
    )
}
