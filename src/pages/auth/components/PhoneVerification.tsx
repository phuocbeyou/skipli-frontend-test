"use client"

import type React from "react"
import { useState } from "react"
import { useSendOtp } from "../hooks/useSendOtp"
import { useVerifyOtp } from "../hooks/useVerifyOtp"
import "../styles/phone-verification.css"

interface PhoneVerificationProps {
    onVerificationSuccess: (phoneNumber: string) => void
}

export const PhoneVerification: React.FC<PhoneVerificationProps> = ({ onVerificationSuccess }) => {
    const [step, setStep] = useState<"phone" | "code">("phone")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [accessCode, setAccessCode] = useState("")

    const sendOtpMutation = useSendOtp()
    const verifyOtpMutation = useVerifyOtp()

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!phoneNumber.trim()) {
            return // Hook will handle the error toast
        }

        try {
            await sendOtpMutation.mutateAsync(phoneNumber.trim())
            setStep("code")
        } catch (error) {
            console.error("Send code error:", error)
        }
    }

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!accessCode.trim()) {
            return
        }

        if (accessCode.length !== 6) {
            return
        }

        try {
            await verifyOtpMutation.mutateAsync({
                phoneNumber: phoneNumber.trim(),
                accessCode: accessCode.trim(),
            })

            onVerificationSuccess(phoneNumber.trim())
        } catch (error) {
            console.error("Verify code error:", error)
        }
    }

    const handleBackToPhone = () => {
        setStep("phone")
        setAccessCode("")
    }

    const handleUseDifferentNumber = () => {
        setStep("phone")
        setAccessCode("")
        setPhoneNumber("")
    }

    const handleResendCode = async () => {
        try {
            await sendOtpMutation.mutateAsync(phoneNumber.trim())
            setAccessCode("") // Clear the current code
        } catch (error) {
            console.error("Resend code error:", error)
        }
    }

    const isLoading = sendOtpMutation.isPending || verifyOtpMutation.isPending

    if (step === "phone") {
        return (
            <div className="phone-verification-container">
                <h2 className="phone-verification-title">Phone Verification</h2>
                <p className="phone-verification-description">Enter your phone number to receive an access code</p>

                <form onSubmit={handleSendCode} className="phone-verification-form">
                    <div className="form-group">
                        <label htmlFor="phoneNumber" className="form-label">
                            Phone Number:
                        </label>
                        <input
                            id="phoneNumber"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter your phone number"
                            className="form-input"
                            disabled={isLoading}
                            autoComplete="tel"
                        />
                    </div>

                    <button type="submit" disabled={isLoading || !phoneNumber.trim()} className="btn btn-primary">
                        {sendOtpMutation.isPending ? "Sending..." : "Send Access Code"}
                    </button>
                </form>
            </div>
        )
    }

    return (
        <div className="phone-verification-container">
            <h2 className="phone-verification-title">Enter Access Code</h2>
            <p className="phone-verification-description">
                We sent a 6-digit code to <strong>{phoneNumber}</strong>
            </p>

            <form onSubmit={handleVerifyCode} className="phone-verification-form">
                <div className="form-group">
                    <label htmlFor="accessCode" className="form-label">
                        Access Code:
                    </label>
                    <input
                        id="accessCode"
                        type="text"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        className="form-input code-input"
                        disabled={isLoading}
                        autoComplete="one-time-code"
                    />
                </div>

                <div className="button-group">
                    <button type="button" onClick={handleBackToPhone} disabled={isLoading} className="btn btn-secondary">
                        Back
                    </button>

                    <button type="submit" disabled={isLoading || accessCode.length !== 6} className="btn btn-success">
                        {verifyOtpMutation.isPending ? "Verifying..." : "Verify Code"}
                    </button>
                </div>
            </form>

            <div className="alternative-action">
                <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="btn-link"
                    style={{ marginRight: "16px" }}
                >
                    {sendOtpMutation.isPending ? "Resending..." : "Resend Code"}
                </button>

                <button type="button" onClick={handleUseDifferentNumber} className="btn-link">
                    Use different phone number
                </button>
            </div>
        </div>
    )
}