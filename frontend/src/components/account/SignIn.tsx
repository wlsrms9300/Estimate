import React from 'react'
import { Flex, Layout, Typography, Button } from 'antd'
import { accountStyles } from '../../styles/account.styles'
import LogoText from '../../assets/images/logo-text.png'
import { MailOutlined } from '@ant-design/icons'
import Naver from '../../assets/images/naver-icon.png'
import Kakao from '../../assets/images/kakao.svg'

const { Header, Footer, Sider, Content } = Layout

export const SignIn = () => {
    return (
        <Layout className={accountStyles.container}>
            <Content className={accountStyles.content}>
                <Flex justify="center" align="center">
                    <img src={LogoText} alt="logo" className={accountStyles.logo} />
                </Flex>
                <Flex vertical gap={10}>
                    <Typography.Title level={4}>시작하기</Typography.Title>
                    <Button className={accountStyles.kakaoButton} type="primary">
                        <img src={Kakao} alt="kakao" className={accountStyles.kakaoIcon} />
                        <Typography.Text className="!text-[16px]">카카오톡 로그인</Typography.Text>
                    </Button>
                    <Button className={accountStyles.naverButton} type="primary">
                        <img src={Naver} alt="naver" className={accountStyles.naverIcon} />
                        <Typography.Text className={accountStyles.btnText}>네이버 로그인</Typography.Text>
                    </Button>
                    <Button className={accountStyles.emailButton} type="primary">
                        <MailOutlined className={accountStyles.btnIcon} />
                        <Typography.Text className={accountStyles.btnText}>이메일로 시작하기</Typography.Text>
                    </Button>
                </Flex>
            </Content>
        </Layout>
    )
}
