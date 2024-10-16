import {
  patchGroupAccept,
  patchGroupReject,
} from '@/api/group/patch-group-invitation'
import { patchManagerAccept } from '@/api/manager/patch-manager-accept'
import { patchManagerReject } from '@/api/manager/patch-manager-reject'
import { QUERY_KEYS } from '@/constants/api'
import { errorMessages } from '@/constants/validation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useNotification = () => {
  const queryClient = useQueryClient()

  const managerAcceptMutation = useMutation({
    mutationFn: patchManagerAccept,
    onSuccess: () => {
      toast.success('초대가 수락되었습니다.')
    },
    onError: () => {
      toast.error(errorMessages.default)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INVITATIONS_USER],
      })
    },
  })
  const managerRejectMutation = useMutation({
    mutationFn: patchManagerReject,
    onSuccess: () => {
      toast.success('초대가 거절되었습니다.')
    },
    onError: () => {
      toast.error(errorMessages.default)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INVITATIONS_USER],
      })
    },
  })
  const groupAcceptMutation = useMutation({
    mutationFn: patchGroupAccept,
    onSuccess: () => {
      toast.success('초대가 수락되었습니다.')
    },
    onError: () => {
      toast.error(errorMessages.default)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INVITATIONS_USER],
      })
    },
  })
  const groupRejectMutation = useMutation({
    mutationFn: patchGroupReject,
    onSuccess: () => {
      toast.success('초대가 거절되었습니다.')
    },
    onError: () => {
      toast.error(errorMessages.default)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INVITATIONS_USER],
      })
    },
  })

  return {
    managerAcceptMutation,
    managerRejectMutation,
    groupAcceptMutation,
    groupRejectMutation,
  }
}
