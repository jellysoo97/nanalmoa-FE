import { GetSchedulesRes } from '@/types/schedules'
import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'

export const getScheduleByRange = async (
  startDate: string,
  endDate: string,
  userUuid?: string
) => {
  const params: { startDate: string; endDate: string; userUuid?: string } = {
    startDate,
    endDate,
  }

  if (userUuid) {
    params.userUuid = userUuid
  }

  const { data } = await baseAPI.get<GetSchedulesRes>(
    `${API_DOMAINS.SCHEDULES}/range`,
    {
      params,
    }
  )

  return data
}
