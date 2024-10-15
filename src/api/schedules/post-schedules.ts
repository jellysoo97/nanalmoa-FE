import { API_DOMAINS } from '@/constants/api'
import { baseAPI } from '../axios-instance'
import { PostSchedulesReq, PostSchedulesRes } from '@/types/schedules'
import { AxiosResponse } from 'axios'

export const postSchedules = async (payload: PostSchedulesReq) => {
  const { data } = await baseAPI.post<
    PostSchedulesReq,
    AxiosResponse<PostSchedulesRes>
  >(API_DOMAINS.SCHEDULES, payload)

  return data
}
