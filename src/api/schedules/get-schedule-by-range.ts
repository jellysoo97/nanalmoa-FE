import { GetSchedulesRes } from '@/types/schedules'
import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'

export const getScheduleByRange = async (
  userUuid: string,
  startDate: string,
  endDate: string
) => {
  const { data } = await baseAPI.get<GetSchedulesRes>(
    `${API_DOMAINS.SCHEDULES}/range`,
    {
      params: { userUuid, startDate, endDate },
    }
  )

  return data
}
