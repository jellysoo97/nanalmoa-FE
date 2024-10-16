import { GetSchedulesRes } from '@/types/schedules'
import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'

export const getScheduleByMonth = async (
  year: number,
  month: number,
  userUuid?: string
) => {
  const params: { year: number; month: number; userUuid?: string } = {
    year,
    month,
  }

  if (userUuid) {
    params.userUuid = userUuid
  }

  const { data } = await baseAPI.get<GetSchedulesRes>(
    `${API_DOMAINS.SCHEDULES}/month`,
    {
      params,
    }
  )

  return data

  return data
}
