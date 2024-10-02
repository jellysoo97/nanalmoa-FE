import { API_DOMAINS } from '@/constants/api'
import { baseAPI } from '../axios-instance'
import { GetUsersMeRes } from '@/types/auth'

export const getUsersMe = async () => {
  const { data } = await baseAPI.get<GetUsersMeRes>(`${API_DOMAINS.USERS}/me`)

  return data
}
