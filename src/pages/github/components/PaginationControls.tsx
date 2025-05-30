"use client"

import type React from "react"
import "../styles/pagination-controls.css"

interface PaginationControlsProps {
    page: number
    perPage: number
    onPageChange: (page: number) => void
    onPerPageChange: (perPage: number) => void
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
    page,
    perPage,
    onPageChange,
    onPerPageChange,
}) => {
    return (
        <div className="pagination-container">
            <div className="pagination-group">
                <label htmlFor="page-input" className="pagination-label">
                    Page:
                </label>
                <input
                    id="page-input"
                    type="number"
                    min="1"
                    value={page}
                    onChange={(e) => onPageChange(Number(e.target.value))}
                    className="pagination-input"
                />
            </div>

            <div className="pagination-group">
                <label htmlFor="per-page-input" className="pagination-label">
                    Per page:
                </label>
                <input
                    id="per-page-input"
                    type="number"
                    min="1"
                    max="100"
                    value={perPage}
                    onChange={(e) => onPerPageChange(Number(e.target.value))}
                    className="pagination-input"
                />
            </div>
        </div>
    )
}
