import { API_DOMAINS } from '@/constants/api'
import { authAPI } from '../axios-instance'
import { GetSchedulesRes } from '@/types/schedules'

export const getSchedules = async (userId: number) => {
  // TODO: 중간발표 이후에 baseAPI로 변경
  const { data } = await authAPI.get<GetSchedulesRes>(API_DOMAINS.SCHEDULES, {
    params: { userId },
  })

  return data
}
