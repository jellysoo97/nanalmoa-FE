import { PostUsersSearch } from '@/api/users/post-user-search'
import {
  PostUserSearchReq,
  PostUserSearchRes,
  UserWithPhoneNumber,
} from '@/types/auth'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ChangeEvent, useState } from 'react'
import Divider from './Divider'
import { CloseIcon } from '../icons'
import UserMiniProfile from './UserMiniProfile'

type Props = {
  onClick?: (user: UserWithPhoneNumber) => void
}

const UserSelector = ({ onClick }: Props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<PostUserSearchRes>([])

  const mutation = useMutation<
    PostUserSearchRes,
    AxiosError,
    PostUserSearchReq
  >({
    mutationFn: PostUsersSearch,
    onSuccess: (data) => {
      setSearchResults(data)
    },
    onError: () => {
      setSearchResults([])
    },
  })

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    if (term?.length > 0) {
      mutation.mutate({ keyword: term })
    } else {
      setSearchResults([])
    }
  }

  return (
    <div className="mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="이름, 전화번호, 이메일을 입력해주세요"
          className="w-full rounded-md border border-neutral-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="absolute right-3 top-2 rounded-full bg-neutral-300 sm:top-1"
          onClick={() => {
            setSearchTerm('')
            setSearchResults([])
          }}
        >
          <CloseIcon />
        </button>
      </div>
      {searchResults && searchResults?.length > 0 && (
        <ul className="rounded-bl-md rounded-br-md border-b border-l border-r border-neutral-300 bg-white px-4 py-1 shadow-sm">
          <div className="py-2 text-xs text-neutral-500">
            💡 검색된 사용자 {searchResults?.length} 명
          </div>
          <Divider />
          <div>
            {searchResults?.length &&
              searchResults.map((user) => (
                <li
                  key={user.userId}
                  className="flex cursor-pointer justify-between gap-2 py-3"
                >
                  <UserMiniProfile user={user} />
                  {onClick && (
                    <button
                      className="rounded bg-primary-500 px-2 py-1 text-xs text-white sm:text-base"
                      onClick={() => onClick(user)}
                    >
                      <span>초대</span>
                      <span className="hidden sm:inline">하기</span>
                    </button>
                  )}
                </li>
              ))}
          </div>
        </ul>
      )}
      {!mutation.isIdle && !searchResults?.length && (
        <div className="px-2 py-1 text-sm text-red-400">
          해당 사용자가 없습니다!
        </div>
      )}
    </div>
  )
}

export default UserSelector
