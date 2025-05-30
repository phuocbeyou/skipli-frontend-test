"use client"

import { Routes, Route } from "react-router-dom"
import { NotFoundPage } from "../components/layout/NotFoundPage"
import { AuthPage } from "pages/auth/AuthPage"
import GithubSearchPage from "pages/github/GithubSearchPage"
import { AuthProvider } from "contexts/AuthProvider"
import { ProtectedRoute } from "./ProtectedRoute"

export const AppRouter = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <GithubSearchPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}
