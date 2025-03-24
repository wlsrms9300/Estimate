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
            <Navigation />
            <Layout>
                <Content className={soMainStyles.content}>
                    <Header className={soMainStyles.header}>
                        <div className={soMainStyles.headerTitle}>작성하기</div>
                        <div className={soMainStyles.headerIcons}>
                            <BellOutlined className={soMainStyles.headerIcon} />
                            <UserOutlined className={soMainStyles.headerIcon} />
                        </div>
                    </Header>
                    <Outlet />
                </Content>
                {/* <Header className={soMainStyles.header}>
                    <div className={soMainStyles.headerTitle}>작성하기</div>
                    <div className={soMainStyles.headerIcons}>
                        <BellOutlined className={soMainStyles.headerIcon} />
                        <UserOutlined className={soMainStyles.headerIcon} />
                    </div>
                </Header> */}
                {/* <Content className={soMainStyles.content}>
                    <div className={soMainStyles.contentContainer}>
                        <div className={soMainStyles.contentCard}>
                            <h2 className={soMainStyles.contentTitle}>견적서 작성</h2>
                            <div className={soMainStyles.contentGrid}>
                                <div className={soMainStyles.newEstimateCard}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className={soMainStyles.newEstimateTitle}>새 견적서 작성하기</h3>
                                            <p className={soMainStyles.newEstimateDescription}>
                                                AI 기반 자동 견적서 생성 시스템으로 빠르고 정확하게 작성하세요
                                            </p>
                                        </div>
                                        <FileTextOutlined className={soMainStyles.newEstimateIcon} />
                                    </div>
                                </div>

                                <div className={soMainStyles.subGrid}>
                                    <div className={soMainStyles.subCard}>
                                        <div className={soMainStyles.subCardContent}>
                                            <div className={soMainStyles.templateIconBg}>
                                                <FileTextOutlined className={soMainStyles.subCardIcon} />
                                            </div>
                                            <div>
                                                <h4 className={soMainStyles.subCardTitle}>템플릿</h4>
                                                <p className={soMainStyles.subCardDescription}>맞춤형 견적서 양식</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={soMainStyles.subCard}>
                                        <div className={soMainStyles.subCardContent}>
                                            <div className={soMainStyles.settingIconBg}>
                                                <SettingOutlined className={soMainStyles.settingIcon} />
                                            </div>
                                            <div>
                                                <h4 className={soMainStyles.subCardTitle}>설정</h4>
                                                <p className={soMainStyles.subCardDescription}>견적서 기본 설정</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content> */}
            </Layout>
        </Layout>
    )
}
