import { useEffect } from 'react'
import { Flex, Layout, Typography, Input, Button, Form } from 'antd'
import { profileStyles } from '../../styles/content/profile.styles'
import { useForm, Controller } from 'react-hook-form'
import { validationPatterns } from '../../utils/validation'
import { validateEmail } from '../../utils/validation'
import { useSendVerificationCode } from '../../hooks/account/authService'
import useCustomNotification from '../../hooks/notification'
import { useAuthStore } from '../../stores/authStore'

interface EmailForm {
    email: string
}

interface StepEmailChangeProps {
    handleNext: (goToStep?: number) => void
}

export default function StepEmailChange({ handleNext }: StepEmailChangeProps) {
    const { openNotification } = useCustomNotification()
    const { control, handleSubmit, setFocus, watch, reset } = useForm<EmailForm>({
        defaultValues: {
            email: '',
        },
        mode: 'onChange',
    })

    const email = watch('email')
    const setEmail = useAuthStore((state) => state.setEmail)

    const mutateEmail = useSendVerificationCode()

    const onSubmit = (data: EmailForm) => {
        setEmail(data.email)
        mutateEmail.mutate(data.email, {
            onSuccess: (response) => {
                if (response.resultCd === 201) {
                    if (response.code === 10000) {
                        openNotification('info', '인증코드 발송', response.resultMsg)
                        handleNext(1)
                    } else {
                        handleNext(2)
                    }
                }
            },
        })
    }

    // 컴포넌트가 마운트될 때 이메일 필드에 포커스 설정
    useEffect(() => {
        setFocus('email')
    }, [setFocus])

    return (
        <Layout className={profileStyles.stepContainer}>
            <Flex vertical gap={24}>
                <div className="mb-4">
                    <Typography.Title level={3}>변경할 이메일 입력</Typography.Title>
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
                                label="변경할 이메일"
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
                            <Button
                                loading={mutateEmail.isPending}
                                type="primary"
                                htmlType="submit"
                                className={profileStyles.buttonSize}
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
