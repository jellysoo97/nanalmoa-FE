import { deleteGroup } from '@/api/group/delete-group'
import { getGroupDetail } from '@/api/group/get-group-detail'
import { Button } from '@/components/common'
import Divider from '@/components/common/Divider'
import Modal from '@/components/common/Modal'
import Toast from '@/components/common/Toast'
import GroupMemberList from '@/components/group/GroupMemberList'
import TrashCanIcon from '@/components/icons/TrashCanIcon'
import { QUERY_KEYS } from '@/constants/api'
import { useModal } from '@/hooks/use-modal'
import { useUser } from '@/hooks/use-user'
import { path } from '@/routes/path'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const SettingGroupDetailPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isModalOpen, openModal, closeModal } = useModal()

  const { id } = useParams()
  const { user } = useUser()
  const userUuid = user.info?.userUuid

  //상세 정보 조회
  const { data, isError } = useQuery({
    queryKey: [QUERY_KEYS.GET_GROUP_DETAIL, id],
    queryFn: () => getGroupDetail(Number(id)),
    enabled: !!id,
  })

  //그룹 삭제
  const deleteMutation = useMutation({
    mutationKey: [QUERY_KEYS.DELETE_GROUP],
    mutationFn: deleteGroup,
    onSuccess: () => {
      toast.success('그룹이 삭제되었습니다.')
      navigate(`${path.settings.base}/${path.settings.group}`)
    },
    onError: () => {
      toast.error('그룹 삭제에 실패했습니다.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_GROUP_DETAIL],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_GROUP_DETAIL],
      })
    },
  })

  useEffect(() => {
    if (isError) {
      toast.info('생성자가 그룹을 삭제했습니다.')
      navigate(`${path.settings.base}/${path.settings.group}`)
    }
  }, [isError, navigate])

  if (!data) return <p>No data available</p>

  const handleDeleteGroup = () => {
    deleteMutation.mutate(data.groupId)
  }

  return (
    <div className="w-full p-4">
      <div className="flex justify-between">
        <Button
          text="이전으로"
          onClick={() =>
            navigate(`${path.settings.base}/${path.settings.group}`)
          }
        />
      </div>
      <div className="my-5 flex h-full flex-col justify-around">
        <p>그룹명: {data.groupName}</p>
        <p>생성일자: {new Date(data.createdAt).toLocaleDateString()}</p>
        <p>권한: {data.isAdmin ? '생성자' : '일반'}</p>
        <GroupMemberList
          userUuid={userUuid}
          admin={data.isAdmin}
          cnt={data.memberCount}
          members={data.members}
          groupId={id}
        />
      </div>
      {data.isAdmin && (
        <Button
          text="그룹 삭제하기"
          className="w-full bg-primary-coral"
          onClick={openModal}
        />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className="px-6">
            <div className="mx-auto flex py-3">
              <p className="mr-5 text-lg">{data.groupName}</p>
              <p className="text-lg">{data.isAdmin ? '관리자' : ''}</p>
              <p>{data.memberCount}</p>
            </div>
            <Divider />
            <div className="py-4 text-center text-lg">
              그룹, 친구, 일정 정보가 모두 삭제됩니다.
              <br />
              그룹을 정말 삭제하시겠습니까?
            </div>
            <button
              onClick={() => {
                // 그룹 삭제 함수 호출
                handleDeleteGroup()
              }}
              className="mx-auto flex gap-2 rounded bg-primary-500 px-3"
            >
              <TrashCanIcon className="mx-auto w-6" />
              <div className="py-2 font-medium">삭제하기</div>
            </button>
          </div>
        </Modal>
      )}
      <Toast />
    </div>
  )
}

export default SettingGroupDetailPage
