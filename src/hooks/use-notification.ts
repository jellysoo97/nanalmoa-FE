import { patchGroupAccept } from '@/api/group/patch-group-accept'
import { patchGroupReject } from '@/api/group/patch-group-reject'
import { patchManagerAccept } from '@/api/manager/patch-manager-accept'
import { patchManagerReject } from '@/api/manager/patch-manager-reject'
import { QUERY_KEYS } from '@/constants/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useNotification = () => {
  const queryClient = useQueryClient()

  const managerAcceptMutation = useMutation({
    mutationFn: patchManagerAccept,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INVITATIONS_USER],
      })
    },
  })
  const managerRejectMutation = useMutation({
    mutationFn: patchManagerReject,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INVITATIONS_USER],
      })
    },
  })
  const groupAcceptMutation = useMutation({
    mutationFn: patchGroupAccept,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INVITATIONS_USER],
      })
    },
  })
  const groupRejectMutation = useMutation({
    mutationFn: patchGroupReject,
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
