import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'
import { GetGroupInvitationRes } from '@/types/group'

export const getGroupInvitationReceived = async () => {
  const { data } = await baseAPI.get<GetGroupInvitationRes[]>(
    `${API_DOMAINS.GROUP}/invitations/received`
  )

  return data
}

export const getGroupInvitationSent = async () => {
  const { data } = await baseAPI.get<GetGroupInvitationRes[]>(
    `${API_DOMAINS.GROUP}/invitations/sent`
  )

  return data
}
