import { useState, useCallback, useEffect } from 'react'
import { Modal } from 'antd'
// components
import StepEmail from './StepEmail'
import StepAuthCode from './StepAuthCode'
import StepPassword from './StepPassword'
import StepAgree from './StepAgree'
import StartType from './StartType'
import { useAuthStore } from '../../stores/authStore'
interface SignInProps {
    isModalOpen: boolean
    handleCancel: () => void
}

export const SignIn = ({ isModalOpen, handleCancel }: SignInProps) => {
    const [step, setStep] = useState<number>(0)
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
        if (step === 3) {
            // 이메일 인증 후 뒤로가기 시 인증번호 발송부터 다시 시작
            setStep(1)
        } else {
            setStep(step - 1)
        }
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
            setStep(0)
            reset()
        }
    }, [isModalOpen])

    return (
        <Modal className="!w-[420px]" title="" footer={<></>} open={isModalOpen} onCancel={handleCancel}>
            {step === 0 && <StartType handleEmail={handleEmailStart} />}
            {step === 1 && <StepEmail handlePrev={handlePrev} handleNext={handleNext} />}
            {step === 2 && <StepAuthCode handlePrev={handlePrev} handleNext={handleNext} />}
            {step === 3 && <StepPassword handlePrev={handlePrev} handleNext={handleNext} />}
            {step === 4 && <StepAgree handlePrev={handlePrev} handleNext={handleCancel} />}
        </Modal>
    )
}
