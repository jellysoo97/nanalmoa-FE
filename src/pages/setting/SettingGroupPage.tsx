import { Button } from '@/components/common'
import CreateGroupModal from '@/components/group/CreateGroupModal'
import GroupInvited from '@/components/group/GroupInvited'
import MyGroupList from '@/components/group/MyGroupList'
import SettingTitle from '@/components/setting/SettingTitle'
import { useModal } from '@/hooks/use-modal'
import { path } from '@/routes/path'
import { useNavigate } from 'react-router-dom'

const SettingGroupPage = () => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const navigate = useNavigate()

  return (
    <div className="mb-10 w-full px-5">
      <div className="mb-2 flex justify-between">
        <Button text="이전으로" onClick={() => navigate(path.settings.base)} />
      </div>
      {/* 그룹 초대 수락-삭제 */}
      <SettingTitle title="그룹 관리" />
      <GroupInvited />
      {/* 내 그룹 리스트, 클릭하면 그룹상세 */}
      <MyGroupList />
      {/* 그룹 생성 버튼 */}
      <Button text="그룹 만들기" onClick={openModal} className="w-full" />
      {isModalOpen && (
        <CreateGroupModal onClose={closeModal} isCreateGroup={false} />
      )}
    </div>
  )
}

export default SettingGroupPage
