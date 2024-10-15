import { API_DOMAINS } from '@/constants/api'
import {
  PostUploadAudioFileReq,
  PostUploadAudioFileRes,
} from '@/types/schedules'
import { AxiosResponse } from 'axios'
import { baseAPI } from '../axios-instance'

export const postUploadAudioFile = async (
  payload: PostUploadAudioFileReq,
  signal?: AbortSignal //post 중단을 위한 aboutSignal
) => {
  const { data } = await baseAPI.post<
    PostUploadAudioFileReq,
    AxiosResponse<PostUploadAudioFileRes>
  >(`${API_DOMAINS.SCHEDULES}/upload/Whisper`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal,
  })

  return data
}
