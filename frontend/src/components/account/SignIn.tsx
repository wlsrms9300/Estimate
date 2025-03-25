import React from 'react'
import { Flex, Layout, Typography, Button } from 'antd'
import { accountStyles } from '../../styles/account.styles'
import LogoText from '../../assets/images/logo-text.png'

const { Header, Footer, Sider, Content } = Layout

export const SignIn = () => {
    return (
        <Layout className={accountStyles.container}>
            <Content className={accountStyles.content}>
                <Flex justify="center" align="center">
                    <img src={LogoText} alt="logo" className={accountStyles.logo} />
                </Flex>
                <Flex vertical gap={6}>
                    <Typography.Title level={4}>시작하기</Typography.Title>
                    <Button>구글로 시작하기</Button>
                    <Button>카카오톡으로 시작하기</Button>
                    <Button>이메일로 시작하기</Button>
                </Flex>
            </Content>
        </Layout>
    )
}
