import { useState } from 'react'
import { Layout } from 'antd'
import { FileTextOutlined, SettingOutlined, UserOutlined, BellOutlined } from '@ant-design/icons'
import { estimateMenuStyles } from '../../styles/content/estimatemenu.styles'
import { useNavigate } from 'react-router-dom'

export default function EstimateMenu() {
    const navigate = useNavigate()

    return (
        <div className={estimateMenuStyles.contentContainer}>
            <div className={estimateMenuStyles.contentGrid}>
                <div className={estimateMenuStyles.newEstimateCard}>
                    <div className="flex items-center justify-between" onClick={() => navigate('/so/add/estimate')}>
                        <div>
                            <h3 className={estimateMenuStyles.newEstimateTitle}>새 견적서 작성하기</h3>
                            <p className={estimateMenuStyles.newEstimateDescription}>견적서 생성 시스템으로 빠르고 정확하게 작성하세요</p>
                        </div>
                        <FileTextOutlined className={estimateMenuStyles.newEstimateIcon} />
                    </div>
                </div>

                <div className={estimateMenuStyles.subGrid}>
                    <div className={estimateMenuStyles.subCard}>
                        <div className={estimateMenuStyles.subCardContent}>
                            <div className={estimateMenuStyles.templateIconBg}>
                                <FileTextOutlined className={estimateMenuStyles.subCardIcon} />
                            </div>
                            <div>
                                <h4 className={estimateMenuStyles.subCardTitle}>템플릿</h4>
                                <p className={estimateMenuStyles.subCardDescription}>맞춤형 견적서 양식</p>
                            </div>
                        </div>
                    </div>

                    <div className={estimateMenuStyles.subCard}>
                        <div className={estimateMenuStyles.subCardContent}>
                            <div className={estimateMenuStyles.settingIconBg}>
                                <SettingOutlined className={estimateMenuStyles.settingIcon} />
                            </div>
                            <div>
                                <h4 className={estimateMenuStyles.subCardTitle}>설정</h4>
                                <p className={estimateMenuStyles.subCardDescription}>견적서 기본 설정</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
