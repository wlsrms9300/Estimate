// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react'
import { Button, Layout } from 'antd'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Pagination, Autoplay } from 'swiper/modules'
import { HomeOutlined, FileTextOutlined, SettingOutlined, UserOutlined, BellOutlined } from '@ant-design/icons'
const { Header, Sider, Content } = Layout

const Introduce: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'home' | 'dashboard'>('home')
    const [siderCollapsed, setSiderCollapsed] = useState(false)
    const logoImage = 'https://public.readdy.ai/ai/img_res/d3865a1bd9b9d4b1a381ca36cc69a4b4.jpg'
    const heroImage = 'https://public.readdy.ai/ai/img_res/7f809449d14dab68b1e4bf06d1c09041.jpg'
    if (currentPage === 'home') {
        return (
            <div className="min-h-screen bg-gradient-to-r from-[#00c4cc] via-[#6366f1] to-[#8b3dff] font-['Nunito']">
                <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet" />
                <header className="fixed w-full bg-white bg-opacity-5 backdrop-blur-lg z-50 border-b border-white border-opacity-10">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="text-2xl font-bold text-white">PayWork</div>
                        <nav className="flex items-center space-x-10">
                            <a className="text-white hover:text-gray-200 cursor-pointer whitespace-nowrap">서비스 소개</a>
                            <a className="text-white hover:text-gray-200 cursor-pointer whitespace-nowrap">요금제</a>
                            <a className="text-white hover:text-gray-200 cursor-pointer whitespace-nowrap">고객지원</a>
                            <Button
                                onClick={() => setCurrentPage('dashboard')}
                                className="!rounded-button bg-white bg-opacity-95 text-[#00c4cc] border-none hover:bg-opacity-100 hover:shadow-lg transition-all duration-300 whitespace-nowrap">
                                시작하기
                            </Button>
                        </nav>
                    </div>
                </header>
                <main>
                    <section className="pt-32 pb-20 px-6">
                        <div className="max-w-7xl mx-auto flex items-center">
                            <div className="w-1/2 pr-12">
                                <h1 className="text-5xl font-bold text-white mb-6">스마트한 견적서 자동생성</h1>
                                <p className="text-xl text-white mb-8">
                                    복잡한 견적서 작성 과정을 자동화하여 업무 효율을 높이세요. AI 기반 견적서 자동생성으로 시간을 절약하고 정확성을
                                    높일 수 있습니다.
                                </p>
                                <Button
                                    onClick={() => setCurrentPage('dashboard')}
                                    className="!rounded-button text-lg px-8 py-6 h-auto bg-white bg-opacity-95 text-[#00c4cc] border-none hover:bg-opacity-100 hover:shadow-xl transition-all duration-300 whitespace-nowrap">
                                    무료로 시작하기
                                </Button>
                            </div>
                            <div className="w-1/2">
                                <img
                                    src={heroImage}
                                    alt="Hero"
                                    className="rounded-xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
    return (
        <Layout className="min-h-screen">
            <Sider width={240} collapsed={siderCollapsed} className="bg-white border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <div className="text-xl font-bold text-gray-800">PayWork</div>
                </div>
                <div className="py-4">
                    <div className="px-4 py-2 text-gray-600 font-medium">작성하기</div>
                    <div className="px-4 py-2 text-gray-600 font-medium">서류함</div>
                    <div className="px-4 py-2 text-gray-600 font-medium">청산</div>
                    <div className="px-4 py-2 text-gray-600 font-medium">요금제</div>
                    <div className="px-4 py-2 text-gray-600 font-medium">사업 관리</div>
                    <div className="px-4 py-2 text-gray-600 font-medium">공지사항</div>
                    <div className="px-4 py-2 text-gray-600 font-medium">내 정보</div>
                </div>
            </Sider>
            <Layout>
                <Header className="bg-white border-b border-gray-200 px-6 flex items-center justify-between">
                    <div className="text-xl font-medium">바로 작성해 보세요</div>
                    <div className="flex items-center space-x-4">
                        <BellOutlined className="text-xl text-gray-600 cursor-pointer" />
                        <UserOutlined className="text-xl text-gray-600 cursor-pointer" />
                    </div>
                </Header>
                <Content className="bg-gray-50 p-6">
                    <div className="mb-8">
                        <h2 className="text-lg font-medium mb-4">거래 서류 작성</h2>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                <FileTextOutlined className="text-2xl text-[#00c4cc] mb-3" />
                                <div className="font-medium">견적서</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                <FileTextOutlined className="text-2xl text-[#8b3dff] mb-3" />
                                <div className="font-medium">거래명세서</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                <FileTextOutlined className="text-2xl text-[#00c4cc] mb-3" />
                                <div className="font-medium">발주서</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                <FileTextOutlined className="text-2xl text-[#8b3dff] mb-3" />
                                <div className="font-medium">영수증</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-medium mb-4">세금 신고용 작성</h2>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                <FileTextOutlined className="text-2xl text-[#00c4cc] mb-3" />
                                <div className="font-medium">현금영수증</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                <FileTextOutlined className="text-2xl text-[#8b3dff] mb-3" />
                                <div className="font-medium">세금계산서</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                <FileTextOutlined className="text-2xl text-[#00c4cc] mb-3" />
                                <div className="font-medium">계산서</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                <FileTextOutlined className="text-2xl text-[#8b3dff] mb-3" />
                                <div className="font-medium">신용카드매출전표</div>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}
export default Introduce
