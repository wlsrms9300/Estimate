import { useState } from 'react'
import { message, Layout, Typography } from 'antd'
import { profileStyles } from '../../styles/content/profile.styles'
import { validateEmail, validatePhone } from '../../utils/validation'
import { useGetProfile, useUpdateProfile } from '../../hooks/account/authService'
import { useQueryClient } from '@tanstack/react-query'

// components
import InfoItem from './InfoItem'

interface ProfileData {
    userName: string
    email: string
    userPhone: string
}

export default function ProfileEdit() {
    const queryClient = useQueryClient()
    const { data: profile } = useGetProfile()
    const [editingField, setEditingField] = useState<keyof ProfileData | null>(null)

    const { mutate: updateProfile } = useUpdateProfile()

    const handleSave = (field: keyof ProfileData, value: string) => {
        if (field === 'userName' && value.length < 2) {
            message.error('이름은 2자 이상 입력해주세요')
            return
        }

        if (field === 'userPhone' && !validatePhone(value)) {
            message.error('올바른 휴대폰 번호 형식이 아닙니다')
            return
        }

        saveProfile(field, value)
    }

    /**
     * @function saveProfile
     * @description 프로필 수정 api 호출
     */
    const saveProfile = async (field: keyof ProfileData, value: string) => {
        // POST 호출
        updateProfile(
            {
                [field]: value,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['profile'] })
                    setEditingField(null)
                },
            },
        )
    }

    // const getFieldLabel = (field: keyof ProfileData): string => {
    //     const labels: Record<keyof ProfileData, string> = {
    //         userName: '이름',
    //         email: '이메일',
    //         userPhone: '휴대폰번호',
    //     }
    //     return labels[field]
    // }

    const handleStartEditing = (field: keyof ProfileData) => {
        setEditingField(field)
    }

    const handleCancelEditing = () => {
        setEditingField(null)
    }

    return (
        <Layout className={profileStyles.container}>
            <Typography.Title level={2} className={profileStyles.title}>
                내 정보
            </Typography.Title>

            <Typography.Text className={profileStyles.sectionDescription}>계정 정보를 확인하고 필요한 경우 수정할 수 있습니다.</Typography.Text>

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
                        field="userName"
                        initialValue={profile?.userName || ''}
                        onSave={handleSave}
                        isEditing={editingField === 'userName'}
                        onStartEditing={handleStartEditing}
                        onCancelEditing={handleCancelEditing}
                    />
                    <InfoItem
                        field="userPhone"
                        initialValue={profile?.userPhone || ''}
                        onSave={handleSave}
                        isEditing={editingField === 'userPhone'}
                        onStartEditing={handleStartEditing}
                        onCancelEditing={handleCancelEditing}
                    />
                </div>
            </div>
        </Layout>
    )
}
