import BaseField from './BaseField'
import { useCallback, useMemo, useRef, useState } from 'react'
import Select, { components, MenuProps, MultiValue } from 'react-select'

// TODO: backend group DTO에 맞추어 추후 재작성
interface User {
  id: string
  name: string
  group: string
}

interface Group {
  value: string
  label: string
}

const users: User[] = [
  { id: 'f1', name: '큰딸', group: '1' },
  { id: 'f2', name: '큰아들', group: '1' },
  { id: 'c1', name: '김씨네', group: '2' },
  { id: 'c2', name: '황씨네', group: '2' },
  { id: 'fr1', name: '친구1', group: '3' },
  { id: 'fr2', name: '친구2', group: '3' },
]

const groups: Group[] = [
  { value: '1', label: '가족' },
  { value: '2', label: '계모임' },
  { value: '3', label: '친구' },
]

const CustomMenu = (props: MenuProps<User, true>) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>(['1'])

  const filteredOptions = useMemo(() => {
    return selectedGroups.length === 0
      ? []
      : (props.options as User[]).filter((user) =>
          selectedGroups.includes(user.group)
        )
  }, [props.options, selectedGroups])

  const handleGroupClick = (groupValue: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupValue)
        ? prev.filter((g) => g !== groupValue)
        : [groupValue]
    )
  }

  return (
    <components.Menu {...props}>
      <div className="p-2">
        <div className="flex overflow-hidden rounded border">
          <div className="w-1/3 border-r">
            <h3 className="border-b bg-neutral-100 p-2 font-semibold">
              그룹 목록
            </h3>
            <ul>
              {groups.map((group) => (
                <li
                  key={group.value}
                  className={`cursor-pointer p-2 ${
                    selectedGroups.includes(group.value) ? 'bg-blue-100' : ''
                  }`}
                  onClick={() => handleGroupClick(group.value)}
                >
                  {group.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-2/3">
            <h3 className="border-b bg-neutral-100 p-2 font-semibold">
              사용자 목록
            </h3>
            <ul>
              {filteredOptions.map((user) => (
                <li
                  key={user.id}
                  className={`flex cursor-pointer items-center p-2 ${
                    (props.getValue() as User[]).some((v) => v.id === user.id)
                      ? 'bg-green-100'
                      : ''
                  }`}
                  onClick={() => {
                    const currentValue = props.getValue() as User[]
                    const newValue = currentValue.some((v) => v.id === user.id)
                      ? currentValue.filter((v) => v.id !== user.id)
                      : [...currentValue, user]
                    props.setValue(newValue, 'select-option')
                  }}
                >
                  <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-300">
                    {user.name[0]}
                  </div>
                  <span>{user.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </components.Menu>
  )
}

const GroupField = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<MultiValue<User>>([])

  const prevSelectedUsersRef = useRef<User[]>([])

  const handleChange = useCallback((newValue: MultiValue<User>) => {
    const newSelectedUsers = newValue as User[]
    const prevSelectedUsers = prevSelectedUsersRef.current

    // 추가된 사용자 찾기
    const addedUsers = newSelectedUsers.filter(
      (user) => !prevSelectedUsers.some((prevUser) => prevUser.id === user.id)
    )

    // 삭제된 사용자 찾기
    const removedUsers = prevSelectedUsers.filter(
      (user) => !newSelectedUsers.some((newUser) => newUser.id === user.id)
    )

    // 추가된 사용자 처리
    addedUsers.forEach((user) => {
      console.log('추가된 사용자:', user)
    })

    // 삭제된 사용자 처리
    removedUsers.forEach((user) => {
      console.log('삭제된 사용자:', user)
    })

    // 상태 업데이트
    setSelectedUsers(newSelectedUsers)
    prevSelectedUsersRef.current = newSelectedUsers
  }, [])
  const handleMenuOpen = () => setMenuIsOpen(true)
  const handleMenuClose = () => setMenuIsOpen(false)

  return (
    <BaseField
      id="group"
      label="공유 그룹"
      renderInput={() => (
        <div className="w-full max-w-md">
          <Select<User, true>
            isMulti
            options={users}
            value={selectedUsers}
            onChange={handleChange}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            placeholder="공유할 그룹원을 선택해주세요"
            components={{ Menu: CustomMenu }}
            menuIsOpen={menuIsOpen}
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
            styles={{
              control: (base) => ({
                ...base,
                borderColor: '#d1d5db',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: '#9ca3af',
                },
              }),
              menu: (base) => ({
                ...base,
                marginTop: '4px',
                boxShadow:
                  '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              }),
            }}
          />
        </div>
      )}
    />
  )
}

export default GroupField
