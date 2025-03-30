import { App } from 'antd'
import { useCallback } from 'react'

type NotificationType = 'info' | 'success' | 'error'
type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

const useCustomNotification = () => {
    const { notification } = App.useApp()

    const openNotification = useCallback(
        (type: NotificationType, message: string, description?: string, duration?: number, placement?: NotificationPlacement) => {
            notification[type]({
                message,
                description,
                duration: duration || 5,
                placement: placement || 'bottomRight',
            })
        },
        [notification],
    )

    return { openNotification }
}

export default useCustomNotification
