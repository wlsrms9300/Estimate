import { useState } from 'react'
import { Button, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { introduceStyles } from '../styles/introduce.styles'
import { SignModal } from '../components/account/SignModal'

export default function Introduce() {
    const navigate = useNavigate()
    const heroImage = 'https://public.readdy.ai/ai/img_res/7f809449d14dab68b1e4bf06d1c09041.jpg'
    const [isModalOpen, setIsModalOpen] = useState(false)

    /**
     * @function handleStart
     * @description 시작하기 버튼 클릭 시 모달 열기
     */
    const handleStart = () => {
        const at = localStorage.getItem('at')
        if (at) {
            navigate('/so')
        } else {
            setIsModalOpen(true)
        }
    }

    /**
     * @function handleCancel
     * @description 로그인 모달 닫기
     */
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <div className={introduceStyles.container}>
            <header className={introduceStyles.header}>
                <div className={introduceStyles.headerContent}>
                    <div className={introduceStyles.logo}>BizSync</div>
                    <nav className={introduceStyles.nav}>
                        {/* <a className={introduceStyles.navLink}>요금제</a> */}
                        <a className={introduceStyles.navLink}>고객지원</a>
                        <Button onClick={handleStart} className={introduceStyles.primaryButton}>
                            시작하기
                        </Button>
                    </nav>
                </div>
            </header>
            <main>
                <section className={introduceStyles.heroSection}>
                    <div className={introduceStyles.heroContent}>
                        <div className={introduceStyles.heroText}>
                            <h1 className={introduceStyles.heroTitle}>스마트한 견적서 자동생성</h1>
                            <p className={introduceStyles.heroDescription}>
                                복잡한 견적서 작성 과정을 자동화하여 업무 효율을 높이세요. 견적서 자동생성으로 시간을 절약하고 정확성을 높일 수
                                있습니다.
                            </p>
                            <Button onClick={handleStart} className={introduceStyles.heroButton}>
                                무료로 시작하기
                            </Button>
                        </div>
                        <div className={introduceStyles.heroImage}>
                            <img src={heroImage} alt="Hero" className={introduceStyles.heroImg} />
                        </div>
                    </div>
                </section>
            </main>
            <SignModal isModalOpen={isModalOpen} handleCancel={handleCancel} />
        </div>
    )
}
