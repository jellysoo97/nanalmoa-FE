import { getManagerInvitationReceived } from '@/api/manager/get-manager-invitation-received'
import { getManagerInvitationSend } from '@/api/manager/get-manager-invitation-send'
import { patchManagerAccept } from '@/api/manager/patch-manager-accept'
import { patchManagerCancel } from '@/api/manager/patch-manager-cancel'
import { patchManagerReject } from '@/api/manager/patch-manager-reject'
import { postManagerInvitation } from '@/api/manager/post-manager-invitation'
import { Button } from '@/components/common'
import Toast from '@/components/common/Toast'
import UserSelector from '@/components/common/UserSelector'
import InvitationLayout from '@/components/setting/InvitationLayout'
import InvitationsSection from '@/components/setting/InvitationsSection'
import InviteModal from '@/components/setting/InviteModal'
import ReceivedInvitation from '@/components/setting/ReceivedInvitation'
import SendedInvitation from '@/components/setting/SendedInvitation'
import SettingSection from '@/components/setting/SettingSection'
import SettingTitle from '@/components/setting/SettingTitle'
import { QUERY_KEYS } from '@/constants/api'
import { useModal } from '@/hooks/use-modal'
import { path } from '@/routes/path'
import { UserWithPhoneNumber } from '@/types/auth'
import {
  IGetManagerInvitationRes,
  IPatchManagerInvitationRes,
  IPostManagerInvitationRes,
  IRejectManagerInvitationRes,
} from '@/types/manager'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SettingManagerPage = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isModalOpen, openModal, closeModal } = useModal()
  const [selectedUser, setSelectedUser] = useState<UserWithPhoneNumber | null>(
    null
  )

  // 보낸 초대 현황
  const { data: sendedInvitations } = useQuery<IGetManagerInvitationRes>({
    queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_SEND],
    queryFn: () => getManagerInvitationSend(),
    enabled: !selectedUser,
  })

  // 받은 초대 현황
  const { data: receivedInvitations } = useQuery<IGetManagerInvitationRes>({
    queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_RECEIVED],
    queryFn: () => getManagerInvitationReceived(),
    enabled: !selectedUser,
  })

  // 받은 요청 거절
  const mutationReject = useMutation<
    IRejectManagerInvitationRes,
    Error,
    number
  >({
    mutationFn: (id: number) => patchManagerReject(id),
    onSuccess: (data) => {
      console.log('요청 거절 성공:', data)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_RECEIVED],
      })
    },
  })

  const handleManagerReject = (id: number) => {
    mutationReject.mutate(id)
  }

  // 받은 요청 수락
  const mutationAccept = useMutation<IPatchManagerInvitationRes, Error, number>(
    {
      mutationFn: (id: number) => patchManagerAccept(id),
      onSuccess: (data) => {
        console.log('요청 수락 성공:', data)
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_RECEIVED],
        })
      },
    }
  )

  const handleManagerAccept = (id: number) => {
    mutationAccept.mutate(id)
  }

  // 보낸 요청 철회
  const mutationCancel = useMutation<IPatchManagerInvitationRes, Error, number>(
    {
      mutationFn: (id: number) => patchManagerCancel(id),
      onSuccess: (data) => {
        console.log('요청 철회 성공:', data)
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_SEND],
        })
      },
    }
  )

  const handleManagerCancel = (id: number) => {
    mutationCancel.mutate(id)
  }

  // 새로운 관리자 초대 생성
  // TODO: 현재 invalidateQueries 사용하여도 '보낸 초대 현황' 다시 요청되지 않음
  const mutation = useMutation<IPostManagerInvitationRes, AxiosError, string>({
    mutationFn: postManagerInvitation,
    onSuccess: () => {
      closeModal()
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_SEND],
      })
      toast.success('초대에 성공했습니다!')
    },
    onError: () => {
      closeModal()
      toast.error('초대할 수 없는 사용자입니다.')
    },
  })

  const handleInviteManagerModal = (user: UserWithPhoneNumber) => {
    setSelectedUser(user)
    openModal()
  }

  const handleInviteManager = () => {
    if (selectedUser?.userUuid) {
      mutation.mutate(selectedUser?.userUuid)
    }
  }

  return (
    <div className="px-5">
      <Button
        text="이전으로"
        onClick={() => {
          navigate(path.settings.base)
        }}
        className="mb-3"
      />
      <SettingTitle title="관리자 관리" />

      <SettingSection title="💌 관리자 초대하기">
        <div className="mt-3">
          <UserSelector onClick={handleInviteManagerModal} />
        </div>
      </SettingSection>

      <SettingSection title="💌 초대 목록">
        <div className="py-3">
          <InvitationsSection
            title="받은 초대 현황"
            itemsLength={receivedInvitations?.length || 0}
          >
            <InvitationLayout
              items={receivedInvitations}
              Component={ReceivedInvitation}
              message="받은 초대가 없습니다."
              // 초대 거절
              onClickReject={handleManagerReject}
              // 초대 수락
              onClickAccept={handleManagerAccept}
            />
          </InvitationsSection>
        </div>
        <div>
          <InvitationsSection
            title="보낸 초대 현황"
            itemsLength={sendedInvitations?.length || 0}
          >
            <InvitationLayout
              items={sendedInvitations}
              Component={SendedInvitation}
              message="보낸 초대가 없습니다."
              // 초대 철회
              onClickReject={handleManagerCancel}
            />
          </InvitationsSection>
        </div>
      </SettingSection>

      {isModalOpen && selectedUser && (
        <InviteModal
          onClose={closeModal}
          user={selectedUser}
          type="관리자"
          title="관리자 초대 확인"
          onClick={handleInviteManager}
        />
      )}
      <Toast />
    </div>
  )
}

export default SettingManagerPage
