import { notification } from 'antd'

export const openNotification = (message: string, description: string, type: 'success' | 'error') => {
    notification[type]({
        message: message,
        description: description,
        placement: 'bottomRight',
        duration: 5,
    })
}
