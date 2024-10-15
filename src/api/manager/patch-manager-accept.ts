import { API_DOMAINS } from '@/constants/api'
import { baseAPI } from '../axios-instance'
import { IRejectManagerInvitationRes } from '@/types/manager'

export const patchManagerAccept = async (id: number) => {
  const { data } = await baseAPI.patch<IRejectManagerInvitationRes>(
    `${API_DOMAINS.MANAGER}/${id}/accept`,
    { params: { id } }
  )

  return data
}
