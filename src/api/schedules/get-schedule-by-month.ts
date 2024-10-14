import { GetSchedulesRes } from '@/types/schedules'
import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'

export const getScheduleByMonth = async (year: number, month: number) => {
  const { data } = await baseAPI.get<GetSchedulesRes>(
    `${API_DOMAINS.SCHEDULES}/month`,
    {
      params: { year, month },
    }
  )

  return data
}
