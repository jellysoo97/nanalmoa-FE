import { IManagerInvitation } from '@/types/manager'
import { formatDate } from '@/utils/format-date'
import { DateFormatTypeEnum } from '@/types/common'
import { cn } from '@/utils/cn'
import { getGroupInvitationRes } from '@/types/group'

type Props = {
  item: IManagerInvitation | getGroupInvitationRes
}

// TODO: 상태 추가 및 스타일 추가
type inviteTypes = 'PENDING' | string

const inviteClasses: Record<inviteTypes, string> = {
  PENDING: 'text-blue-500 bg-blue-200',
}

const Invitation = ({ item }: Props) => {
  /* manager 타입이면 true, group 타입이면 false를 반환합니다 */
  const isManagerInvitation = (
    item: IManagerInvitation | getGroupInvitationRes
  ): item is IManagerInvitation => {
    return 'managerInvitationId' in item
  }

  /* 그룹 dto에 맞게 수정해서 사용해주세요 */
  return (
    <div className="flex justify-between rounded bg-neutral-200 px-2 py-[7px]">
      <div className="font-bold">
        {isManagerInvitation(item) ? item.subordinateName : '그룹원 이름'}
      </div>
      <div className="flex gap-1">
        {isManagerInvitation(item) && (
          <div className="flex items-center text-xs">
            {formatDate(DateFormatTypeEnum.MonthAndDay, item.updatedAt)}
          </div>
        )}
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
