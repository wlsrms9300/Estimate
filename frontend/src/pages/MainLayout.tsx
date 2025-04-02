import { useRef, useState } from 'react'
import { Layout, Dropdown, MenuProps, Flex } from 'antd'
import { UserOutlined, BellOutlined, LoadingOutlined } from '@ant-design/icons'
import { soMainStyles } from '../styles/somain.styles'
//components
import Navigation from '../components/layout/Navigation'
//router
import { Outlet, useNavigate } from 'react-router-dom'
import { resetAllStores } from '../utils/store'

const { Header, Content } = Layout

export default function MainLayout() {
    const containerRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const items: MenuProps['items'] = [
        // {
        //     label: '사용자명',
        //     type: 'group',
        //     key: 'group',
        //     children: [
        //         {
        //             label: '내정보',
        //             key: 'profile',
        //         },
        //         {
        //             label: '로그아웃',
        //             key: 'logout',
        //         },
        //     ],
        // },
        {
            label: '내정보',
            key: 'profile',
        },
        {
            label: '로그아웃',
            key: 'logout',
        },
    ]

    /**
     * @function onClickHandler
     * @description 드롭다운 메뉴 클릭 시 실행되는 함수
     */
    const onClickHandler: MenuProps['onClick'] = ({ key }) => {
        switch (key) {
            case 'profile':
                alert('내정보 화면으로 이동')
                break
            case 'logout':
                localStorage.removeItem('at')
                resetAllStores()
                navigate('/')
                break
        }
    }

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
                        <Outlet />
                    </Content>
                </Layout>
            </div>
        </Layout>
    )
}
