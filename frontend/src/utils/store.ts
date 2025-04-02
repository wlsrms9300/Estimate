import { useAuthStore } from '../stores/authStore'
// 다른 store들도 import 해서 추가

export const resetAllStores = () => {
    // auth store 초기화
    useAuthStore.getState().reset()
    // 다른 store들도 초기화
    // useOtherStore.getState().reset()
}
