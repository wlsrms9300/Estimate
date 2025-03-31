import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Context 타입
interface TimerContextType {
    time: string
    isFinished: boolean
}

// Context
const TimerContext = createContext<TimerContextType | undefined>(undefined)

// Props 타입
interface TimerProps {
    minutes: number
    onTimerEnd?: () => void
    children: ReactNode
}

// component className props(필요한 경우 사용)
interface DisplayProps {
    className?: string
}

const Timer = ({ minutes, onTimerEnd, children }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(minutes * 60)

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimerEnd?.()
            return
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft, onTimerEnd])

    // 분:초 형식으로 변환
    const formatTime = (): string => {
        const mins = Math.floor(timeLeft / 60)
            .toString()
            .padStart(2, '0')
        const secs = (timeLeft % 60).toString().padStart(2, '0')
        return `${mins}:${secs}`
    }

    const value: TimerContextType = {
        time: formatTime(),
        isFinished: timeLeft <= 0,
    }

    return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}

// Compound Components
const Small: React.FC<DisplayProps> = ({ className = '' }) => {
    const context = useContext(TimerContext)
    if (!context) throw new Error('Small must be used within a Timer')
    const { time, isFinished } = context

    return <span className={`text-sm ${isFinished ? 'text-gray-700' : 'text-red-500'} ${className}`}>{time}</span>
}

const Medium: React.FC<DisplayProps> = ({ className = '' }) => {
    const context = useContext(TimerContext)
    if (!context) throw new Error('Medium must be used within a Timer')
    const { time, isFinished } = context

    return <span className={`text-base font-medium ${isFinished ? 'text-gray-700' : 'text-red-500'} ${className}`}>{time}</span>
}

const Large: React.FC<DisplayProps> = ({ className = '' }) => {
    const context = useContext(TimerContext)
    if (!context) throw new Error('Large must be used within a Timer')
    const { time, isFinished } = context

    return <span className={`text-2xl font-bold ${isFinished ? 'text-gray-700' : 'text-red-500'} ${className}`}>{time}</span>
}

// Timer에 Compound Components 연결
Timer.Small = Small
Timer.Medium = Medium
Timer.Large = Large

// Compound Component 타입
interface TimerComponent extends React.FC<TimerProps> {
    Small: React.FC<DisplayProps>
    Medium: React.FC<DisplayProps>
    Large: React.FC<DisplayProps>
}

export default Timer as TimerComponent
