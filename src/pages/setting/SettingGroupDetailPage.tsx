import { deleteGroup } from '@/api/group/delete-group'
import { getGroupDetail } from '@/api/group/get-group-detail'
import { Button } from '@/components/common'
import Divider from '@/components/common/Divider'
import Modal from '@/components/common/Modal'
import TrashCanIcon from '@/components/icons/TrashCanIcon'
import { QUERY_KEYS } from '@/constants/api'
import { useModal } from '@/hooks/use-modal'
import { path } from '@/routes/path'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const SettingGroupDetailPage = () => {
  const navigate = useNavigate()
  const { isModalOpen, openModal, closeModal } = useModal()
  const { id } = useParams()

  //상세 정보 조회
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_GROUP_DETAIL, id],
    queryFn: () => getGroupDetail(Number(id)),
    enabled: !!id,
  })
  console.log(data)

  //그룹 삭제
  const deleteMutation = useMutation({
    mutationKey: [QUERY_KEYS.DELETE_GROUP],
    mutationFn: deleteGroup,
    onSuccess: () => {
      console.log('삭제 성공')
      toast.success('그룹이 삭제되었습니다.')
      navigate(`${path.settings.base}/${path.settings.group}`)
    },
    onError: () => {
      toast.error('그룹 삭제에 실패했습니다.')
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message}</p>
  if (!data) return <p>No data available</p>

  const handleDeleteGroup = () => {
    deleteMutation.mutate(data.groupId)
  }

  return (
    <div className="w-full p-4">
      <div className="flex justify-between">
        <Button text="이전으로" onClick={() => navigate(path.settings.group)} />
      </div>
      <div className="my-5 flex h-full flex-col justify-around">
        <p>그룹명: {data.groupName}</p>
        <p>생성일자: {new Date(data.createdAt).toLocaleDateString()}</p>
        <p>관리자 유무: {data.isAdmin ? 'Yes' : 'No'}</p>
        <div className="mb-0 flex flex-col">
          <p>친구 리스트</p>
          <ul className="list-disc pl-5">
            {data.members.length > 0 ? (
              data.members.map((member) => (
                <li key={member.userUuid} className="flex justify-between">
                  <span>{member.name}</span>
                  <span>{member.isAdmin ? '관리자' : '일반'}</span>
                  <span>삭제</span>
                </li>
              ))
            ) : (
              <p>가입된 친구가 없습니다.</p>
            )}
          </ul>
          <Button text="친구 초대하기" />
        </div>
      </div>
      <Button
        text="그룹 삭제하기"
        className="w-full bg-primary-coral"
        onClick={openModal}
      />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className="px-6">
            <div className="mx-auto py-3">
              <p className="text-lg">{data.groupName}</p>
              <p className="text-lg">{data.isAdmin ? '관리자' : ''}</p>
              <p className="text-lg">{data.groupName}</p>
            </div>
            <Divider />
            <div className="py-4 text-center text-lg">
              그룹을 정말 삭제하시겠습니까?
            </div>
            <button
              onClick={handleDeleteGroup}
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

export default SettingGroupDetailPage
