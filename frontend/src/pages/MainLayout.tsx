import { useRef, useState, useEffect, useCallback } from 'react'
import { Layout, Dropdown, MenuProps, Flex } from 'antd'
import { UserOutlined, BellOutlined, LoadingOutlined, LogoutOutlined } from '@ant-design/icons'
import { soMainStyles } from '../styles/somain.styles'
//components
import Navigation from '../components/layout/Navigation'
//router
import { Outlet, useNavigate } from 'react-router-dom'
import { resetAllStores } from '../utils/store'

const { Header, Content } = Layout

export default function MainLayout() {
    const containerRef = useRef<HTMLDivElement>(null)
    const contentAreaRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const items: MenuProps['items'] = [
        {
            label: '내정보',
            key: 'profile',
            icon: <UserOutlined />,
        },
        {
            type: 'divider',
        },
        {
            label: '로그아웃',
            key: 'logout',
            icon: <LogoutOutlined />,
        },
    ]

    /**
     * @function onClickHandler
     * @description 드롭다운 메뉴 클릭 시 실행되는 함수
     */
    const onClickHandler: MenuProps['onClick'] = ({ key }) => {
        switch (key) {
            case 'profile':
                navigate('/so/profile')
                break
            case 'logout':
                setIsLoading(true)
                setTimeout(() => {
                    localStorage.removeItem('at')
                    resetAllStores()
                    navigate('/')
                    setIsLoading(false)
                }, 1000)
                break
        }
    }

    const handleScroll = useCallback(() => {
        if (contentAreaRef.current) {
            const scrollTop = contentAreaRef.current.scrollTop
            const isScrolledNow = scrollTop > 0

            if (isScrolledNow !== isScrolled) {
                setIsScrolled(isScrolledNow)
            }
        }
    }, [isScrolled])

    useEffect(() => {
        const contentElement = contentAreaRef.current
        if (contentElement) {
            // 초기 스크롤 상태 확인
            handleScroll()

            contentElement.addEventListener('scroll', handleScroll, { passive: true })

            return () => {
                contentElement.removeEventListener('scroll', handleScroll)
            }
        }
    }, [handleScroll])

    return (
        <Layout ref={containerRef} className={soMainStyles.layout}>
            <Navigation containerRef={containerRef} />
            <div className={soMainStyles.layoutContainer}>
                <Layout className={soMainStyles.innerLayout}>
                    <Content className={soMainStyles.content}>
                        <Header className={`${soMainStyles.header} ${isScrolled ? soMainStyles.headerScrolled : ''}`}>
                            <div className={soMainStyles.headerTitle}></div>
                            <div className={soMainStyles.headerIcons}>
                                <BellOutlined className={soMainStyles.headerIcon} />
                                <Dropdown
                                    menu={{ items, onClick: onClickHandler }}
                                    trigger={['click', 'contextMenu']}
                                    overlayStyle={{
                                        zIndex: 1000,
                                        minWidth: '150px',
                                    }}>
                                    <UserOutlined className={soMainStyles.headerIcon} />
                                </Dropdown>
                            </div>
                        </Header>
                        <div
                            ref={contentAreaRef}
                            className={soMainStyles.contentArea}
                            style={{
                                height: 'calc(100vh - 77px)',
                                overflowY: 'auto',
                            }}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </div>
        </Layout>
    )
}
