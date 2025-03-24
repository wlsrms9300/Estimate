import { useState } from 'react'
import { Layout } from 'antd'
import { FileTextOutlined, SettingOutlined, UserOutlined, BellOutlined } from '@ant-design/icons'
import { soMainStyles } from '../../styles/somain.styles'
import { useNavigate } from 'react-router-dom'

const { Header, Sider, Content } = Layout

export default function Navigation() {
    const navigate = useNavigate()
    const [siderCollapsed, setSiderCollapsed] = useState(false)

    return (
        <Sider width={240} collapsed={siderCollapsed} className={soMainStyles.sider} style={{ background: 'white' }}>
            <div className={soMainStyles.siderHeader}>
                <div className={soMainStyles.siderLogo}>BizSync</div>
            </div>
            <div className={soMainStyles.siderMenu}>
                <div className={soMainStyles.siderMenuItem} onClick={() => navigate('/so/estimate')}>
                    작성하기
                </div>
                <div className={soMainStyles.siderMenuItem}>서류함</div>
                <div className={soMainStyles.siderMenuItem}>요금제</div>
                <div className={soMainStyles.siderMenuItem}>업체 관리</div>
                <div className={soMainStyles.siderMenuItem}>공지사항</div>
                <div className={soMainStyles.siderMenuItem}>내 정보</div>
            </div>
        </Sider>
    )
}
