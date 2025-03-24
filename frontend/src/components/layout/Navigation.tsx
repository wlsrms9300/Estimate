import { useState } from 'react'
import { Layout, Button, Tooltip, Flex } from 'antd'
import { FormOutlined, SettingOutlined, UserOutlined, BellOutlined, MenuOutlined } from '@ant-design/icons'
import { soMainStyles } from '../../styles/somain.styles'
import { useNavigate } from 'react-router-dom'

const { Header, Sider, Content } = Layout

export default function Navigation() {
    const navigate = useNavigate()
    const [siderCollapsed, setSiderCollapsed] = useState(false)

    return (
        <Sider width={240} collapsed={siderCollapsed} className={soMainStyles.sider} style={{ background: 'white' }}>
            <div className={soMainStyles.siderHeader}>
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
                <Button type="primary" onClick={() => navigate('/so/estimate')} className={soMainStyles.siderCreateButton}>
                    <Flex align="center" justify="center" gap={6}>
                        <FormOutlined className="text-lg mr-0" />
                        {siderCollapsed ? '' : <span>견적서 작성하기</span>}
                    </Flex>
                </Button>
                <div className={soMainStyles.siderMenuItem}>서류함</div>
                <div className={soMainStyles.siderMenuItem}>요금제</div>
                <div className={soMainStyles.siderMenuItem}>업체 관리</div>
                <div className={soMainStyles.siderMenuItem}>공지사항</div>
                <div className={soMainStyles.siderMenuItem}>내 정보</div>
            </div>
        </Sider>
    )
}
