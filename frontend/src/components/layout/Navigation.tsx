import { useState, useEffect } from 'react'
import { Layout, Button, Tooltip, Flex } from 'antd'
import {
    FormOutlined,
    DollarCircleOutlined,
    DollarCircleFilled,
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
                <Tooltip title={siderCollapsed ? '서류함' : ''} placement="right">
                    <div
                        className={`${soMainStyles.siderMenuItem} ${selectedMenu === 'documents' ? soMainStyles.menuItemSelected : ''}`}
                        onClick={() => handleMenuClick('documents')}>
                        {selectedMenu === 'documents' ? (
                            <FolderOpenFilled className={soMainStyles.sliderIcon} />
                        ) : (
                            <FolderOpenOutlined className={soMainStyles.sliderIcon} />
                        )}
                        <span className={soMainStyles.sliderCollapseButtonText}>{siderCollapsed ? '' : '서류함'}</span>
                    </div>
                </Tooltip>
                <Tooltip title={siderCollapsed ? '요금제' : ''} placement="right">
                    <div
                        className={`${soMainStyles.siderMenuItem} ${selectedMenu === 'plan' ? soMainStyles.menuItemSelected : ''}`}
                        onClick={() => handleMenuClick('plan')}>
                        {selectedMenu === 'plan' ? (
                            <DollarCircleFilled className={soMainStyles.sliderIcon} />
                        ) : (
                            <DollarCircleOutlined className={soMainStyles.sliderIcon} />
                        )}
                        <span className={soMainStyles.sliderCollapseButtonText}>{siderCollapsed ? '' : '요금제'}</span>
                    </div>
                </Tooltip>
                <Tooltip title={siderCollapsed ? '업체 관리' : ''} placement="right">
                    <div
                        className={`${soMainStyles.siderMenuItem} ${selectedMenu === 'company' ? soMainStyles.menuItemSelected : ''}`}
                        onClick={() => handleMenuClick('company')}>
                        {selectedMenu === 'company' ? (
                            <ProductFilled className={soMainStyles.sliderIcon} />
                        ) : (
                            <ProductOutlined className={soMainStyles.sliderIcon} />
                        )}
                        <span className={soMainStyles.sliderCollapseButtonText}>{siderCollapsed ? '' : '업체 관리'}</span>
                    </div>
                </Tooltip>
                <Tooltip title={siderCollapsed ? '공지사항' : ''} placement="right">
                    <div
                        className={`${soMainStyles.siderMenuItem} ${selectedMenu === 'notice' ? soMainStyles.menuItemSelected : ''}`}
                        onClick={() => handleMenuClick('notice')}>
                        {selectedMenu === 'notice' ? (
                            <NotificationFilled className={soMainStyles.sliderIcon} />
                        ) : (
                            <NotificationOutlined className={soMainStyles.sliderIcon} />
                        )}
                        <span className={soMainStyles.sliderCollapseButtonText}>{siderCollapsed ? '' : '공지사항'}</span>
                    </div>
                </Tooltip>
            </div>
        </Sider>
    )
}
