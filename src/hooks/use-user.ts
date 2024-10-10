import { getUsersMe } from '@/api/users/get-users-me'
import { QUERY_KEYS } from '@/constants/api'
import { useUserStore } from '@/store/user'
import { GetUsersMeRes } from '@/types/auth'
import { getAccessToken } from '@/utils/handle-token'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useUser = (enabled: boolean = true) => {
  const { data, isLoading } = useQuery<GetUsersMeRes>({
    queryKey: [QUERY_KEYS.GET_USER_ME, getAccessToken()],
    queryFn: getUsersMe,
    enabled,
  })

  const { user, setUser } = useUserStore()

  useEffect(() => {
    if (data) setUser(data)
    if (!data) setUser(null)
  }, [data, setUser])

  return {
    user,
    isUserLoading: isLoading,
  }
}
