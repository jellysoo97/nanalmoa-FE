import { API_DOMAINS } from '@/constants/api'
import { baseAPI } from '../axios-instance'
import { IPostManagerInvitationRes } from '@/types/manager'

export const postManagerInvitation = async (subordinateUuid: string) => {
  const { data } = await baseAPI.post<IPostManagerInvitationRes>(
    `${API_DOMAINS.MANAGER}/invitation?subordinateUuid=${subordinateUuid}`
  )

  return data
}
