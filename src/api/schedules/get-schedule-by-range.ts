import { GetSchedulesRes } from '@/types/schedules'
import { authAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'

export const getScheduleByRange = async (
  userId: number,
  startDate: string,
  endDate: string
) => {
  // TODO: baseAPI로 변경
  const { data } = await authAPI.get<GetSchedulesRes>(
    `${API_DOMAINS.SCHEDULES}/range`,
    {
      params: { userId, startDate, endDate },
    }
  )

  return data
}
