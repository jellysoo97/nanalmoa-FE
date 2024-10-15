import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'

export const deleteSchedule = async (id: number) => {
  const { data } = await baseAPI.delete(`${API_DOMAINS.SCHEDULES}/${id}`)

  return data
}
