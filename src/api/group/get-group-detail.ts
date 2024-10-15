import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'
import { GetGroupDetail } from '@/types/group'

export const getGroupDetail = async (groupId: number) => {
  const { data } = await baseAPI.get<GetGroupDetail>(
    `${API_DOMAINS.GROUP}/${groupId}`
  )

  return data
}
