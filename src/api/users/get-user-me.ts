import { API_DOMAINS } from '@/constants/api'
import { baseAPI } from '../axios-instance'
import { GetUserMeRes } from '@/types/auth'

export const getUserMe = async () => {
  const { data } = await baseAPI.get<GetUserMeRes>(`${API_DOMAINS.USERS}/me`)

  return data
}
