import { PostSignupReq, PostSignupRes } from '@/types/auth'
import { authAPI } from '../axios-instance'
import { AxiosResponse } from 'axios'
import { API_DOMAINS } from '@/constants/api'

export const postSignup = async (payload: PostSignupReq) => {
  const { data } = await authAPI.post<
    PostSignupReq,
    AxiosResponse<PostSignupRes>
  >(`${API_DOMAINS.AUTH}/basic/signup`, payload)

  return data
}
