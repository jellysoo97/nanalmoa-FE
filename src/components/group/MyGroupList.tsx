import { getGroupUser } from '@/api/group/get-group-user'
import { QUERY_KEYS } from '@/constants/api'
import { path } from '@/routes/path'
import { GetGroupUserRes } from '@/types/group'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Link } from 'react-router-dom'

const MyGroupList = () => {
  //내 그룹 리스트 조회
  const {
    data: userGroupList,
    error: isGroupListError,
    isLoading: isGroupListLoading,
  } = useQuery<GetGroupUserRes[], AxiosError>({
    queryKey: [QUERY_KEYS.GET_GROUP_USER],
    queryFn: getGroupUser,
  })
  console.log(userGroupList)

  // 로딩 상태 처리
  if (isGroupListLoading) {
    return <div>Loading...</div>
  }

  // 오류 상태 처리
  if (isGroupListError) {
    return <div>Error: {isGroupListError.message}</div>
  }

  return (
    <div className="h-[50%]">
      <p className="text-lg">🏘️ 내 그룹</p>
      <div className="h-full">
        {userGroupList && userGroupList.length > 0 ? (
          <>
            {userGroupList.map((group) => (
              <Link
                to={`${path.settings.base}/${path.settings.group}/${group.groupId}`}
                key={group.groupId}
                className="flex flex-row justify-between"
              >
                <p>{group.groupName}</p>
                <p>{group.isAdmin ? '관리자' : ''}</p>
                <p>{group.memberCount}</p>
              </Link>
            ))}
          </>
        ) : (
          <p>속한 그룹이 없습니다. 아래 버튼을 눌러 만들어 주세요!</p>
        )}
      </div>
    </div>
  )
}

export default MyGroupList
