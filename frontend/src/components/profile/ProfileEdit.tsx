import { useState, ReactNode } from 'react'
import { Form, Input, Button, message, Layout, Typography, Divider } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { useForm, Controller } from 'react-hook-form'
import { profileStyles } from '../../styles/content/profile.styles'
import { validateEmail, validatePhone } from '../../utils/validation'
import { useGetProfile } from '../../hooks/account/authService'
// components
import InfoItem from './InfoItem'

const { Title, Text } = Typography

interface ProfileData {
    name: string
    email: string
    phone: string
}

export default function ProfileEdit() {
    const { data: profile } = useGetProfile()
    const [editingField, setEditingField] = useState<keyof ProfileData | null>(null)

    const handleSave = async (field: keyof ProfileData, value: string) => {
        try {
            if (field === 'email' && !validateEmail(value)) {
                message.error('올바른 이메일 형식이 아닙니다')
                return
            }
            if (field === 'phone' && !validatePhone(value)) {
                message.error('올바른 휴대폰 번호 형식이 아닙니다')
                return
            }

            // 모의 API 호출
            await new Promise((resolve) => setTimeout(resolve, 500))
            message.success(`${getFieldLabel(field)}이(가) 업데이트되었습니다.`)
        } catch (error) {
            console.error('저장 실패:', error)
        }
    }

    const getFieldLabel = (field: keyof ProfileData): string => {
        const labels: Record<keyof ProfileData, string> = {
            name: '이름',
            email: '이메일',
            phone: '휴대폰번호',
        }
        return labels[field]
    }

    const handleStartEditing = (field: keyof ProfileData) => {
        setEditingField(field)
    }

    const handleCancelEditing = () => {
        setEditingField(null)
    }

    return (
        <Layout className={profileStyles.container}>
            <Title level={2} className={profileStyles.title}>
                내 정보
            </Title>

            <Text className={profileStyles.sectionDescription}>계정 정보를 확인하고 필요한 경우 수정할 수 있습니다.</Text>

            <div className={profileStyles.form}>
                <div className={profileStyles.infoSection}>
                    <InfoItem
                        field="email"
                        initialValue={profile?.userId || ''}
                        onSave={handleSave}
                        isEditing={editingField === 'email'}
                        onStartEditing={handleStartEditing}
                        onCancelEditing={handleCancelEditing}
                    />
                    <InfoItem
                        field="name"
                        initialValue={profile?.userName || ''}
                        onSave={handleSave}
                        isEditing={editingField === 'name'}
                        onStartEditing={handleStartEditing}
                        onCancelEditing={handleCancelEditing}
                    />
                    <InfoItem
                        field="phone"
                        initialValue={profile?.userPhone || ''}
                        onSave={handleSave}
                        isEditing={editingField === 'phone'}
                        onStartEditing={handleStartEditing}
                        onCancelEditing={handleCancelEditing}
                    />
                </div>
            </div>
        </Layout>
    )
}
