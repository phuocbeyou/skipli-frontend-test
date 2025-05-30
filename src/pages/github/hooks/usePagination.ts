"use client"

import { useState } from "react"

interface UsePaginationProps {
  initialPage?: number
  initialPerPage?: number
}

export const usePagination = ({ initialPage = 1, initialPerPage = 10 }: UsePaginationProps = {}) => {
  const [page, setPage] = useState(initialPage)
  const [perPage, setPerPage] = useState(initialPerPage)

  const goToPage = (newPage: number) => {
    if (newPage >= 1) {
      setPage(newPage)
    }
  }

  const changePerPage = (newPerPage: number) => {
    if (newPerPage >= 1) {
      setPerPage(newPerPage)
      setPage(1) // Reset to first page when changing per page
    }
  }

  const nextPage = () => goToPage(page + 1)
  const prevPage = () => goToPage(page - 1)

  return {
    page,
    perPage,
    setPage: goToPage,
    setPerPage: changePerPage,
    nextPage,
    prevPage,
  }
}
