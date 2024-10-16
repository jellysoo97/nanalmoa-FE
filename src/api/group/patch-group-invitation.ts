import { API_DOMAINS } from '@/constants/api'
import { baseAPI } from '../axios-instance'
import {
  PatchGroupAcceptRes,
  PatchGroupCancelRes,
  PatchGroupRejectRes,
} from '@/types/group'

export const patchGroupReject = async (id: number) => {
  const { data } = await baseAPI.patch<PatchGroupRejectRes>(
    `${API_DOMAINS.GROUP}/invitation/${id}/reject`,
    { params: { id } }
  )

  return data
}

export const patchGroupAccept = async (id: number) => {
  const { data } = await baseAPI.patch<PatchGroupAcceptRes>(
    `${API_DOMAINS.GROUP}/invitation/${id}/accept`,
    { params: { id } }
  )

  return data
}

export const patchGroupCancel = async (id: number) => {
  const { data } = await baseAPI.patch<PatchGroupCancelRes>(
    `${API_DOMAINS.GROUP}/invitation/${id}/cancel`,
    { params: { id } }
  )

  return data
}
