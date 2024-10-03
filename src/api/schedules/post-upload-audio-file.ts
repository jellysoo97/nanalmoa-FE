import { API_DOMAINS } from '@/constants/api'
import {
  PostUploadAudioFileReq,
  PostUploadAudioFileRes,
} from '@/types/schedules'
import { AxiosResponse } from 'axios'
import { authAPI } from '../axios-instance'

export const postUploadAudioFile = async (payload: PostUploadAudioFileReq) => {
  const { data } = await authAPI.post<
    PostUploadAudioFileReq,
    AxiosResponse<PostUploadAudioFileRes>
  >(`${API_DOMAINS.SCHEDULES}/upload/Whisper`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
}
