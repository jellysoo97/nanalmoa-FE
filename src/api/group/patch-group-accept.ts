import { PatchGroupAcceptReq } from '@/types/group'
import { baseAPI } from '../axios-instance'
import { AxiosResponse } from 'axios'
import { API_DOMAINS } from '@/constants/api'

export const patchGroupAccept = async ({ id }: PatchGroupAcceptReq) => {
  const { status } = await baseAPI.patch<PatchGroupAcceptReq, AxiosResponse>(
    `${API_DOMAINS.GROUP}/invitation/${id}/accept`
  )

  return status
}
