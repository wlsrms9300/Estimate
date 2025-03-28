import 'antd/dist/reset.css'
import './assets/css/index.css'
import { theme } from './styles/theme'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider, App } from 'antd'

// pages
import Introduce from './pages/Introduce'
import MainLayout from './pages/MainLayout'
import EstimateMenu from './components/content/EstimateMenu'

// (response) => {
//     notification.info({
//         message: '이메일 인증 코드가 발송되었습니다.',
//         description: '이메일을 확인해주세요.',
//         placement: 'bottomRight',
//         duration: 5,
//     })
//     handleNext()
// },
// (error) => {
//     notification.error({
//         message: '이메일 인증 코드 발송 실패',
//         description: '이메일을 확인해주세요.',
//         placement: 'bottomRight',
//         duration: 5,
//     })
// },

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 2,
        },
        mutations: {
            onSuccess: (data: any) => {
                console.log('--------------------------------data', data)
                console.log('Mutation succeeded:', data)
            },
            onError: (error: any) => {
                console.error('--------------------------------error', error)
                console.error('Mutation failed:', error)
            },
        },
    },
})

function MyApp() {
    // const { message, modal, notification } = App.useApp()

    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider theme={theme}>
                <App>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Introduce />} />
                            <Route path="/so" element={<MainLayout />}>
                                <Route path="estimate" element={<EstimateMenu />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </App>
            </ConfigProvider>
        </QueryClientProvider>
    )
}

export default MyApp
