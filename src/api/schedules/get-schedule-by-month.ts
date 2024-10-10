import { GetSchedulesRes } from '@/types/schedules'
import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'

export const getScheduleByMonth = async (
  userUuid: string,
  year: number,
  month: number
) => {
  const { data } = await baseAPI.get<GetSchedulesRes>(
    `${API_DOMAINS.SCHEDULES}/month`,
    {
      params: { userUuid, year, month },
    }
  )

  return data
}
