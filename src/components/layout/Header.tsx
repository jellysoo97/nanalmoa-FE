import logo from '@/assets/logo/logo.svg'
import { path } from '@/routes/path'
import { cn } from '@/utils/cn'
import { Link } from 'react-router-dom'
import { IconButton } from '../common'
import Notification from '../common/notification/Notification'
import { InfoIcon } from '../icons'
import { useManager } from '@/hooks/use-manager'
import ManagerIcon from '../icons/ManagerIcon'
import { useSideBar } from '@/hooks/use-side-bar'
import SideBar from '../common/SideBar'

const Header = () => {
  const { hasSubordinates } = useManager()
  const { isSidebarOpen, handleSideBar } = useSideBar()

  return (
    <>
      <header
        className={cn(
          'flex items-center justify-between border-b border-neutral-200 px-3 py-2',
          'sticky top-0 z-30 bg-white'
        )}
      >
        <Link to={path.schedules}>
          <img
            src={logo}
            alt="Logo"
            className="sm:h-15 h-8 w-40 sm:w-[200px]"
          />
        </Link>
        <div className="flex items-center">
          <IconButton
            direction="vertical"
            icon={<InfoIcon />}
            text="도움말"
            className="mr-2 text-nowrap text-sm"
          />
          <Notification />
          {hasSubordinates && (
            <div
              onClick={handleSideBar}
              className="ml-[10px] flex items-center"
            >
              <IconButton
                direction="vertical"
                icon={<ManagerIcon className="w-6 sm:w-11" />}
                text="관리자"
                className="mt-[3px] text-nowrap text-sm"
              />
            </div>
          )}
        </div>
      </header>
      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={handleSideBar} />
    </>
  )
}

export default Header
