import { deleteManager } from '@/api/manager/delete-manager'
import { deleteSubordinate } from '@/api/manager/delete-subordinate'
import { getManagerInvitationReceived } from '@/api/manager/get-manager-invitation-received'
import { getManagerInvitationSend } from '@/api/manager/get-manager-invitation-send'
import { getMyManagers } from '@/api/manager/get-my-managers'
import { getMySubordinates } from '@/api/manager/get-my-subordinates'
import { patchManagerAccept } from '@/api/manager/patch-manager-accept'
import { patchManagerCancel } from '@/api/manager/patch-manager-cancel'
import { patchManagerReject } from '@/api/manager/patch-manager-reject'
import { postManagerInvitation } from '@/api/manager/post-manager-invitation'
import Toast from '@/components/common/Toast'
import UserSelector from '@/components/common/UserSelector'
import RefreshIcon from '@/components/icons/RefreshIcon'
import InvitationLayout from '@/components/setting/InvitationLayout'
import InvitationsSection from '@/components/setting/InvitationsSection'
import InviteModal from '@/components/setting/InviteModal'
import ManagerItem from '@/components/setting/ManagerItem'
import ReceivedInvitation from '@/components/setting/ReceivedInvitation'
import SendedInvitation from '@/components/setting/SendedInvitation'
import SettingSection from '@/components/setting/SettingSection'
import SettingTitle from '@/components/setting/SettingTitle'
import { QUERY_KEYS } from '@/constants/api'
import { useModal } from '@/hooks/use-modal'
import { UserWithPhoneNumber } from '@/types/auth'
import {
  IGetManagerInvitationRes,
  IGetMyManagersRes,
  IGetMySubordinatesRes,
  IPatchManagerInvitationRes,
  IPostManagerInvitationRes,
  IRejectManagerInvitationRes,
} from '@/types/manager'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

const SettingManagerPage = () => {
  const queryClient = useQueryClient()
  const { isModalOpen, openModal, closeModal } = useModal()
  const [selectedUser, setSelectedUser] = useState<UserWithPhoneNumber | null>(
    null
  )

  // 보낸 초대 현황
  const { data: sendedInvitations } = useQuery<IGetManagerInvitationRes>({
    queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_SEND],
    queryFn: () => getManagerInvitationSend(),
    // enabled: !selectedUser,
  })

  // 받은 초대 현황
  const { data: receivedInvitations } = useQuery<IGetManagerInvitationRes>({
    queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_RECEIVED],
    queryFn: () => getManagerInvitationReceived(),
  })

  // 자신의 피관리자 목록 조회
  const { data: MySubordinates } = useQuery<IGetMySubordinatesRes>({
    queryKey: [QUERY_KEYS.GET_MANAGER_SUBORDINATES],
    queryFn: () => getMySubordinates(),
  })

  // 자신의 관리자 목록 조회
  const { data: MyManagers } = useQuery<IGetMyManagersRes>({
    queryKey: [QUERY_KEYS.GET_MANAGER_MANAGERS],
    queryFn: () => getMyManagers(),
  })

  // 받은 요청 거절
  const mutationReject = useMutation<
    IRejectManagerInvitationRes,
    Error,
    number
  >({
    mutationFn: (id: number) => patchManagerReject(id),
    onSuccess: () => {
      toast.success('초대 요청 거절하였습니다.')
    },
    onSettled: () => {
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
      onSuccess: () => {
        toast.success('초대 요청 수락하였습니다.')
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_RECEIVED],
        })
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_MANAGER_MANAGERS],
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
      onSuccess: () => {
        toast.success('초대 요청 취소하였습니다.')
      },
      onSettled: () => {
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
  const mutation = useMutation<IPostManagerInvitationRes, AxiosError, string>({
    mutationFn: postManagerInvitation,
    onSuccess: () => {
      toast.success('초대에 성공했습니다!')
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_SEND],
      })
    },
    onError: () => {
      closeModal()
      toast.error('초대할 수 없는 사용자입니다.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_SEND],
      })
    },
  })

  const handleInviteManagerModal = (user: UserWithPhoneNumber) => {
    setSelectedUser(user)
    openModal()
  }

  const handleInviteManager = async () => {
    if (selectedUser?.userUuid) {
      try {
        await mutation.mutateAsync(selectedUser.userUuid)
      } finally {
        closeModal()
      }
    }
  }

  // 피관리자 제거
  const mutateDeleteSubordinate = useMutation<void, AxiosError, string>({
    mutationFn: (subordinateId: string) => deleteSubordinate(subordinateId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_SEND],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MANAGER_SUBORDINATES],
      })
    },
  })

  const handleDeleteSubordinate = (uuid: string) => {
    mutateDeleteSubordinate.mutate(uuid)
  }

  // 관리자 제거
  const mutateDeleteManager = useMutation<void, AxiosError, string>({
    mutationFn: (subordinateId: string) => deleteManager(subordinateId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_RECEIVED],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MANAGER_MANAGERS],
      })
    },
  })

  const handleDeleteManager = (uuid: string) => {
    mutateDeleteManager.mutate(uuid)
  }

  const handleAllRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_SEND],
    })
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_RECEIVED],
    })
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_MANAGER_SUBORDINATES],
    })
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_MANAGER_MANAGERS],
    })
  }

  return (
    <div className="px-5">
      <button className="mb-3 rounded bg-primary-base px-3 py-2 text-sm text-white">
        이전으로
      </button>
      <SettingTitle
        title="관리자 관리"
        button={
          <div onClick={handleAllRefresh}>
            <RefreshIcon className="mb-2 ml-3" />
          </div>
        }
      />

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

      <SettingSection title="💌 관리자 목록">
        <div className="py-3">
          <InvitationsSection
            title="내가 관리하는 사람들"
            itemsLength={MySubordinates?.length || 0}
          >
            <InvitationLayout
              items={MySubordinates}
              Component={ManagerItem}
              message="관리하는 사용자가 없습니다"
              // 피관리자 제거
              onClickDelete={handleDeleteSubordinate}
            />
          </InvitationsSection>
        </div>
        <InvitationsSection
          title="나의 관리자들"
          itemsLength={MyManagers?.length || 0}
        >
          <InvitationLayout
            items={MyManagers}
            Component={ManagerItem}
            message="관리자가 없습니다"
            // 관리자 제거
            onClickDelete={handleDeleteManager}
          />
        </InvitationsSection>
      </SettingSection>
      <Toast />
    </div>
  )
}

export default SettingManagerPage
