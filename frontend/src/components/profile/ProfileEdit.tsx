import { useState, ReactNode } from 'react'
import { Form, Input, Button, message, Layout, Typography, Divider } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { profileStyles } from '../../styles/content/profile.styles'
import { validateEmail, validatePhone } from '../../utils/validation'
import type { Rule } from 'antd/es/form'

const { Title, Text } = Typography

interface ProfileData {
    name: string
    email: string
    phone: string
}

const initialProfileData: ProfileData = {
    name: '홍길동',
    email: 'hong@example.com',
    phone: '010-1234-5678',
}

const ProfileEdit = () => {
    const [form] = Form.useForm()
    const [profileData, setProfileData] = useState<ProfileData>(initialProfileData)
    const [editingField, setEditingField] = useState<string | null>(null)

    // 편집 모드 시작
    const startEditing = (field: string) => {
        setEditingField(field)
        form.setFieldsValue({ [field]: profileData[field as keyof ProfileData] })
    }

    // 편집 취소
    const cancelEditing = () => {
        setEditingField(null)
    }

    // 변경사항 저장
    const saveChanges = async (field: string) => {
        try {
            const value = await form.validateFields([field])
            const updatedData = { ...profileData, ...value }

            // 모의 API 호출
            await new Promise((resolve) => setTimeout(resolve, 500))

            setProfileData(updatedData)
            setEditingField(null)
            message.success(`${getFieldLabel(field)}이(가) 업데이트되었습니다.`)
        } catch (error) {
            console.error('저장 실패:', error)
        }
    }

    // 필드 이름에 따라 라벨 반환
    const getFieldLabel = (field: string): string => {
        const labels: Record<string, string> = {
            name: '이름',
            email: '이메일',
            phone: '휴대폰번호',
        }
        return labels[field] || field
    }

    // 필드 이름에 따라 아이콘 반환
    const getFieldIcon = (field: string) => {
        const icons: Record<string, ReactNode> = {
            name: <UserOutlined />,
            email: <MailOutlined />,
            phone: <PhoneOutlined />,
        }
        return icons[field] || null
    }

    // 정보 항목 컴포넌트
    const InfoItem = ({ field, icon }: { field: keyof ProfileData; icon?: ReactNode }) => {
        const isEditing = editingField === field

        const getValidationRules = (field: keyof ProfileData): Rule[] => {
            const rules: Rule[] = [{ required: true, message: `${getFieldLabel(field)}을(를) 입력해주세요` }]

            if (field === 'email') {
                rules.push({
                    validator: async (_: any, value: string) => {
                        if (value && !validateEmail(value)) {
                            throw new Error('올바른 이메일 형식이 아닙니다')
                        }
                    },
                })
            }

            if (field === 'phone') {
                rules.push({
                    validator: async (_: any, value: string) => {
                        if (value && !validatePhone(value)) {
                            throw new Error('올바른 휴대폰 번호 형식이 아닙니다 (예: 010-1234-5678)')
                        }
                    },
                })
            }

            return rules
        }

        return (
            <>
                <div className={profileStyles.infoItem}>
                    <div style={{ width: '100%' }}>
                        <Text className={profileStyles.infoLabel}>{getFieldLabel(field)}</Text>
                        <div className={profileStyles.valueContainer}>
                            {isEditing ? (
                                <Form.Item name={field} className="mb-0" rules={getValidationRules(field)}>
                                    <Input
                                        type={field === 'email' ? 'email' : 'number'}
                                        prefix={icon}
                                        placeholder={`${getFieldLabel(field)}을(를) 입력하세요`}
                                        className={profileStyles.input}
                                    />
                                </Form.Item>
                            ) : (
                                <div className={profileStyles.infoValue}>{profileData[field]}</div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center">
                        {isEditing ? (
                            <div className={profileStyles.editActions}>
                                <Button type="default" onClick={cancelEditing} icon={<CloseOutlined />}>
                                    취소
                                </Button>
                                <Button type="primary" onClick={() => saveChanges(field)} icon={<CheckOutlined />}>
                                    저장
                                </Button>
                            </div>
                        ) : (
                            <Button
                                type="default"
                                className={profileStyles.infoEditButton}
                                onClick={() => startEditing(field)}
                                icon={<EditOutlined />}>
                                편집
                            </Button>
                        )}
                    </div>
                </div>
                <Divider className={profileStyles.divider} />
            </>
        )
    }

    return (
        <Layout className={profileStyles.container}>
            <Title level={2} className={profileStyles.title}>
                내 정보
            </Title>

            <Text className={profileStyles.sectionDescription}>계정 정보를 확인하고 필요한 경우 수정할 수 있습니다.</Text>

            <Form form={form} className={profileStyles.form}>
                <div className={profileStyles.infoSection}>
                    <InfoItem field="name" icon={<UserOutlined />} />
                    <InfoItem field="email" icon={<MailOutlined />} />
                    <InfoItem field="phone" icon={<PhoneOutlined />} />
                </div>
            </Form>
        </Layout>
    )
}

export default ProfileEdit
