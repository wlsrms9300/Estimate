import { useRef } from 'react'
import { Layout } from 'antd'
import { FileTextOutlined, SettingOutlined, UserOutlined, BellOutlined } from '@ant-design/icons'
import { soMainStyles } from '../styles/somain.styles'
//components
import Navigation from '../components/layout/Navigation'
//router
import { Outlet } from 'react-router-dom'

const { Header, Sider, Content } = Layout

export default function MainLayout() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <Layout ref={containerRef} className={soMainStyles.layout}>
            <Navigation containerRef={containerRef} />
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
