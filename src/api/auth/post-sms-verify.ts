import { PostSmsVerifyReq } from '@/types/auth'
import { authAPI } from '../axios-instance'
import { AxiosResponse } from 'axios'
import { API_DOMAINS } from '@/constants/api'

export const postSmsVerify = async (payload: PostSmsVerifyReq) => {
  const { data } = await authAPI.post<PostSmsVerifyReq, AxiosResponse>(
    `${API_DOMAINS.AUTH}/sms/verify`,
    payload
  )

  return data
}
