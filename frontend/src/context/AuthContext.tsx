// src/context/AuthContext.tsx
import React, { createContext, useContext, ReactNode, useCallback, useState, useEffect, useRef } from 'react'
import { jwtDecode } from 'jwt-decode'
import { resetAllStores } from '../utils/store'
import axios from '../services/api/axios'

interface JwtPayload {
    exp: number
    [key: string]: any
}

interface AuthContextType {
    isAuthenticated: boolean | null
    checkToken: () => Promise<boolean>
    updateAuthState: (isAuth: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const checkInProgress = useRef(false)
    const isInitialized = useRef(false)

    const reset = () => {
        resetAllStores()
        localStorage.removeItem('at')
        setIsAuthenticated(false)
        checkInProgress.current = false
    }

    const updateAuthState = (isAuth: boolean) => {
        setIsAuthenticated(isAuth)
    }

    const checkToken = useCallback(async (): Promise<boolean> => {
        if (checkInProgress.current) {
            return new Promise((resolve) => {
                const checkInterval = setInterval(() => {
                    if (!checkInProgress.current) {
                        clearInterval(checkInterval)
                        resolve(isAuthenticated === true)
                    }
                }, 100)
            })
        }

        checkInProgress.current = true
        const token = localStorage.getItem('at')

        if (!token) {
            setIsAuthenticated(false)
            checkInProgress.current = false
            return false
        }

        try {
            const decoded: JwtPayload = jwtDecode(token)
            const currentTime = Date.now() / 1000

            if (decoded.exp > currentTime) {
                setIsAuthenticated(true)
                checkInProgress.current = false
                return true
            }

            const response = await axios.post('/member/refreshToken')
            if (response.status === 201 && response.data.resultCd === 201) {
                localStorage.setItem('at', response.data.data.accessToken)
                setIsAuthenticated(true)
                checkInProgress.current = false
                return true
            }

            reset()
            return false
        } catch (error) {
            console.error('token decode error:', error)
            reset()
            return false
        }
    }, [])

    // 초기 인증 상태 체크 (한 번만 실행)
    useEffect(() => {
        if (!isInitialized.current) {
            isInitialized.current = true
            checkToken()
        }
    }, [checkToken])

    return <AuthContext.Provider value={{ isAuthenticated, checkToken, updateAuthState }}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
