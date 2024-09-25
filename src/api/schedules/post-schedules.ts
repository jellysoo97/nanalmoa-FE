import { API_DOMAINS } from '@/constants/api'
import { authAPI } from '../axios-instance'
import { PostSchedulesReq, PostSchedulesRes } from '@/types/schedules'
import { AxiosResponse } from 'axios'

export const postSchedules = async (payload: PostSchedulesReq) => {
  // TODO: 중간발표 이후에 baseAPI로 변경
  const { data } = await authAPI.post<
    PostSchedulesReq,
    AxiosResponse<PostSchedulesRes>
  >(API_DOMAINS.SCHEDULES, payload)

  return data
}
