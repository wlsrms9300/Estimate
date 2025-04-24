import { useEffect } from 'react'
import DaumPostcode from 'react-daum-postcode'
// antd
import { Modal, Button } from 'antd'

interface PostCodeProps {
    isOpen: boolean
    toggleModal: (isOpen: boolean) => void
    onComplete: (data: any) => void
}

export default function PostCode({ isOpen, toggleModal, onComplete }: PostCodeProps) {
    const handleComplete = (data: any) => {
        toggleModal(false)
        onComplete(data)
    }

    useEffect(() => {
        if (isOpen) {
            console.log('isOpen')
        }
    }, [isOpen])

    return (
        <div>
            {isOpen && (
                <Modal open={isOpen} onCancel={() => toggleModal(false)} title="주소 검색">
                    <div style={{ height: 'calc(100vh - 400px)', width: '100%', margin: '20px auto' }}>
                        <DaumPostcode onComplete={handleComplete} />
                    </div>
                </Modal>
            )}
        </div>
    )
}
