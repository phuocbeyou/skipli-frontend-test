"use client"

import type React from "react"
import { useState } from "react"
import "../styles/github-search.css"
import { useGithubSearch } from "../hooks/useGithubSearch"
import { useLikedUsers } from "../hooks/useLikedUsers"
import { usePagination } from "../hooks/usePagination"
import { GithubUserCard } from "./GithubUserCard"
import { PaginationControls } from "./PaginationControls"

interface GithubSearchProps {
    phoneNumber: string
}

const GithubSearch: React.FC<GithubSearchProps> = ({ phoneNumber }) => {
    const [query, setQuery] = useState("")

    const { page, perPage, setPage, setPerPage } = usePagination({
        initialPage: 1,
        initialPerPage: 10,
    })

    const { searchResults, isLoading, error } = useGithubSearch(query, page, perPage)
    const { isLiked, toggleLike, isLiking } = useLikedUsers(phoneNumber)

    const handleSearch = (value: string) => {
        setQuery(value)
        setPage(1)
    }
    console.log(searchResults)
    return (
        <div className="github-search-container">
            <div className="search-header">
                <input
                    type="text"
                    placeholder="Search Github usernames"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="search-input"
                />
            </div>

            {error && (
                <div className="error-message">Error: {error instanceof Error ? error.message : "Something went wrong"}</div>
            )}

            <div className="results-grid">
                {isLoading && <div className="loading-message">Loading...</div>}

                {searchResults?.map((user) => (
                    <GithubUserCard
                        key={user.id}
                        user={user}
                        isLiked={isLiked(user.id)}
                        onToggleLike={() => toggleLike(user.id)}
                        isLiking={isLiking}
                    />
                ))}

                {searchResults && searchResults.length === 0 && query && !isLoading && (
                    <div className="no-results">No users found for "{query}"</div>
                )}
            </div>

            <PaginationControls page={page} perPage={perPage} onPageChange={setPage} onPerPageChange={setPerPage} />
        </div>
    )
}

export default GithubSearch
