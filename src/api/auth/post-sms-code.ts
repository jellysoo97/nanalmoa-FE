import { PostSmsCodeReq, PostSmsCodeRes } from '@/types/auth'
import { authAPI } from '../axios-instance'
import { AxiosResponse } from 'axios'
import { API_DOMAINS } from '@/constants/api'

export const postSmsCode = async (payload: PostSmsCodeReq) => {
  const { data } = await authAPI.post<
    PostSmsCodeReq,
    AxiosResponse<PostSmsCodeRes>
  >(`${API_DOMAINS.AUTH}/sms/send`, payload)

  return data
}
