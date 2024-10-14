import { postManagerInvitation } from '@/api/manager/post-manager-invitation'
import UserSelector from '@/components/common/UserSelector'
import InviteModal from '@/components/setting/InviteModal'
import SettingSection from '@/components/setting/SettingSection'
import SettingTitle from '@/components/setting/SettingTitle'
import { useModal } from '@/hooks/use-modal'
import { UserWithPhoneNumber } from '@/types/auth'
import { IPostManagerInvitationRes } from '@/types/manager'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'

const SettingManagerPage = () => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const [selectedUser, setSelectedUser] = useState<UserWithPhoneNumber | null>(
    null
  )

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
        <UserSelector onClick={handleInviteManagerModal} />
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
