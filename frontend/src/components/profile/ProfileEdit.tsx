import { useState, ReactNode } from 'react'
import { Form, Input, Button, message, Layout, Typography, Divider } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { useForm, Controller } from 'react-hook-form'
import { profileStyles } from '../../styles/content/profile.styles'
import { validateEmail, validatePhone } from '../../utils/validation'
import { useGetProfile } from '../../hooks/account/authService'

const { Title, Text } = Typography

interface ProfileData {
    name: string
    email: string
    phone: string
}

interface InfoItemProps {
    field: keyof ProfileData
    icon: ReactNode
    initialValue: string
    onSave: (field: keyof ProfileData, value: string) => Promise<void>
    isEditing: boolean
    onStartEditing: (field: keyof ProfileData) => void
    onCancelEditing: () => void
}

const InfoItem = ({ field, icon, initialValue, onSave, isEditing, onStartEditing, onCancelEditing }: InfoItemProps) => {
    const [value, setValue] = useState(initialValue)
    const { control, setValue: setFormValue } = useForm({
        defaultValues: { [field]: initialValue },
        mode: 'onChange',
    })

    const getFieldLabel = (field: keyof ProfileData): string => {
        const labels: Record<keyof ProfileData, string> = {
            name: '이름',
            email: '이메일',
            phone: '휴대폰번호',
        }
        return labels[field]
    }

    const handleSave = async () => {
        await onSave(field, value)
        onCancelEditing()
    }

    const handleCancel = () => {
        setValue(initialValue)
        setFormValue(field, initialValue)
        onCancelEditing()
    }

    return (
        <>
            <div className={profileStyles.infoItem}>
                <div style={{ width: '100%' }}>
                    <Text className={profileStyles.infoLabel}>{getFieldLabel(field)}</Text>
                    <div className={profileStyles.valueContainer}>
                        {isEditing ? (
                            <Controller
                                name={field}
                                control={control}
                                rules={{
                                    required: `${getFieldLabel(field)}을(를) 입력해주세요`,
                                    validate: (value) => {
                                        if (field === 'email') return validateEmail(value) || '올바른 이메일 형식이 아닙니다'
                                        if (field === 'phone') return validatePhone(value) || '올바른 휴대폰 번호 형식이 아닙니다 (예: 010-1234-5678)'
                                        return true
                                    },
                                }}
                                render={({ field: controllerField, fieldState: { error } }) => (
                                    <Form.Item
                                        className={`mb-0 ${profileStyles.formItemError} ${profileStyles.formItem}`}
                                        validateStatus={error ? 'error' : ''}
                                        help={
                                            error?.message ? (
                                                <Typography.Text className="!text-red-500 ml-2.5 !text-[12px]">{error.message}</Typography.Text>
                                            ) : (
                                                ''
                                            )
                                        }>
                                        <Input
                                            {...controllerField}
                                            type="text"
                                            // prefix={icon}
                                            placeholder={`${getFieldLabel(field)}을(를) 입력하세요`}
                                            className={profileStyles.input}
                                            size="large"
                                            allowClear
                                            onChange={(e) => {
                                                controllerField.onChange(e)
                                                setValue(e.target.value)
                                            }}
                                        />
                                    </Form.Item>
                                )}
                            />
                        ) : (
                            <div className={value ? profileStyles.infoValue : profileStyles.emptyValue}>{value || '미등록'}</div>
                        )}
                    </div>
                </div>

                <div className="flex items-center">
                    {isEditing ? (
                        <div className={profileStyles.editActions}>
                            <Button type="default" onClick={handleCancel} icon={<CloseOutlined />}>
                                취소
                            </Button>
                            <Button type="primary" onClick={handleSave} icon={<CheckOutlined />}>
                                저장
                            </Button>
                        </div>
                    ) : (
                        <Button type="default" className={profileStyles.infoEditButton} onClick={() => onStartEditing(field)} icon={<EditOutlined />}>
                            수정
                        </Button>
                    )}
                </div>
            </div>
            <Divider className={profileStyles.divider} />
        </>
    )
}

const ProfileEdit = () => {
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
                        icon={<MailOutlined />}
                        initialValue={profile?.userId || ''}
                        onSave={handleSave}
                        isEditing={editingField === 'email'}
                        onStartEditing={handleStartEditing}
                        onCancelEditing={handleCancelEditing}
                    />
                    <InfoItem
                        field="name"
                        icon={<UserOutlined />}
                        initialValue={profile?.userName || ''}
                        onSave={handleSave}
                        isEditing={editingField === 'name'}
                        onStartEditing={handleStartEditing}
                        onCancelEditing={handleCancelEditing}
                    />
                    <InfoItem
                        field="phone"
                        icon={<PhoneOutlined />}
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

export default ProfileEdit
