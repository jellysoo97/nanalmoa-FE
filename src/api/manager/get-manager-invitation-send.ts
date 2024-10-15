import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'
import { IGetManagerInvitationRes } from '@/types/manager'

export const getManagerInvitationSend = async () => {
  const { data } = await baseAPI.get<IGetManagerInvitationRes>(
    `${API_DOMAINS.MANAGER}/invitation/send`
  )

  return data
}
