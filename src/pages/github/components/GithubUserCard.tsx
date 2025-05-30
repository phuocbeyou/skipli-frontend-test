"use client"

import type React from "react"
import type { IGithubUser } from "../types/github"
import "../styles/github-user-card.css"

interface GithubUserCardProps {
    user: IGithubUser
    isLiked: boolean
    onToggleLike: () => void
    isLiking: boolean
}

export const GithubUserCard: React.FC<GithubUserCardProps> = ({ user, isLiked, onToggleLike, isLiking }) => {
    return (
        <div className="user-card">
            <img src={user.avatar_url || "/placeholder.svg"} alt={`${user.login} avatar`} className="user-avatar" />

            <div className="user-info">
                <h3 className="user-name">{user.login}</h3>
                <div className="user-stats">
                    <div className="user-stat">Repos: {user.public_repos ?? "N/A"}</div>
                    <div className="user-stat">Followers: {user.followers ?? "N/A"}</div>
                </div>
            </div>

            <div className="user-actions">
                <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="avatar-link"
                    title={`View ${user.login}'s GitHub Profile`}
                >
                    <img src={'https://cdn-icons-png.flaticon.com/512/1144/1144760.png '} alt={'profile'} className="user-avatar" />
                </a>
                <button
                    onClick={onToggleLike}
                    disabled={isLiking}
                    className={`like-button ${isLiked ? "liked" : ""}`}
                    title={isLiked ? "Already liked" : "Like this user"}
                >
                    {isLiking ? "⏳ Liking..." : isLiked ? "❤️ Liked" : "🤍 Like"}
                </button>
            </div>
        </div>
    )
}
