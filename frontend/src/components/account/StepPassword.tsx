import { Flex, Layout, Typography, Input, Button, Form } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { useAuthStore } from '../../stores/authStore'
import { accountStyles } from '../../styles/account.styles'
import { validationPatterns, validatePassword } from '../../utils/validation'

interface StepPasswordProps {
    handlePrev: () => void
    handleNext: () => void
}

interface PasswordForm {
    password: string
    passwordCheck: string
}

export default function StepPassword({ handlePrev, handleNext }: StepPasswordProps) {
    const { control, handleSubmit, watch } = useForm<PasswordForm>({
        defaultValues: {
            password: '',
            passwordCheck: '',
        },
        mode: 'onChange',
    })

    const email = useAuthStore((state) => state.email)
    const password = watch('password')
    const passwordCheck = watch('passwordCheck')
    const setPassword = useAuthStore((state) => state.setPassword)

    /**
     * @function onSubmit
     * @description form submit 함수
     */
    const onSubmit = (data: PasswordForm) => {
        setPassword(data.password)
        handleNext() // 다음 단계로 이동
    }

    const isSubmitDisabled = !validatePassword(password) || password !== passwordCheck

    return (
        <Layout className={accountStyles.stepContainer}>
            <Flex vertical gap={24}>
                <div className="mb-4">
                    <Typography.Title level={3}>비밀번호 입력</Typography.Title>
                </div>

                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Form.Item label="이메일">
                        <Input size="large" className="!rounded-xl" value={email} disabled />
                    </Form.Item>

                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: '비밀번호를 입력해주세요',
                            minLength: {
                                value: 8,
                                message: '비밀번호는 최소 8자 이상이어야 합니다',
                            },
                            maxLength: {
                                value: 14,
                                message: '비밀번호는 최대 14자 이하이어야 합니다',
                            },
                            pattern: {
                                value: validationPatterns.password, // 비밀번호 유효성 검사 패턴
                                message: '비밀번호는 영문과 숫자를 포함해야 합니다',
                            },
                        }}
                        render={({ field }) => (
                            <Form.Item
                                label="비밀번호"
                                validateStatus={password ? (validatePassword(password) ? 'success' : 'error') : ''}
                                help={
                                    password ? (
                                        validatePassword(password) ? (
                                            ''
                                        ) : (
                                            <Typography.Text className="!text-red-500 ml-2.5 !text-[12px]">
                                                비밀번호는 영문과 숫자를 포함해야 하며, 8~14자여야 합니다
                                            </Typography.Text>
                                        )
                                    ) : (
                                        ''
                                    )
                                }>
                                <Input.Password {...field} size="large" placeholder="비밀번호를 입력하세요" className="!rounded-xl" allowClear />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="passwordCheck"
                        control={control}
                        rules={{
                            required: '비밀번호 확인을 입력해주세요',
                            validate: (value) => value === password || '비밀번호가 일치하지 않습니다',
                        }}
                        render={({ field }) => (
                            <Form.Item
                                label="비밀번호 확인"
                                validateStatus={passwordCheck ? (passwordCheck === password ? 'success' : 'error') : ''}
                                help={
                                    passwordCheck ? (
                                        passwordCheck === password ? (
                                            ''
                                        ) : (
                                            <Typography.Text className="!text-red-500 ml-2.5 !text-[12px]">
                                                비밀번호가 일치하지 않습니다
                                            </Typography.Text>
                                        )
                                    ) : (
                                        ''
                                    )
                                }>
                                <Input.Password {...field} size="large" placeholder="비밀번호를 다시 입력하세요" className="!rounded-xl" allowClear />
                            </Form.Item>
                        )}
                    />

                    <Form.Item>
                        <Flex justify="space-between" className="!mt-10" gap={10}>
                            <Button className={accountStyles.buttonSize} onClick={handlePrev}>
                                <Typography.Text>이전</Typography.Text>
                            </Button>
                            <Button type="primary" htmlType="submit" className={accountStyles.buttonSize} disabled={isSubmitDisabled}>
                                다음
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </Flex>
        </Layout>
    )
}
