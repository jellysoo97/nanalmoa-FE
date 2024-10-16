import logo from '@/assets/logo/logo.svg'
import { path } from '@/routes/path'
import { cn } from '@/utils/cn'
import { Link } from 'react-router-dom'
import { IconButton } from '../common'
import Notification from '../common/notification/Notification'
import { InfoIcon } from '../icons'

const Header = () => {
  return (
    <header
      className={cn(
        'flex items-center justify-between border-b border-neutral-200 px-3 py-2',
        'sticky top-0 z-30 bg-white'
      )}
    >
      <Link to={path.schedules}>
        <img src={logo} alt="Logo" className="sm:h-15 h-8 w-40 sm:w-[200px]" />
      </Link>
      <div className="flex items-center gap-x-4">
        <IconButton direction="vertical" icon={<InfoIcon />} text="도움말" />
        <Notification />
      </div>
    </header>
  )
}

export default Header
