import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@services/axiosInstance"
import type { IGithubUser } from "../types/github"
import { useDebounce } from "@hooks/useDebounce"

export const useGithubSearch = (query: string, page: number, perPage: number) => {
  // Debounce the search query with 500ms delay
  const debouncedQuery = useDebounce(query, 500)

  const {
    data: searchResults,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["github-search", debouncedQuery, page, perPage],
    queryFn: async (): Promise<IGithubUser[]> => {
      if (!debouncedQuery.trim()) return []

      // First, search for users
      const searchResponse = await axiosInstance.get("/github/search-github-users", {
        params: { q: debouncedQuery, page, per_page: perPage },
      })

      const users = searchResponse.data

      if (!users?.data || users.data.length === 0) {
        return []
      }

      // Fetch detailed profiles for each user with error handling
      const detailedUsers = await Promise.all(
        users.data.map(async (user: IGithubUser) => {
          try {
            const profileResponse = await axiosInstance.get("/github/find-github-user-profile", {
              params: { github_user_id: user.id },
            })

            if (profileResponse.data.success) {
              return profileResponse.data.data
            } else {
              return user
            }
          } catch (error) {
            return user
          }
        }),
      )

      return detailedUsers.filter(Boolean)
    },
    enabled: !!debouncedQuery.trim(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  return {
    searchResults,
    isLoading,
    isFetching,
    error,
    isSearching: isLoading || isFetching,
    hasResults: searchResults && searchResults.length > 0,
    isEmpty: !isLoading && !isFetching && searchResults?.length === 0 && !!debouncedQuery.trim(),
  }
}
