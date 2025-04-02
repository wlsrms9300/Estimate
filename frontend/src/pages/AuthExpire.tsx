import { useState } from 'react'
import { Typography, Button, Flex } from 'antd'
import { GlobalStyles } from '../styles/global.styles'
import { useNavigate } from 'react-router-dom'
// components
import { SignModal } from '../components/account/SignModal'

export default function AuthExpire() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <div className={GlobalStyles.windowCenter}>
            <Flex vertical gap={40}>
                <Flex vertical gap={2} justify="center" align="center">
                    <Typography.Title level={3}>로그인이 만료되었습니다.</Typography.Title>
                    <Typography.Text>다시 로그인 해주세요.</Typography.Text>
                </Flex>

                <Flex vertical gap={8}>
                    <Button type="primary" onClick={() => setIsModalOpen(true)}>
                        로그인하기
                    </Button>
                    <Button type="default" onClick={() => navigate('/')}>
                        메인화면으로 이동
                    </Button>
                </Flex>
            </Flex>
            <SignModal isModalOpen={isModalOpen} handleCancel={handleCancel} />
        </div>
    )
}
