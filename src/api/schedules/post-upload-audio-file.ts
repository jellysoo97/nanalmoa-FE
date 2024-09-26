import { API_DOMAINS } from '@/constants/api'
import {
  PostUploadAudioFileReq,
  PostUploadAudioFileRes,
} from '@/types/schedules'
import { AxiosResponse } from 'axios'
import { authAPI } from '../axios-instance'

export const postUploadAudioFile = async (payload: PostUploadAudioFileReq) => {
  // TODO: 중간발표 이후에 baseAPI로 변경

  console.log('전송할 payload:', payload)

  const { data } = await authAPI.post<
    PostUploadAudioFileReq,
    AxiosResponse<PostUploadAudioFileRes>
  >(`${API_DOMAINS.SCHEDULES}/upload`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
}
