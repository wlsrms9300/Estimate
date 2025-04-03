import 'antd/dist/reset.css'
import './assets/css/index.css'
import { theme } from './styles/theme'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider, App, Spin } from 'antd'
import { lazy, Suspense } from 'react'

// lazy-loaded pages / components
const Introduce = lazy(() => import('./pages/Introduce'))
const MainLayout = lazy(() => import('./pages/MainLayout'))
const AuthExpire = lazy(() => import('./pages/AuthExpire'))
const EstimateMenu = lazy(() => import('./components/content/EstimateMenu'))
const ProfileEdit = lazy(() => import('./components/profile/ProfileEdit'))

// auth
import PrivateRoute from './components/auth/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

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

// 로딩 중 표시할 컴포넌트
const LoadingFallback = () => (
    <div className="flex h-screen w-full items-center justify-center">
        <Spin size="large" />
    </div>
)

function MyApp() {
    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider theme={theme}>
                <AuthProvider>
                    <App>
                        <BrowserRouter>
                            <Suspense fallback={<LoadingFallback />}>
                                <Routes>
                                    <Route path="/" element={<Introduce />} />
                                    <Route path="/authExpire" element={<AuthExpire />} />
                                    <Route element={<PrivateRoute />}>
                                        <Route path="/so" element={<MainLayout />}>
                                            <Route path="estimate" element={<EstimateMenu />} />
                                            <Route path="profile" element={<ProfileEdit />} />
                                        </Route>
                                    </Route>
                                </Routes>
                            </Suspense>
                        </BrowserRouter>
                    </App>
                </AuthProvider>
            </ConfigProvider>
        </QueryClientProvider>
    )
}

export default MyApp
