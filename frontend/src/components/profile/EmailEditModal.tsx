import { useState, useCallback, useEffect } from 'react'
import { Modal } from 'antd'
import { useQueryClient } from '@tanstack/react-query'
// components
import StepEmailChange from './StepEmailChange'
import StepAuthCode from '../account/StepAuthCode'
// store
import { useAuthStore } from '../../stores/authStore'
// hooks
import { useUpdateProfile } from '../../hooks/account/authService'

interface EmailEditModalProps {
    isModalOpen: boolean
    handleCancel: () => void
}

export default function EmailEditModal({ isModalOpen, handleCancel }: EmailEditModalProps) {
    const queryClient = useQueryClient()
    const [step, setStep] = useState<number>(1)
    const reset = useAuthStore((state) => state.reset)
    // 모달 상태에 따른 키 값 설정 (모달이 닫힐 때마다 다른 키 값 생성)
    const [modalKey, setModalKey] = useState<number>(1)

    const { mutate: updateProfile } = useUpdateProfile()

    const email = useAuthStore((state) => state.email)

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
    const handleNext = useCallback(
        (goToStep?: number) => {
            if (goToStep) {
                setStep(goToStep)
            } else {
                reset()
                handleCancel()
            }
        },
        [step],
    )

    /**
     * @function handleDone
     * @description 이메일 인증 완료 시 이벤트
     */
    const handleDone = useCallback(() => {
        updateProfile(
            { userId: email },
            {
                onSuccess: (response) => {
                    if (response.resultCd === 201) {
                        queryClient.invalidateQueries({ queryKey: ['profile'] })
                        reset()
                        handleCancel()
                    }
                },
            },
        )
    }, [step])

    // 모달이 닫힐 때 key 값을 변경하여 컴포넌트 강제 리마운트
    useEffect(() => {
        if (!isModalOpen) {
            // 모달이 닫힐 때 step 초기화
            setStep(1)
            // 모달이 닫힐 때 modalKey 변경하여 컴포넌트 리마운트 강제 (isModalOpen을 Props로 넘겨줘도 언마운트 되었다 마운트되기 때문에 해당 값을 변화를 감지 하지 못함)
            setModalKey((prev) => prev + 1)
            // store 초기화
            reset()
        }
    }, [isModalOpen])

    return (
        <Modal className="!w-[420px]" title="" footer={<></>} open={isModalOpen} onCancel={handleCancel}>
            {step === 1 && <StepEmailChange key={modalKey} handleNext={handleNext} />}
            {step === 2 && <StepAuthCode handlePrev={handlePrev} handleNext={handleDone} />}
        </Modal>
    )
}
