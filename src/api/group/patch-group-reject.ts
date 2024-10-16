import { API_DOMAINS } from '@/constants/api'
import { PatchGroupRejectReq } from '@/types/group'
import { AxiosResponse } from 'axios'
import { baseAPI } from '../axios-instance'

export const patchGroupReject = async ({ id }: PatchGroupRejectReq) => {
  const { status } = await baseAPI.patch<PatchGroupRejectReq, AxiosResponse>(
    `${API_DOMAINS.GROUP}/invitation/${id}/reject`
  )

  return status
}
