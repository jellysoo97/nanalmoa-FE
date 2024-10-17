import { TModal } from '@/types/common'
import Modal from '../common/Modal'
import { Button } from '../common'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/api'
import { postGroup, postInvite } from '@/api/group/post-group'
import { toast } from 'react-toastify'
import { useState } from 'react'
import UserSelector from '../common/UserSelector'
import { UserWithPhoneNumber } from '@/types/auth'
import { useParams } from 'react-router-dom'
import { GetGroupDetail, PostGroupReq, PostGroupRes } from '@/types/group'
import Toast from '../common/Toast'
import { AxiosError } from 'axios'

type Props = TModal & {
  isCreateGroup: boolean
  members?: GetGroupDetail['members']
}

const CreateGroupModal = ({ onClose, isCreateGroup, members }: Props) => {
  const queryClient = useQueryClient()

  const [isCreateGroupState, setIsCreateGroup] = useState<boolean>(false)
  const [selectedUsers, setSelectedUsers] = useState<UserWithPhoneNumber[]>([])
  const [groupName, setGroupName] = useState<string>('')
  const [groupId, setGroupId] = useState<number>(0)

  const { id } = useParams<{ id: string }>() // URL 파라미터 타입 지정

  // 그룹명 생성
  const groupMutation = useMutation<PostGroupRes, AxiosError, PostGroupReq>({
    mutationKey: [QUERY_KEYS.POST_GROUP],
    mutationFn: postGroup,
    onSuccess: (data) => {
      setIsCreateGroup(true)
      setGroupId(data.groupId)
    },
    onError: () => {
      toast.error('동일 그룹명을 가진 그룹에 소속되어 있습니다.')
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
      toast.success('친구를 초대했습니다')
      onClose()
    },
    onError: (err) => {
      toast.error(err.message)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_SEND],
      })
    },
  })

  const handleInvite = () => {
    if (selectedUsers.length === 0) {
      toast.error('초대할 사용자를 선택해 주세요.')
      return
    }
    // 이미 초대된 사용자가 있는지 확인
    const alreadyInvitedUsers = selectedUsers.filter((selectedUser) =>
      members?.some((member) => member.userUuid === selectedUser.userUuid)
    )

    if (alreadyInvitedUsers.length > 0) {
      toast.error(
        `${alreadyInvitedUsers.map((user) => user.name).join(', ')}은 이미 그룹의 멤버입니다.`
      )
      return
    }

    if (groupId) {
      inviteMutation.mutate({
        groupId,
        inviteeUuids: selectedUsers.map((user) => user.userUuid),
      })
    }
  }

  const handleSelected = (user: UserWithPhoneNumber) => {
    //중복방지
    const isUserAlreadySelected = selectedUsers.some(
      (selectedUser) => selectedUser.userUuid === user.userUuid
    )
    if (isUserAlreadySelected) {
      toast.error(`${user.name}은 이미 선택된 사용자입니다.`)
      return
    }

    setSelectedUsers((prev) => [...prev, user])
    if (id) {
      setGroupId(Number(id)) // URL에서 그룹 ID 설정
    }
  }

  const handleRemoveUser = (userToRemove: UserWithPhoneNumber) => {
    setSelectedUsers((prev) =>
      prev.filter((user) => user.userUuid !== userToRemove.userUuid)
    )
  }

  return (
    <Modal hasHelp onClose={onClose} title="그룹 만들고, 친구 초대하기">
      <div className="flex h-full flex-1 flex-col items-center justify-around gap-3 p-3">
        {!(isCreateGroup || isCreateGroupState) && (
          <>
            <p className="text-xl">새 그룹 만들기</p>
            <div className="flex h-full w-full flex-1 flex-col justify-between">
              <input
                type="text"
                className="mb-10 block rounded-md border border-neutral-300 p-2 shadow-sm"
                placeholder="그룹 이름"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Button
                text="그룹 만들기"
                onClick={handleCreateGroup}
                className="bottom-0 w-full"
              />
            </div>
          </>
        )}
        {(isCreateGroup || isCreateGroupState) && (
          <div className="flex h-full w-full flex-1 flex-col justify-between">
            <div className="mx-auto w-full">
              <UserSelector onClick={handleSelected} />
            </div>
            <div className="mt-4 flex flex-wrap justify-center">
              {selectedUsers.map((user) => (
                <div
                  key={user.userUuid}
                  className="flex items-center justify-center"
                >
                  <span className="mr-2">{user.name}</span>
                  <button
                    className="mr-4 text-red-500"
                    onClick={() => handleRemoveUser(user)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <Button
              text="초대"
              className="bottom-0 w-full"
              onClick={handleInvite}
            />
          </div>
        )}
      </div>
      <Toast />
    </Modal>
  )
}

export default CreateGroupModal
