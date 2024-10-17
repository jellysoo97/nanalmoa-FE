import { getGroupUser } from '@/api/group/get-group-user'
import { QUERY_KEYS } from '@/constants/api'
import { path } from '@/routes/path'
import { GetGroupUserRes } from '@/types/group'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Link } from 'react-router-dom'
import SettingSection from '../setting/SettingSection'

const MyGroupList = () => {
  //내 그룹 리스트 조회
  const { data: userGroupList } = useQuery<GetGroupUserRes[], AxiosError>({
    queryKey: [QUERY_KEYS.GET_GROUP_USER],
    queryFn: getGroupUser,
  })

  return (
    <div className="h-1/3">
      <SettingSection title="🏘️ 내 그룹">
        <div className="h-full">
          {userGroupList && userGroupList.length > 0 ? (
            <>
              {userGroupList.map((group) => (
                <Link
                  to={`${path.settings.base}/${path.settings.group}/${group.groupId}`}
                  key={group.groupId}
                  className="flex flex-row items-center justify-between p-2"
                >
                  <p className="flex-1 truncate">{group.groupName}</p>
                  <p className="w-20 flex-none text-center">
                    {group.isAdmin ? '생성자' : ''}
                  </p>
                  <p className="w-20 flex-none text-center">
                    {group.memberCount}
                  </p>
                </Link>
              ))}
            </>
          ) : (
            <p className="mt-5">
              속한 그룹이 없습니다. <br />
              아래 버튼을 눌러 만들어 주세요!
            </p>
          )}
        </div>
      </SettingSection>
    </div>
  )
}

export default MyGroupList
