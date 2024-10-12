import { PostAnalyzeImageReq, PostAnalyzeImageRes } from '@/types/schedules'
import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'
import { AxiosResponse } from 'axios'

export const postAnalyzeImage = async (payload: PostAnalyzeImageReq) => {
  const { data } = await baseAPI.post<
    PostAnalyzeImageReq,
    AxiosResponse<PostAnalyzeImageRes>
  >(`${API_DOMAINS.SCHEDULES}/upload`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
}
