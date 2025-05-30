"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
    phoneNumber: string | null
    isAuthenticated: boolean
    login: (phoneNumber: string) => void
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if phone number exists in localStorage on mount
        const savedPhoneNumber = localStorage.getItem("phoneNumber")
        if (savedPhoneNumber) {
            setPhoneNumber(savedPhoneNumber)
        }
        setIsLoading(false)
    }, [])

    const login = (verifiedPhoneNumber: string) => {
        localStorage.setItem("phoneNumber", verifiedPhoneNumber)
        setPhoneNumber(verifiedPhoneNumber)
    }

    const logout = () => {
        localStorage.removeItem("phoneNumber")
        setPhoneNumber(null)
    }

    const value = {
        phoneNumber,
        isAuthenticated: !!phoneNumber,
        login,
        logout,
        isLoading,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
