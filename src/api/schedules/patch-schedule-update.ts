import { API_DOMAINS } from '@/constants/api'
import { baseAPI } from '../axios-instance'
import { UpdateScheduleReq, UpdateScheduleRes } from '@/types/schedules'
import { AxiosResponse } from 'axios'

export const updateSchedule = async (
  payload: UpdateScheduleReq & { scheduleId: number }
) => {
  const { scheduleId, ...rest } = payload

  const { data } = await baseAPI.patch<
    UpdateScheduleReq,
    AxiosResponse<UpdateScheduleRes>
  >(`${API_DOMAINS.SCHEDULES}/${scheduleId}`, rest)

  return data
}
