"use client"

import { useAuth } from "contexts/AuthProvider"
import type React from "react"
import { Navigate, useLocation } from "react-router-dom"

interface ProtectedRouteProps {
    children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth()
    const location = useLocation()

    if (isLoading) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <p>Loading...</p>
            </div>
        )
    }

    if (!isAuthenticated) {
        // Redirect to login page with return url
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <>{children}</>
}
