import { getUserMe } from '@/api/users/get-user-me'
import { QUERY_KEYS } from '@/constants/api'
import { useUserStore } from '@/store/user'
import { GetUserMeRes } from '@/types/auth'
import { getAccessToken } from '@/utils/handle-token'
import { useQuery } from '@tanstack/react-query'

export const useUser = () => {
  const { data, isSuccess, isError, isLoading } = useQuery<GetUserMeRes>({
    queryKey: [QUERY_KEYS.GET_USER_ME, getAccessToken()],
    queryFn: getUserMe,
  })
  const { user, setUser } = useUserStore()

  if (isSuccess) setUser(data.user.id)
  if (isError) setUser(null)

  return {
    user,
    isUserLoading: isLoading,
  }
}
