import { API_DOMAINS } from '@/constants/api'
import { baseAPI } from '../axios-instance'
import { IPatchManagerInvitationRes } from '@/types/manager'

// 보낸 관리자 요청 철회
export const patchManagerCancel = async (id: number) => {
  const { data } = await baseAPI.patch<IPatchManagerInvitationRes>(
    `${API_DOMAINS.MANAGER}/${id}/cancel`,
    { params: { id } }
  )

  return data
}
