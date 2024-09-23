import { Link } from 'react-router-dom'
import { IconButton } from '../common'
import { HomeIcon, PlusIcon, SettingIcon } from '../icons'
import { path } from '@/routes/path'

const BottomNavigationBar = () => {
  return (
    <div className="sticky bottom-0 z-50 h-[var(--bottom-bar-height)] px-4">
      <div className="relative flex items-center justify-between rounded-2xl px-8 py-3 shadow-base sm:px-20">
        <Link to={path.schedules}>
          <IconButton
            direction="horizontal"
            icon={<HomeIcon />}
            text="처음"
            className="gap-x-1"
          />
        </Link>
        {/* TODO: onClick -> 일정 등록 방법 선택 모달 오픈 */}
        <button className="absolute -top-6 left-1/2 flex -translate-x-1/2 flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 shadow-base">
            <PlusIcon className="text-white" />
          </div>
          <span>일정등록</span>
        </button>
        <Link to={path.settings}>
          <IconButton
            direction="horizontal"
            icon={<SettingIcon />}
            text="설정"
            className="gap-x-1"
          />
        </Link>
      </div>
    </div>
  )
}

export default BottomNavigationBar
