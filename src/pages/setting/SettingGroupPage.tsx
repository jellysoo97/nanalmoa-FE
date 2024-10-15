import { Button } from '@/components/common'
import CreateGroupModal from '@/components/group/CreateGroupModal'
import GroupInvited from '@/components/group/GroupInvited'
import MyGroupList from '@/components/group/MyGroupList'
import { useModal } from '@/hooks/use-modal'

const SettingGroupPage = () => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <div className="w-full p-5">
      {/* 그룹 초대 수락-삭제 */}
      <GroupInvited />
      {/* 내 그룹 리스트, 클릭하면 그룹상세 */}
      <MyGroupList />
      {/* 그룹 생성 버튼 */}
      <Button text="그룹 만들기" onClick={openModal} />
      {isModalOpen && <CreateGroupModal onClose={closeModal} />}
    </div>
  )
}

export default SettingGroupPage
