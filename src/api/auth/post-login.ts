import { API_DOMAINS } from '@/constants/api'
import { authAPI } from '../axios-instance'
import { PostLoginReq, PostLoginRes } from '@/types/auth'
import { AxiosResponse } from 'axios'

export const postLogin = async (payload: PostLoginReq) => {
  const { data } = await authAPI.post<
    PostLoginReq,
    AxiosResponse<PostLoginRes>
  >(`${API_DOMAINS.AUTH}/basic/login`, payload)

  return data
}
