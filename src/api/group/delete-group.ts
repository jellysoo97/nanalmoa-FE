import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'

export const deleteGroup = async (id: number) => {
  const { data } = await baseAPI.delete(`${API_DOMAINS.GROUP}/${id}`)

  return data
}
