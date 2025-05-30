"use client"

import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import axiosInstance from "@services/axiosInstance"

interface VerifyOtpParams {
    phoneNumber: string
    accessCode: string
}

export function useVerifyOtp() {
    return useMutation({
        mutationFn: async ({ phoneNumber, accessCode }: VerifyOtpParams) => {
            const response = await axiosInstance.post("/auth/verify-access-code", {
                phoneNumber: phoneNumber.trim(),
                accessCode: accessCode.trim(),
            })
            return response.data
        },
        onSuccess: (data, { phoneNumber, accessCode }) => {
            toast.success("Phone number verified successfully! 🎉", {
                duration: 4000,
                position: "top-right",
                icon: "✅",
            })
            console.log("OTP verified successfully for:", phoneNumber)
        },
        onError: (error: any, { phoneNumber, accessCode }) => {
            const errorMessage = error.response?.data?.message || "Invalid access code"

            toast.error(errorMessage, {
                duration: 5000,
                position: "top-right",
                icon: "❌",
            })
        },
    })
}
