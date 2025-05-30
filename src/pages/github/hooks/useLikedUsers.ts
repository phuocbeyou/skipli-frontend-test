"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import axiosInstance from "@services/axiosInstance"

export const useLikedUsers = (phoneNumber: string) => {
  const [likedIds, setLikedIds] = useState<number[]>([])
  const queryClient = useQueryClient()

  // Fetch liked users
  const { data: likedData } = useQuery({
    queryKey: ["liked-users", phoneNumber],
    queryFn: async (): Promise<number[]> => {
      const response = await axiosInstance.get("/github/get-user-profile", {
        params: { phone_number: phoneNumber },
      })

      const ids: number[] = response.data.favorite_github_users.map((user: any) => user.github_user_id)

      return ids
    },
    enabled: !!phoneNumber,
  })

  // Update local state when data changes
  useEffect(() => {
    if (likedData) {
      setLikedIds(likedData)
    }
  }, [likedData])

  // Like user mutation
  const likeMutation = useMutation({
    mutationFn: async (githubUserId: number) => {
      await axiosInstance.post("/github/like-github-user", {
        phone_number: phoneNumber,
        github_user_id: githubUserId,
      })
      return githubUserId
    },
    onSuccess: (githubUserId) => {
      toast.success("User liked successfully! ❤️", {
        duration: 3000,
        position: "top-right",
      })

      // Update the local state immediately for better UX
      setLikedIds((prev) => [...prev, githubUserId])

      // Invalidate queries to refetch data
      queryClient.invalidateQueries({
        queryKey: ["liked-users", phoneNumber],
      })
    },
    onError: (error) => {
      toast.error("Failed to like user. Please try again.", {
        duration: 4000,
        position: "top-right",
      })
      console.error("Like user error:", error)
    },
  })

  const toggleLike = (userId: number) => {
    if (!likedIds.includes(userId)) {
      likeMutation.mutate(userId)
    } else {
      toast("User is already liked! ❤️", {
        duration: 2000,
        position: "top-right",
        icon: "ℹ️",
      })
    }
  }

  const isLiked = (userId: number) => likedIds.includes(userId)

  return {
    likedIds,
    isLiked,
    toggleLike,
    isLiking: likeMutation.isPending,
  }
}
