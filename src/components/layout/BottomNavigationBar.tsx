import { useModal } from '@/hooks/use-modal'
import { path } from '@/routes/path'
import { Link } from 'react-router-dom'
import { IconButton } from '../common'
import SelectMethodModal from '../create-schedule/SelectMethodModal'
import { HomeIcon, PlusIcon, SettingIcon } from '../icons'
import { cn } from '@/utils/cn'

const BottomNavigationBar = () => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <div
        className={cn(
          'absolute bottom-6 z-30 mx-6 px-4',
          'relative flex items-center justify-between rounded-2xl px-10 py-3 shadow-base sm:px-20'
        )}
      >
        <Link to={path.schedules}>
          <IconButton
            direction="vertical"
            icon={<HomeIcon className="h-6 w-6" />}
            text="처음"
            className="gap-y-1 text-sm"
          />
        </Link>
        {/* TODO: onClick -> 일정 등록 방법 선택 모달 오픈 */}
        <button
          className="absolute -top-8 left-1/2 flex -translate-x-1/2 flex-col items-center"
          onClick={openModal}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-200 shadow-base">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-primary-500">
              <PlusIcon className="text-white" />
            </div>
          </div>
          <span className="mt-2 text-sm">일정등록</span>
        </button>
        <Link to={path.settings}>
          <IconButton
            direction="vertical"
            icon={<SettingIcon className="h-6 w-6" />}
            text="설정"
            className="gap-y-1 text-sm"
          />
        </Link>
      </div>
      {isModalOpen && <SelectMethodModal onClose={closeModal} />}
    </>
  )
}

export default BottomNavigationBar
