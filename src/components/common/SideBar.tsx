import { ChangeEvent, useState } from 'react'
import { PrevIcon } from '../icons'

type Props = {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

interface User {
  id: string
  label: string
}

const users: User[] = [
  { id: '1', label: '사용자1' },
  { id: '2', label: '사용자2' },
  { id: '3', label: '사용자3' },
  { id: '4', label: '사용자4' },
]

const SideBar = ({ isSidebarOpen, toggleSidebar }: Props) => {
  const [selectedSubotdinate, setSelectedSubordinate] = useState<string>('')

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`fixed right-0 top-0 h-full w-[220px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out sm:w-[30%] ${
          isSidebarOpen ? 'z-50 translate-x-0' : 'translate-x-full'
        }`}
      >
        <button onClick={toggleSidebar} className="mt-5 px-3">
          <PrevIcon />
        </button>
        <div className="px-4 py-2">
          <h2 className="mb-1 text-xl font-bold">관리인 일정</h2>
          <button className="my-3 rounded border px-2 py-1 text-xs">
            초기화
          </button>
          {users.map((task) => (
            <label key={task.id} className="flex items-center space-x-2">
              <input
                type="radio"
                name="task"
                value={task.id}
                checked={selectedSubotdinate === task.id}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSelectedSubordinate(e.target.value)
                }
                className="form-radio text-green-500"
              />
              <span>{task.label}</span>
            </label>
          ))}
          {selectedSubotdinate && (
            <>
              <p className="mt-4">선택된 사용자: </p>
              <p>
                {' '}
                {users.find((task) => task.id === selectedSubotdinate)?.label}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default SideBar
