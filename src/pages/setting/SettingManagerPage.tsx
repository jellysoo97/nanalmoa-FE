import { getManagerInvitationSend } from '@/api/manager/get-manager-invitation-send'
import { postManagerInvitation } from '@/api/manager/post-manager-invitation'
import UserSelector from '@/components/common/UserSelector'
import InvitationSection from '@/components/setting/InvitationSection'
import InviteModal from '@/components/setting/InviteModal'
import SettingSection from '@/components/setting/SettingSection'
import SettingTitle from '@/components/setting/SettingTitle'
import { QUERY_KEYS } from '@/constants/api'
import { useModal } from '@/hooks/use-modal'
import { UserWithPhoneNumber } from '@/types/auth'
import {
  IGetManagerInvitationRes,
  IPostManagerInvitationRes,
} from '@/types/manager'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'

const SettingManagerPage = () => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const [selectedUser, setSelectedUser] = useState<UserWithPhoneNumber | null>(
    null
  )

  const { data: sendedInvitations } = useQuery<IGetManagerInvitationRes>({
    queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_SEND],
    queryFn: () => getManagerInvitationSend(),
    enabled: !selectedUser,
  })

  const mutation = useMutation<IPostManagerInvitationRes, AxiosError, string>({
    mutationFn: postManagerInvitation,
    onSuccess: () => {
      closeModal()
    },
    onError: () => {},
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
    <div className="p-5">
      <SettingTitle title="관리자 관리" />

      <SettingSection title="💌 관리자 초대하기">
        <div className="mt-3">
          <UserSelector onClick={handleInviteManagerModal} />
        </div>
      </SettingSection>

      <SettingSection title="💌 초대 목록">
        <div className="py-3">
          <InvitationSection
            items={[]}
            title="보낸 초대 현황"
            noneMessage="보낸 초대가 없습니다."
          />
        </div>
        <div>
          <InvitationSection
            items={sendedInvitations || []}
            title="보낸 초대 현황"
            noneMessage="받은 초대가 없습니다."
          />
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
    </div>
  )
}

export default SettingManagerPage
