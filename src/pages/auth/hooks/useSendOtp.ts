"use client"

import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import axiosInstance from "@services/axiosInstance"

export function useSendOtp() {
  return useMutation({
    mutationFn: async (phoneNumber: string) => {
      const response = await axiosInstance.post("/auth/create-access-code", {
        phoneNumber: phoneNumber.trim(),
      })
      return response.data
    },
    onSuccess: (data, phoneNumber) => {
      toast.success("Access code sent successfully! 📱", {
        duration: 4000,
        position: "top-right",
        icon: "✅",
      })
    },
    onError: (error: any, phoneNumber) => {
      const errorMessage = error.response?.data?.message || "Failed to send access code"

      toast.error(errorMessage, {
        duration: 5000,
        position: "top-right",
        icon: "❌",
      })

      console.error("Send OTP error for phone:", phoneNumber, error)
    },
  })
}
