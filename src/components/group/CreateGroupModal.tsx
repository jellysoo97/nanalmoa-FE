import { TModal } from '@/types/common'
import Modal from '../common/Modal'
import { Button } from '../common'
import { useMutation } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/api'
import { postGroup, postInvite } from '@/api/group/post-group'
import { toast } from 'react-toastify'
import { useState } from 'react'
import UserSelector from '../common/UserSelector'
import { UserWithPhoneNumber } from '@/types/auth'

type Props = TModal

const CreateGroupModal = ({ onClose }: Props) => {
  const [isCreateGroup, setIsCreateGroup] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<UserWithPhoneNumber | null>(
    null
  )
  const [groupName, setGroupName] = useState<string>('')
  const [groupId, setGroupId] = useState<number>(0)

  //그룹명 생성
  const groupMutation = useMutation({
    mutationKey: [QUERY_KEYS.POST_GROUP],
    mutationFn: postGroup,
    onSuccess: (data) => {
      console.log('성공')
      setIsCreateGroup(true)
      setGroupId(data.groupId)
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.message)
    },
  })

  const handleCreateGroup = () => {
    if (!groupName) {
      toast.error('그룹 이름을 입력해 주세요.')
      return
    }
    groupMutation.mutate({ groupName })
  }

  //그룹멤버 초대
  const inviteMutation = useMutation({
    mutationKey: [QUERY_KEYS.POST_GROUP_INVITE],
    mutationFn: postInvite,
    onSuccess: () => {
      toast.success('그룹이 성공적으로 생성되었습니다.')
      onClose()
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.message)
    },
  })

  const handleInvite = () => {
    if (!selectedUser) {
      toast.error('초대할 사용자를 선택해 주세요.')
      return
    }
    inviteMutation.mutate({ groupId, inviteeUuids: [selectedUser.userUuid] })
  }

  const handleSelected = (user: UserWithPhoneNumber) => {
    setSelectedUser(user)
    console.log(user)
  }

  return (
    <Modal hasHelp onClose={onClose}>
      <div className="flex h-full flex-1 flex-col items-center justify-around gap-3 p-3">
        {!isCreateGroup ? (
          <>
            <p className="text-xl">새 그룹 만들기</p>
            <input
              type="text"
              className="mb-10 block rounded-md border border-neutral-300 p-2 shadow-sm"
              placeholder="그룹 이름"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <Button text="그룹 만들기" onClick={handleCreateGroup} />
          </>
        ) : (
          <>
            <p className="text-xl">그룹에 친구 초대하기</p>
            <div className="flex h-24 flex-col justify-between">
              <UserSelector onClick={handleSelected} />
              <Button text="초대" onClick={handleInvite} />
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default CreateGroupModal
