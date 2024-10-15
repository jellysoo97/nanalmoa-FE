import { API_DOMAINS } from '@/constants/api'
import { baseAPI } from '../axios-instance'
import { GetSchedulesRes } from '@/types/schedules'

export const getSchedules = async (userId: number) => {
  const { data } = await baseAPI.get<GetSchedulesRes>(API_DOMAINS.SCHEDULES, {
    params: { userId },
  })

  return data
}
