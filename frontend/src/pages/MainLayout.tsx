import { useState } from 'react'
import { Layout } from 'antd'
import { FileTextOutlined, SettingOutlined, UserOutlined, BellOutlined } from '@ant-design/icons'
import { soMainStyles } from '../styles/somain.styles'
//components
import Navigation from '../components/layout/Navigation'
//router
import { Outlet } from 'react-router-dom'

const { Header, Sider, Content } = Layout

export default function MainLayout() {
    return (
        <Layout className={soMainStyles.layout}>
            <div className={soMainStyles.fixedContainer}>
                <div className={soMainStyles.fixedContent}>
                    <Navigation />
                    {/* <Header className={soMainStyles.header}>
                        <div className={soMainStyles.headerTitle}></div>
                        <div className={soMainStyles.headerIcons}>
                            <BellOutlined className={soMainStyles.headerIcon} />
                            <UserOutlined className={soMainStyles.headerIcon} />
                        </div>
                    </Header> */}
                </div>
            </div>
            <div className={soMainStyles.layoutContainer}>
                <Layout className={soMainStyles.innerLayout}>
                    <Content className={soMainStyles.content}>
                        <Header className={soMainStyles.header}>
                            <div className={soMainStyles.headerTitle}></div>
                            <div className={soMainStyles.headerIcons}>
                                <BellOutlined className={soMainStyles.headerIcon} />
                                <UserOutlined className={soMainStyles.headerIcon} />
                            </div>
                        </Header>
                        <Outlet />
                    </Content>
                </Layout>
            </div>
        </Layout>
    )
}
