import { GetScheduleByIdRes } from '@/types/schedules'
import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'

export const getScheduleById = async (id: string) => {
  const { data } = await baseAPI.get<GetScheduleByIdRes>(
    `${API_DOMAINS.SCHEDULES}/${id}`
  )

  return data
}
