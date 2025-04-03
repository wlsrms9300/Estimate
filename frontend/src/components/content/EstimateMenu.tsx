import { useState } from 'react'
import { Layout } from 'antd'
import { FileTextOutlined, SettingOutlined, UserOutlined, BellOutlined } from '@ant-design/icons'
import { estimateMenuStyles } from '../../styles/content/estimatemenu.styles'

export default function EstimateMenu() {
    return (
        <div className={estimateMenuStyles.contentContainer}>
            <div className={estimateMenuStyles.contentGrid}>
                <div className={estimateMenuStyles.newEstimateCard}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className={estimateMenuStyles.newEstimateTitle}>새 견적서 작성하기</h3>
                            <p className={estimateMenuStyles.newEstimateDescription}>
                                AI 기반 자동 견적서 생성 시스템으로 빠르고 정확하게 작성하세요
                            </p>
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
