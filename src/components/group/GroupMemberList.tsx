import { Button } from '@/components/common'
import { GetGroupDetail } from '@/types/group'
import Divider from '../common/Divider'
import { useModal } from '@/hooks/use-modal'
import CreateGroupModal from './CreateGroupModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteGroupUser } from '@/api/group/delete-group'
import { QUERY_KEYS } from '@/constants/api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import TrashCanIcon from '../icons/TrashCanIcon'
import Modal from '../common/Modal'

type Props = {
  userUuid: string | undefined
  admin: boolean
  cnt: number
  members: GetGroupDetail['members']
  groupId: string | undefined
}

const GroupMemberList = ({ userUuid, admin, cnt, members, groupId }: Props) => {
  const queryClient = useQueryClient()

  const { isModalOpen, openModal, closeModal } = useModal()
  const [isDelModalOpen, setIsDelModalOpen] = useState(false)
  const [clickMember, setClickMember] = useState<
    null | GetGroupDetail['members'][number]
  >(null)

  //친구 삭제
  const deleteUserMutation = useMutation({
    mutationKey: [QUERY_KEYS.DELETE_GROUP_USER],
    mutationFn: deleteGroupUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_GROUP_DETAIL],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_GROUP_USER],
      })
      toast.success('친구가 삭제되었습니다.')
      setIsDelModalOpen(false)
    },
    onError: () => {
      toast.error('친구 삭제에 실패했습니다.')
    },
  })

  const handleDeleteUser = (member: string) => {
    deleteUserMutation.mutate({ groupId: Number(groupId), memberUuid: member })
  }

  return (
    <div className="mb-0 flex flex-col">
      <p> 친구 목록 ( {cnt} 명 )</p>
      <Divider />
      <ul className="mb-5 list-disc pl-5 pt-3">
        {members.length > 0 ? (
          members.map((member) => (
            <div key={member.userUuid}>
              <li className="mb-2 flex items-center justify-between">
                <span className="flex-1 truncate">{member.name}</span>
                <span className="w-20 flex-none text-center">
                  {member.isAdmin ? '생성자' : '일반'}
                </span>
                {admin && userUuid && member.userUuid !== userUuid && (
                  <span
                    className="w-16 flex-none rounded-md bg-red-500 p-2 text-center text-sm text-white"
                    onClick={() => {
                      setIsDelModalOpen(true)
                      setClickMember(member)
                    }}
                  >
                    삭제
                  </span>
                )}
              </li>
              <Divider />
            </div>
          ))
        ) : (
          <p>가입된 친구가 없습니다.</p>
        )}
      </ul>
      <Button text="친구 초대하기" onClick={openModal} />
      {isModalOpen && (
        <CreateGroupModal
          onClose={closeModal}
          isCreateGroup={true}
          members={members}
        />
      )}
      {isDelModalOpen && (
        <Modal onClose={() => setIsDelModalOpen(false)}>
          <div className="px-6">
            <div className="mx-auto py-3">
              <p className="text-lg">{clickMember?.name}</p>
              <p className="text-lg">
                {clickMember?.isAdmin ? '관리자' : '일반'}
              </p>
            </div>
            <Divider />
            <div className="py-4 text-center text-lg">
              그룹과 일정에서 친구 정보가 모두 삭제됩니다.
              <br />
              친구를 정말 삭제하시겠습니까?
            </div>
            <button
              onClick={() => handleDeleteUser}
              className="mx-auto flex gap-2 rounded bg-primary-500 px-3"
            >
              <TrashCanIcon className="mx-auto w-6" />
              <div className="py-2 font-medium">삭제하기</div>
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default GroupMemberList
