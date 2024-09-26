import { GetScheduleByIdRes } from '@/types/schedules'
import { authAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'

export const getScheduleById = async (id: string) => {
  // TODO: 중간발표 이후에 baseAPI로 변경
  const { data } = await authAPI.get<GetScheduleByIdRes>(
    `${API_DOMAINS.SCHEDULES}/${id}`
  )

  return data
}
