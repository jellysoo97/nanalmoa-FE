import { PrevIcon } from '../icons'
import { useManager } from '@/hooks/use-manager'
import useManagerStore from '@/store/manager'

type Props = {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const SideBar = ({ isSidebarOpen, toggleSidebar }: Props) => {
  const { selectedSubordinate, setSelectedSubordinate } = useManagerStore()
  const { mySubordinates } = useManager()

  const handleReset = () => {
    setSelectedSubordinate(null)
  }

  if (!Array.isArray(mySubordinates) || mySubordinates.length === 0) return null

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
          <h2 className="text-xl font-bold">관리인 일정 관리</h2>
          <div className="text-[10px]">
            💡피관리인들의 일정을 관리할 수 있습니다.
          </div>
          <button
            onClick={handleReset}
            className="my-3 w-full rounded border px-2 py-1 text-xs"
          >
            설정 초기화
          </button>

          <div className="pt-3 font-semibold">🍀 선택된 사용자</div>
          {selectedSubordinate && (
            <>
              <div className="mx-2 mb-1 mt-3 flex">
                {selectedSubordinate?.profileImage ? (
                  <img
                    src={selectedSubordinate.profileImage}
                    className="size-6 rounded-full object-cover sm:size-9"
                  />
                ) : (
                  <div className="flex size-6 items-center justify-center rounded-full border text-[13px] sm:size-6 sm:text-[15px]">
                    {selectedSubordinate.name[0]}
                  </div>
                )}
                <p className="px-2 pb-1">
                  {
                    mySubordinates.find(
                      (task) => task.userUuid === selectedSubordinate.userUuid
                    )?.name
                  }
                </p>
              </div>
            </>
          )}
          {!selectedSubordinate && (
            <div className="my-2 flex h-10 items-center justify-center rounded border text-[13px] text-neutral-400">
              선택된 사용자가 없습니다.
            </div>
          )}

          <div>
            <div className="flex gap-2">
              <div className="pt-3 font-semibold">🍀 피관리인 목록</div>
              <p className="pt-3 text-[11px] text-neutral-500">
                총 {mySubordinates?.length}명
              </p>
            </div>
            <div className="px-2 py-2">
              {mySubordinates.map((user) => (
                <label
                  key={user.userUuid}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    name="task"
                    value={user.userUuid}
                    checked={selectedSubordinate?.userUuid === user.userUuid}
                    onChange={(e) => {
                      const selectedUser = mySubordinates.find(
                        (sub) => sub.userUuid === e.target.value
                      )
                      if (selectedUser) {
                        setSelectedSubordinate(selectedUser)
                      }
                    }}
                    className="form-radio text-green-500"
                  />
                  <span>{user.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideBar
