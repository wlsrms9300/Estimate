import React from 'react'
import { Flex, Layout, Typography, Button, Modal } from 'antd'
import { accountStyles } from '../../styles/account.styles'
import LogoText from '../../assets/images/logo-text.png'
import { MailOutlined } from '@ant-design/icons'
import Naver from '../../assets/images/naver-icon.png'
import Kakao from '../../assets/images/kakao.svg'

const { Content } = Layout

interface StartTypeProps {
    handleEmail: () => void
    handleKakao: () => void
    handleNaver: () => void
}

export default function StartType({ handleEmail, handleKakao, handleNaver }: StartTypeProps) {
    return (
        <Layout className={accountStyles.container}>
            <Content className={accountStyles.content}>
                <Flex justify="center" align="center">
                    <img src={LogoText} alt="logo" className={accountStyles.logo} />
                </Flex>
                <Flex vertical gap={10}>
                    <Typography.Title level={4}>시작하기</Typography.Title>
                    <Button className={accountStyles.kakaoButton} type="primary" onClick={handleKakao}>
                        <img src={Kakao} alt="kakao" className={accountStyles.kakaoIcon} />
                        <Typography.Text className="!text-[16px]">카카오톡 로그인</Typography.Text>
                    </Button>
                    <Button className={accountStyles.naverButton} type="primary" onClick={handleNaver}>
                        <img src={Naver} alt="naver" className={accountStyles.naverIcon} />
                        <Typography.Text className={accountStyles.btnText}>네이버 로그인</Typography.Text>
                    </Button>
                    <Button className={accountStyles.emailButton} type="primary" onClick={handleEmail}>
                        <MailOutlined className={accountStyles.btnIcon} />
                        <Typography.Text className={accountStyles.btnText}>이메일로 시작하기</Typography.Text>
                    </Button>
                </Flex>
            </Content>
        </Layout>
    )
}
