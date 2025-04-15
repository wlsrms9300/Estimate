import { useState, useCallback, useEffect } from 'react'
import { Modal } from 'antd'
// components
import StepEmailChange from './StepEmailChange'
import StepCertification from './StepCertification'
// store
import { useAuthStore } from '../../stores/authStore'

interface EmailEditModalProps {
    isModalOpen: boolean
    handleCancel: () => void
}

export default function EmailEditModal({ isModalOpen, handleCancel }: EmailEditModalProps) {
    const [step, setStep] = useState<number>(0)
    // 모달 상태에 따른 키 값 설정 (모달이 닫힐 때마다 다른 키 값 생성)
    const [modalKey, setModalKey] = useState<number>(0)

    /**
     * @function handlePrev
     * @description 이전 버튼 클릭 시 이벤트
     */
    const handlePrev = useCallback(() => {
        if (step === 5 || step === 3) {
            // 이메일 인증 후 뒤로가기 시 이메일 입력부터 다시 시작
            setStep(1)
        } else {
            setStep(step - 1)
        }
    }, [step])

    /**
     * @function handleNext
     * @description 다음 버튼 클릭 시 이벤트
     */
    const handleNext = useCallback(
        (goToStep?: number) => {
            if (goToStep) {
                setStep(goToStep)
            } else {
                setStep(step + 1)
            }
        },
        [step],
    )

    // 모달이 닫힐 때 key 값을 변경하여 컴포넌트 강제 리마운트
    useEffect(() => {
        if (!isModalOpen) {
            // 모달이 닫힐 때 step 초기화
            setStep(0)
            // 모달이 닫힐 때 modalKey 변경하여 컴포넌트 리마운트 강제 (isModalOpen을 Props로 넘겨줘도 언마운트 되었다 마운트되기 때문에 해당 값을 변화를 감지 하지 못함)
            setModalKey((prev) => prev + 1)
        }
    }, [isModalOpen])

    return (
        <Modal className="!w-[420px]" title="" footer={<></>} open={isModalOpen} onCancel={handleCancel}>
            {step === 0 && <StepEmailChange key={modalKey} />}
            {step === 1 && <StepCertification />}
        </Modal>
    )
}
