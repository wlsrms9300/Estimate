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

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 2,
        },
        mutations: {
            // queryClient → useMutation → mutate 순으로 오버라이드
            onSuccess: (data: any) => {
                console.log('Mutation success:', data)
            },
            onSettled: (data: any) => {
                console.log('Mutation settled:', data)
            },
            onError: (error: any) => {
                console.error('Mutation failed:', error)
            },
        },
    },
})

function MyApp() {
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
