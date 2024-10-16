import { GetInvitationsUserRes } from '@/types/invitations'
import { baseAPI } from '../axios-instance'
import { AxiosResponse } from 'axios'
import { API_DOMAINS } from '@/constants/api'

export const getInvitationsUser = async () => {
  const { data } = await baseAPI.get<GetInvitationsUserRes, AxiosResponse>(
    `${API_DOMAINS.INVITATIONS}/user`
  )

  return data
}
