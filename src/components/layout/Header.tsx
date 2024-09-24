import logo from '@/assets/logo/logo.svg'
import { path } from '@/routes/path'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { IconButton } from '../common'
import { InfoIcon, NotificationIcon } from '../icons'

const Header = () => {
  return (
    <header
      className={cn(
        'flex items-center justify-between border-b border-neutral-200 px-3 py-2',
        'sticky top-0 z-30 bg-white'
      )}
    >
      <Link to={path.schedules}>
        <img src={logo} alt="Logo" />
      </Link>
      <div className="flex items-center gap-x-4">
        <IconButton direction="vertical" icon={<InfoIcon />} text="도움말" />
        <IconButton
          direction="vertical"
          icon={<NotificationIcon />}
          text="알림"
        />
      </div>
    </header>
  )
}

export default Header
