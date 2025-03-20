import 'antd/dist/reset.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
import { getMembers } from './services/memberService'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
})

function MemberList() {
    const {
        data: members,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['members'],
        queryFn: getMembers,
    })

    if (isLoading) return <div>로딩 중...</div>
    if (error) return <div>에러가 발생했습니다: {error.message}</div>

    return (
        <div>
            <h2>멤버 목록</h2>
            <ul>
                {members?.map((member) => (
                    <li key={member.id}>{member.user_id}</li>
                ))}
            </ul>
        </div>
    )
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div>
                                    <h1>API 테스트</h1>
                                    <MemberList />
                                </div>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </RecoilRoot>
        </QueryClientProvider>
    )
}

export default App
