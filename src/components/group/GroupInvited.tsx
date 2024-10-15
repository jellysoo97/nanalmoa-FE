import { getGroupInvitation } from '@/api/group/get-group-invitation'
import { QUERY_KEYS } from '@/constants/api'
import { GetGroupInvitationRes } from '@/types/group'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const GroupInvited = () => {
  const {
    data: GroupInvitation,
    error: isInvitationError,
    isLoading: isInvitationLoading,
  } = useQuery<GetGroupInvitationRes[], AxiosError>({
    queryKey: [QUERY_KEYS.GET_GROUP_INVITATION],
    queryFn: getGroupInvitation,
  })

  console.log(GroupInvitation)

  // 로딩 상태 처리
  if (isInvitationLoading) {
    return <div>Loading...</div>
  }

  // 오류 상태 처리
  if (isInvitationError) {
    return <div>Error: {isInvitationError.message}</div>
  }
  return (
    <div className="mb-10 h-[30%]">
      <p className="text-lg">💌 초대</p>
      <div className="h-full">
        {/* status가 PENDING 중일때 */}
        {GroupInvitation && GroupInvitation.length > 0 ? (
          <>
            {GroupInvitation.map((group) => (
              <div
                key={group.invitationId}
                className="flex flex-row justify-between"
              >
                <p>{group.status}</p>
              </div>
            ))}
          </>
        ) : (
          <p>받은 초대가 없습니다</p>
        )}
      </div>
    </div>
  )
}

export default GroupInvited
