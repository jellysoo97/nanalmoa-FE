import { UserWithPhoneNumber } from '@/types/auth'
import { cn } from '@/utils/cn'
import { formatPhoneNumber } from '@/utils/format-phone-number'

type Props = {
  user: UserWithPhoneNumber
  className?: string
}

const UserMiniProfile = ({ user, className }: Props) => {
  return (
    <div className={cn('flex gap-2', className)}>
      {user.profileImage && user.profileImage.length > 0 ? (
        <img
          src={user.profileImage}
          className="size-8 rounded-full object-cover sm:size-9"
        />
      ) : (
        <div className="flex size-8 items-center justify-center rounded-full border sm:size-9">
          {user.name[0]}
        </div>
      )}
      <div className="gqp-0 flex flex-col sm:flex-row sm:items-center sm:gap-1">
        <div className="text-sm font-semibold sm:text-base">{user.name}</div>
        <div className="text-[12px] text-neutral-500 sm:text-xs">
          {user.phoneNumber ? formatPhoneNumber(user.phoneNumber) : user.email}
        </div>
      </div>
    </div>
  )
}

export default UserMiniProfile
