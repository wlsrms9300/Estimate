import { Flex, Layout, Typography, Checkbox, Button, Form } from 'antd'
import { useAuthStore } from '../../stores/authStore'
import { accountStyles } from '../../styles/account.styles'
import { RightOutlined } from '@ant-design/icons'
import { useSignup } from '../../hooks/account/authService'
interface StepAgreeProps {
    handlePrev: () => void
    handleNext: () => void
}

export default function StepAgree({ handlePrev, handleNext }: StepAgreeProps) {
    const {
        agreeTermsOfAge,
        agreeTermsOfUse,
        agreeTermsOfPersonal,
        agreeTermsOfMarketing,
        setAgreeTermsOfAge,
        setAgreeTermsOfUse,
        setAgreeTermsOfPersonal,
        setAgreeTermsOfMarketing,
    } = useAuthStore((state) => state)

    const { email, password } = useAuthStore((state) => state)

    const handleAllAgreeChange = (e: any) => {
        const checked = e.target.checked
        setAgreeTermsOfAge(checked)
        setAgreeTermsOfUse(checked)
        setAgreeTermsOfPersonal(checked)
        setAgreeTermsOfMarketing(checked)
    }

    const isSubmitDisabled = !agreeTermsOfAge || !agreeTermsOfUse || !agreeTermsOfPersonal

    const mutateSignup = useSignup(handleNext)

    const onSubmit = () => {
        mutateSignup.mutate({
            agreeTermsOfAge,
            agreeTermsOfUse,
            agreeTermsOfPersonal,
            agreeTermsOfMarketing,
            userId: email,
            password,
        })
    }

    return (
        <Layout className={accountStyles.stepContainer}>
            <Flex vertical gap={24}>
                <div className="mb-4">
                    <Typography.Title level={3}>약관 동의</Typography.Title>
                </div>

                <Form layout="vertical" onFinish={onSubmit}>
                    <Form.Item>
                        <Checkbox
                            checked={agreeTermsOfAge && agreeTermsOfUse && agreeTermsOfPersonal && agreeTermsOfMarketing}
                            onChange={handleAllAgreeChange}>
                            아래의 모든 내용에 동의합니다
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Checkbox checked={agreeTermsOfAge} onChange={(e) => setAgreeTermsOfAge(e.target.checked)}>
                            (필수) 만 14세 이상입니다.
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Checkbox checked={agreeTermsOfUse} onChange={(e) => setAgreeTermsOfUse(e.target.checked)}>
                                (필수) 이용약관에 동의합니다.
                            </Checkbox>
                            <RightOutlined className={accountStyles.arrowIcon} />
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Checkbox checked={agreeTermsOfPersonal} onChange={(e) => setAgreeTermsOfPersonal(e.target.checked)}>
                                (필수) 개인정보 수집 및 이용에 동의합니다.
                            </Checkbox>
                            <RightOutlined className={accountStyles.arrowIcon} />
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Checkbox checked={agreeTermsOfMarketing} onChange={(e) => setAgreeTermsOfMarketing(e.target.checked)}>
                                (선택) 마케팅 정보 수신에 동의합니다.
                            </Checkbox>
                            <RightOutlined className={accountStyles.arrowIcon} />
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Flex justify="space-between" className="!mt-10" gap={10}>
                            <Button className={accountStyles.buttonSize} onClick={handlePrev}>
                                <Typography.Text>이전</Typography.Text>
                            </Button>
                            <Button type="primary" htmlType="submit" className={accountStyles.buttonSize} disabled={isSubmitDisabled}>
                                완료
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </Flex>
        </Layout>
    )
}
