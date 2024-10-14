import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'
import { GetGroupUserRes } from '@/types/group'

export const getGroupUser = async () => {
  const { data } = await baseAPI.get<GetGroupUserRes[]>(
    `${API_DOMAINS.GROUP}/user`
  )

  return data
}
