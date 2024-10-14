import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'
import { getGroupInvitationRes } from '@/types/group'

export const getGroupInvitation = async () => {
  const { data } = await baseAPI.get<getGroupInvitationRes[]>(
    `${API_DOMAINS.GROUP}/invitations/received`
  )

  return data
}
