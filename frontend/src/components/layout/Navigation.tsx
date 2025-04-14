import { useState, useEffect } from 'react'
import { Layout, Button, Tooltip, Flex } from 'antd'
import {
    FormOutlined,
    DollarCircleOutlined,
    DollarCircleFilled,
    SettingOutlined,
    SettingFilled,
    FolderOpenOutlined,
    FolderOpenFilled,
    MenuOutlined,
    NotificationOutlined,
    NotificationFilled,
    ProductOutlined,
    ProductFilled,
} from '@ant-design/icons'
import { soMainStyles } from '../../styles/somain.styles'
import { useNavigate } from 'react-router-dom'

const { Sider } = Layout

interface NavigationProps {
    containerRef: React.RefObject<HTMLDivElement | null>
}

export default function Navigation({ containerRef }: NavigationProps) {
    const navigate = useNavigate()
    const [siderCollapsed, setSiderCollapsed] = useState(false)
    const [selectedMenu, setSelectedMenu] = useState('')
    const menu = [
        { name: '견적서', icon: <FolderOpenOutlined />, selIcon: <FolderOpenFilled />, value: 'documents' },
        // { name: '요금제', icon: <DollarCircleOutlined />, selIcon: <DollarCircleFilled />, value: 'plan' },
        { name: '거래처', icon: <ProductOutlined />, selIcon: <ProductFilled />, value: 'customer' },
        { name: '업체', icon: <ProductOutlined />, selIcon: <ProductFilled />, value: 'company' },
        { name: '설정', icon: <SettingOutlined />, selIcon: <SettingFilled />, value: 'setting' },
    ]

    /**
     * @function handleMenuClick
     * @description 메뉴 클릭 시 선택된 메뉴 상태 업데이트
     */
    const handleMenuClick = (menu: string) => {
        if (selectedMenu === menu) {
            setSelectedMenu('')
        } else {
            setSelectedMenu(menu)
        }
    }

    /**
     * @component MenuItems
     * @description 메뉴 아이템 컴포넌트
     */
    const MenuItems = () => {
        return menu.map((item) => (
            <Tooltip title={siderCollapsed ? item.name : ''} placement="right" key={item.value}>
                <div
                    className={`${soMainStyles.siderMenuItem} ${selectedMenu === item.value ? soMainStyles.menuItemSelected : ''}`}
                    onClick={() => handleMenuClick(item.value)}>
                    {selectedMenu === item.value ? item.selIcon : item.icon}
                    <span className={soMainStyles.sliderCollapseButtonText}>{siderCollapsed ? '' : item.name}</span>
                </div>
            </Tooltip>
        ))
    }

    useEffect(() => {
        if (!containerRef?.current) return

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const width = entry.contentRect.width
                setSiderCollapsed(width <= 900)
            }
        })

        resizeObserver.observe(containerRef.current)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    return (
        <Sider width={240} collapsed={siderCollapsed} className={soMainStyles.sider} style={{ background: 'white' }}>
            <div className={siderCollapsed ? soMainStyles.siderHeaderSmall : soMainStyles.siderHeader}>
                {siderCollapsed ? '' : <div className={soMainStyles.siderLogo}>BizSync</div>}
                <Tooltip title={siderCollapsed ? '메뉴 열기' : '메뉴 닫기'} placement="right">
                    <Button
                        onClick={() => setSiderCollapsed(!siderCollapsed)}
                        shape="circle"
                        icon={<MenuOutlined />}
                        className={soMainStyles.siderCollapseButton}
                    />
                </Tooltip>
            </div>
            <div className={soMainStyles.siderMenu}>
                <Button
                    type="primary"
                    onClick={() => (navigate('/so/estimate'), setSelectedMenu('estimate'))}
                    className={soMainStyles.siderCreateButton}>
                    <Flex align="center" justify="center" gap={6}>
                        <FormOutlined className={soMainStyles.sliderIcon} />
                        {siderCollapsed ? '' : <span>견적서 작성하기</span>}
                    </Flex>
                </Button>
                <MenuItems />
            </div>
        </Sider>
    )
}
