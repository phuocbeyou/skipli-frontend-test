"use client"

import { Toaster } from "react-hot-toast"

export const ToastProvider = () => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                className: "",
                duration: 4000,
                style: {
                    background: "#363636",
                    color: "#fff",
                    fontSize: "14px",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                },
                success: {
                    duration: 3000,
                    style: {
                        background: "#10b981",
                        color: "#fff",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#10b981",
                    },
                },
                error: {
                    duration: 4000,
                    style: {
                        background: "#ef4444",
                        color: "#fff",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#ef4444",
                    },
                },
            }}
        />
    )
}
