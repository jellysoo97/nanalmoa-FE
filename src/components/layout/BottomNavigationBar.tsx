import { useModal } from '@/hooks/use-modal'
import { path } from '@/routes/path'
import { Link } from 'react-router-dom'
import { IconButton } from '../common'
import SelectMethodModal from '../create-schedule/SelectMethodModal'
import { HomeIcon, PlusIcon, SettingIcon } from '../icons'

const BottomNavigationBar = () => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <div className="relative flex w-full items-center justify-between border-t border-t-neutral-200 px-12 py-2 sm:px-20">
        <Link to={path.schedules}>
          <IconButton
            direction="vertical"
            icon={<HomeIcon />}
            text="처음"
            className="gap-y-1 text-sm"
          />
        </Link>
        <button
          className="absolute -top-5 left-1/2 flex -translate-x-1/2 flex-col items-center"
          onClick={openModal}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-200 shadow-base sm:h-12 sm:w-12">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-primary-500">
              <PlusIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <span className="mt-2 text-sm">일정등록</span>
        </button>
        <Link to={path.settings}>
          <IconButton
            direction="vertical"
            icon={<SettingIcon />}
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
