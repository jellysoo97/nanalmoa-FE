import {
  getGroupInvitationReceived,
  getGroupInvitationSent,
} from '@/api/group/get-group-invitation'
import { QUERY_KEYS } from '@/constants/api'
import {
  GetGroupInvitationRes,
  PatchGroupAcceptRes,
  PatchGroupCancelRes,
  PatchGroupRejectRes,
} from '@/types/group'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import SettingSection from '../setting/SettingSection'
import InvitationsSection from '../setting/InvitationsSection'
import InvitationLayout from '../setting/InvitationLayout'
import ReceivedInvitation from '../setting/ReceivedInvitation'
import { patchGroupReject } from '@/api/group/patch-group-invitation'
import {
  patchGroupAccept,
  patchGroupCancel,
} from '@/api/group/patch-group-invitation'
import SendedInvitation from '../setting/SendedInvitation'
import { toast } from 'react-toastify'
import Toast from '../common/Toast'

const GroupInvited = () => {
  const queryClient = useQueryClient()

  //받은 초대 현황
  const { data: GroupInvitationReceived } = useQuery<
    GetGroupInvitationRes[],
    AxiosError
  >({
    queryKey: [QUERY_KEYS.GET_GROUP_INVITATION_RECEIVED],
    queryFn: getGroupInvitationReceived,
  })

  //보낸 초대 현황
  const { data: GroupInvitationSent } = useQuery<
    GetGroupInvitationRes[],
    AxiosError
  >({
    queryKey: [QUERY_KEYS.GET_GROUP_INVITATION_SEND],
    queryFn: getGroupInvitationSent,
  })

  //받은 초대 거절
  const mutationReject = useMutation<PatchGroupRejectRes, Error, number>({
    mutationFn: (id: number) => patchGroupReject({ id }),
    onSuccess: () => {
      toast.success('초대 요청 거절하였습니다.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_GROUP_INVITATION_RECEIVED],
      })
    },
  })

  //받은 초대 수락
  const mutationAccept = useMutation<PatchGroupAcceptRes, Error, number>({
    mutationFn: (id: number) => patchGroupAccept({ id }),
    onSuccess: () => {
      toast.success('초대 요청 수락하였습니다.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_GROUP_INVITATION_RECEIVED],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_GROUP_USER],
      })
    },
  })

  //초대 철회
  const mutationCancel = useMutation<PatchGroupCancelRes, Error, number>({
    mutationFn: (id: number) => patchGroupCancel({ id }),
    onSuccess: () => {
      toast.success('초대 요청 취소하였습니다.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_GROUP_INVITATION_SEND],
      })
    },
  })

  const handleGroupReject = (id: number) => {
    mutationReject.mutate(id)
  }
  const handleGroupAccept = (id: number) => {
    mutationAccept.mutate(id)
  }
  const handleGroupCancel = (id: number) => {
    mutationCancel.mutate(id)
  }

  return (
    <div className="-mt-3">
      <SettingSection title="💌 초대 목록">
        <div className="py-3">
          <InvitationsSection
            title="받은 초대 현황"
            itemsLength={GroupInvitationReceived?.length || 0}
          >
            <InvitationLayout
              items={GroupInvitationReceived}
              Component={ReceivedInvitation}
              message="받은 초대가 없습니다."
              // 초대 거절
              onClickReject={handleGroupReject}
              // 초대 수락
              onClickAccept={handleGroupAccept}
            />
          </InvitationsSection>
        </div>
        <div>
          <InvitationsSection
            title="보낸 초대 현황"
            itemsLength={GroupInvitationSent?.length || 0}
          >
            <InvitationLayout
              items={GroupInvitationSent}
              Component={SendedInvitation}
              message="보낸 초대가 없습니다."
              // 초대 철회
              onClickReject={handleGroupCancel}
            />
          </InvitationsSection>
        </div>
      </SettingSection>
      <Toast />
    </div>
  )
}

export default GroupInvited
