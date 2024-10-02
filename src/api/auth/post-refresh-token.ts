import { PostRefreshTokenReq, PostRefreshTokenRes } from '@/types/auth'
import { baseAPI } from '../axios-instance'
import { AxiosResponse } from 'axios'
import { API_DOMAINS } from '@/constants/api'

export const postRefreshToken = async (payload: PostRefreshTokenReq) => {
  const { data } = await baseAPI.post<
    PostRefreshTokenReq,
    AxiosResponse<PostRefreshTokenRes>
  >(`${API_DOMAINS.AUTH}/refresh`, payload)

  return data
}
