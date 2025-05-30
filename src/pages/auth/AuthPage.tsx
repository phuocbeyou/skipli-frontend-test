"use client"

import type React from "react"
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "contexts/AuthProvider"
import { PhoneVerification } from "./components/PhoneVerification"

export const AuthPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { isAuthenticated, login } = useAuth()

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || "/"
            navigate(from, { replace: true })
        }
    }, [isAuthenticated, navigate, location])

    const handleVerificationSuccess = (phoneNumber: string) => {
        login(phoneNumber)

        // Redirect to the page they were trying to visit or home
        const from = location.state?.from?.pathname || "/"
        navigate(from, { replace: true })
    }

    if (isAuthenticated) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <p>Redirecting...</p>
            </div>
        )
    }

    return (
        <div>
            <PhoneVerification onVerificationSuccess={handleVerificationSuccess} />
        </div>
    )
}
