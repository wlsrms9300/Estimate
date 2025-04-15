import { useState, useEffect } from 'react'
import { Form, Input, Button, Typography, Divider } from 'antd'
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { useForm, Controller } from 'react-hook-form'
import { profileStyles } from '../../styles/content/profile.styles'
import { validateEmail, validatePhone } from '../../utils/validation'
import { maskPhone } from '../../utils/mask'

interface ProfileData {
    userName: string
    email: string
    userPhone: string
}

interface InfoItemProps {
    field: keyof ProfileData
    initialValue: string
    onSave: (field: keyof ProfileData, value: string) => void
    isEditing: boolean
    onStartEditing: (field: keyof ProfileData) => void
    onCancelEditing: () => void
    setIsEmailModalOpen?: (isOpen: boolean) => void
}

export default function InfoItem({ field, initialValue, onSave, isEditing, onStartEditing, onCancelEditing, setIsEmailModalOpen }: InfoItemProps) {
    const [value, setValue] = useState(initialValue)
    const { control, setValue: setFormValue } = useForm({
        defaultValues: { [field]: initialValue },
        mode: 'onChange',
    })

    const getFieldLabel = (field: keyof ProfileData): string => {
        const labels: Record<keyof ProfileData, string> = {
            userName: '이름',
            email: '이메일',
            userPhone: '휴대폰번호',
        }
        return labels[field]
    }

    /**
     * @function handleEdit
     * @description 수정 버튼 클릭 시 이벤트
     */
    const handleEdit = () => {
        if (field === 'email') {
            setIsEmailModalOpen?.(true)
        } else {
            onStartEditing(field)
        }
    }

    /**
     * @function handleSave
     * @description 저장 버튼 클릭 시 이벤트
     */
    const handleSave = () => {
        onSave(field, value)
        onCancelEditing()
    }

    /**
     * @function handleCancel
     * @description 취소 버튼 클릭 시 이벤트
     */
    const handleCancel = () => {
        setValue(initialValue)
        setFormValue(field, initialValue)
        onCancelEditing()
    }

    useEffect(() => {
        setValue(initialValue)
        setFormValue(field, initialValue)
    }, [initialValue])

    return (
        <>
            <div className={profileStyles.infoItem}>
                <div style={{ width: '100%' }}>
                    <Typography.Text className={profileStyles.infoLabel}>{getFieldLabel(field)}</Typography.Text>
                    <div className={profileStyles.valueContainer}>
                        {isEditing ? (
                            <Controller
                                name={field}
                                control={control}
                                rules={{
                                    required: `${getFieldLabel(field)}을(를) 입력해주세요`,
                                    validate: (value) => {
                                        if (field === 'email') return validateEmail(value) || '올바른 이메일 형식이 아닙니다'
                                        if (field === 'userPhone')
                                            return validatePhone(value) || '올바른 휴대폰 번호 형식이 아닙니다 (예: 010-1234-5678)'
                                        return true
                                    },
                                }}
                                render={({ field: controllerField, fieldState: { error } }) => (
                                    <Form.Item
                                        className={`mb-0 ${profileStyles.formItemError} ${profileStyles.formItem}`}
                                        validateStatus={error ? 'error' : ''}
                                        help={
                                            error?.message ? (
                                                <Typography.Text className="!text-red-500 ml-1 !text-[12px]">{error.message}</Typography.Text>
                                            ) : (
                                                ''
                                            )
                                        }>
                                        <Input
                                            {...controllerField}
                                            type="text"
                                            placeholder={`${getFieldLabel(field)}을(를) 입력하세요`}
                                            className={profileStyles.input}
                                            maxLength={field === 'userPhone' ? 11 : undefined}
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
                            <div className={initialValue ? profileStyles.infoValue : profileStyles.emptyValue}>
                                {initialValue ? (field === 'userPhone' ? maskPhone(initialValue) : initialValue) : '미등록'}
                            </div>
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
                        <Button type="default" className={profileStyles.infoEditButton} onClick={handleEdit} icon={<EditOutlined />}>
                            수정
                        </Button>
                    )}
                </div>
            </div>
            <Divider className={profileStyles.divider} />
        </>
    )
}
