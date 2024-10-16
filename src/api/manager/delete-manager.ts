import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'

export const deleteManager = async (uuid: string) => {
  const { data } = await baseAPI.delete(
    `${API_DOMAINS.MANAGER}/manager/${uuid}`
  )

  return data
}
