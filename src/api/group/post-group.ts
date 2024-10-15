import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'
import { PostGroupReq, PostGroupRes, PostInviteReq } from '@/types/group'
import { AxiosResponse } from 'axios'

export const postGroup = async (payload: PostGroupReq) => {
  const { data } = await baseAPI.post<
    PostGroupReq,
    AxiosResponse<PostGroupRes>
  >(`${API_DOMAINS.GROUP}`, payload, {
    params: { groupName: payload.groupName },
  })

  return data
}

export const postInvite = async (payload: PostInviteReq) => {
  const { data } = await baseAPI.post<PostInviteReq, AxiosResponse>(
    `${API_DOMAINS.GROUP}/invite`,
    payload
  )

  return data
}
