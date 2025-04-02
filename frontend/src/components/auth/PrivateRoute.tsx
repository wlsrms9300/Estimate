// src/components/PrivateRoute.tsx
import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Spin } from 'antd'
import { GlobalStyles } from '../../styles/global.styles'

const PrivateRoute: React.FC = () => {
    const { isAuthenticated, checkToken } = useAuth()
    const location = useLocation()

    useEffect(() => {
        checkToken()
    }, [location.pathname, checkToken])

    if (isAuthenticated === null) {
        return (
            <div className={GlobalStyles.windowCenter}>
                <Spin size="large" />
            </div>
        )
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/authExpire" replace />
}

export default PrivateRoute
