import { IManagerInvitation } from '@/types/manager'
import { formatDate } from '@/utils/format-date'
import { DateFormatTypeEnum } from '@/types/common'
import { cn } from '@/utils/cn'

type Props = {
  item: IManagerInvitation
}

type inviteTypes = 'PENDING' | string

const inviteClasses: Record<inviteTypes, string> = {
  PENDING: 'text-blue-500 bg-blue-200',
}

const Invitation = ({ item }: Props) => {
  return (
    <div className="flex justify-between rounded bg-neutral-200 px-1 px-2 py-1">
      <div className="font-bold">{item.subordinateName}</div>
      <div className="flex gap-1">
        <div className="flex items-center text-xs">
          {formatDate(DateFormatTypeEnum.MonthAndDay, item.updatedAt)}
        </div>
        <div
          className={cn(
            'rounded px-2 py-1 text-sm',
            inviteClasses[item.status]
          )}
        >
          {item.status === 'PENDING' ? '요청중' : ''}
        </div>
      </div>
    </div>
  )
}

export default Invitation
