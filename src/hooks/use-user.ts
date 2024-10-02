import { getUsersMe } from '@/api/users/get-users-me'
import { QUERY_KEYS } from '@/constants/api'
import { useUserStore } from '@/store/user'
import { GetUsersMeRes } from '@/types/auth'
import { getAccessToken } from '@/utils/handle-token'
import { useQuery } from '@tanstack/react-query'

export const useUser = () => {
  const { data, isSuccess, isError, isLoading } = useQuery<GetUsersMeRes>({
    queryKey: [QUERY_KEYS.GET_USER_ME, getAccessToken()],
    queryFn: getUsersMe,
  })
  const { user, setUser } = useUserStore()

  if (isSuccess) setUser(data.userUuid)
  if (isError) setUser(null)

  return {
    user,
    isUserLoading: isLoading,
  }
}
