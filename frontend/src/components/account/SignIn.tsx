import { useState, useCallback, useEffect } from 'react'
import { Flex, Typography, Button, Modal } from 'antd'
import { accountStyles } from '../../styles/account.styles'
// components
import StepEmail from './StepEmail'
import StepAuthCode from './StepAuthCode'
import StepRegUser from './StepRegUser'
import StepAgree from './StepAgree'
import StartType from './StartType'
import { useAuthStore } from '../../stores/authStore'
interface SignInProps {
    isModalOpen: boolean
    handleCancel: () => void
}

export const SignIn = ({ isModalOpen, handleCancel }: SignInProps) => {
    const [step, setStep] = useState<number>(4)
    const reset = useAuthStore((state) => state.reset)

    /**
     * @function handleEmailStart
     * @description 이메일 시작 버튼 클릭 시 이벤트
     */
    const handleEmailStart = useCallback(() => {
        setStep(1)
    }, [])

    /**
     * @function handlePrev
     * @description 이전 버튼 클릭 시 이벤트
     */
    const handlePrev = useCallback(() => {
        setStep(step - 1)
    }, [step])

    /**
     * @function handleNext
     * @description 다음 버튼 클릭 시 이벤트
     */
    const handleNext = useCallback(() => {
        setStep(step + 1)
    }, [step])

    useEffect(() => {
        if (!isModalOpen) {
            setStep(4)
            reset()
        }
    }, [isModalOpen])

    return (
        <Modal className="!w-[420px]" title="" footer={<></>} open={isModalOpen} onCancel={handleCancel}>
            {step === 0 && <StartType handleEmail={handleEmailStart} />}
            {step === 1 && <StepEmail handlePrev={handlePrev} handleNext={handleNext} />}
            {step === 2 && <StepAuthCode handlePrev={handlePrev} handleNext={handleNext} />}
            {step === 3 && <StepRegUser handlePrev={handlePrev} handleNext={handleNext} />}
            {step === 4 && <StepAgree handlePrev={handlePrev} handleNext={handleNext} />}
            {/* {step > 0 && (
                <Flex justify="space-between" className="!mt-10" gap={10}>
                    <Button onClick={handlePrev} className={accountStyles.buttonSize}>
                        <Typography.Text>이전</Typography.Text>
                    </Button>
                    <Button type="primary" onClick={handleNext} className={accountStyles.buttonSize}>
                        <Typography.Text className="!text-white">다음</Typography.Text>
                    </Button>
                </Flex>
            )} */}
        </Modal>
    )
}
