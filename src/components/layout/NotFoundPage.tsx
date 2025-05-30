"use client"

import type React from "react"
import { Link } from "react-router-dom"

export const NotFoundPage: React.FC = () => {
    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link
                to="/"
                style={{
                    color: "#0366d6",
                    textDecoration: "none",
                    padding: "10px 20px",
                    border: "1px solid #0366d6",
                    borderRadius: "4px",
                    display: "inline-block",
                    marginTop: "16px",
                }}
            >
                Go Home
            </Link>
        </div>
    )
}
