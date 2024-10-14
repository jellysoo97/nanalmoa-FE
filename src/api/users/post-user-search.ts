import { API_DOMAINS } from '@/constants/api'
import { baseAPI } from '../axios-instance'
import { PostUserSearchReq, PostUserSearchRes } from '@/types/auth'
import { AxiosResponse } from 'axios'

export const PostUsersSearch = async (payload: PostUserSearchReq) => {
  const { data } = await baseAPI.post<
    PostUserSearchReq,
    AxiosResponse<PostUserSearchRes>
  >(`${API_DOMAINS.USERS}/search`, payload)

  return data
}
