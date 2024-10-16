import { API_DOMAINS } from '@/constants/api'
import { baseAPI } from '../axios-instance'
import {
  PatchGroupAcceptReq,
  PatchGroupAcceptRes,
  PatchGroupCancelReq,
  PatchGroupCancelRes,
  PatchGroupRejectReq,
  PatchGroupRejectRes,
} from '@/types/group'

export const patchGroupReject = async ({ id }: PatchGroupRejectReq) => {
  const { data } = await baseAPI.patch<PatchGroupRejectRes>(
    `${API_DOMAINS.GROUP}/invitation/${id}/reject`
  )

  return data
}

export const patchGroupAccept = async ({ id }: PatchGroupAcceptReq) => {
  const { data } = await baseAPI.patch<PatchGroupAcceptRes>(
    `${API_DOMAINS.GROUP}/invitation/${id}/accept`
  )

  return data
}

export const patchGroupCancel = async ({ id }: PatchGroupCancelReq) => {
  const { data } = await baseAPI.patch<PatchGroupCancelRes>(
    `${API_DOMAINS.GROUP}/invitation/${id}/cancel`
  )

  return data
}
