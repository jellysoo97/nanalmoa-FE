import { API_DOMAINS } from '@/constants/api'
import { baseAPI } from '../axios-instance'
import { IPatchManagerInvitationRes } from '@/types/manager'

export const patchManagerReject = async (id: number) => {
  const { data } = await baseAPI.patch<IPatchManagerInvitationRes>(
    `${API_DOMAINS.MANAGER}/${id}/reject`,
    { params: { id } }
  )

  return data
}
