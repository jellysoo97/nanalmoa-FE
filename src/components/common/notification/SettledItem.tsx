import {
  invitationStatusLabels,
  invitationTypeLabels,
} from '@/constants/schedules'
import {
  IInvitation,
  InvitationRoleEnum,
  InvitationTypeEnum,
} from '@/types/invitations'
import { cn } from '@/utils/cn'

type Props = {
  notification: IInvitation
}

const SettledItem = ({ notification }: Props) => {
  const { type, status, role, inviterName } = notification
  const isGroupInvitation = type === InvitationTypeEnum.Group
  const isSender =
    role === InvitationRoleEnum.GROUP_ADMIN ||
    role === InvitationRoleEnum.MANAGER

  return (
    <div className="flex w-full flex-col gap-y-2">
      <div className="flex items-center gap-x-2">
        <div
          className={cn(
            'flex w-fit items-center justify-center rounded-md px-2 py-1 text-xs',
            isGroupInvitation ? 'bg-primary-yellow' : 'bg-indigo-200'
          )}
        >
          {invitationTypeLabels[type]}
        </div>
        <p className="text-xs">
          <strong className="inline-block max-w-28 truncate align-middle text-sm">
            {inviterName}
          </strong>
          님께 {isSender ? '보낸' : '받은'}
        </p>
      </div>
      <p className="text-center text-xs">
        <strong className="text-sm">{invitationTypeLabels[type]}</strong> 초대가{' '}
        <strong className="text-sm">{invitationStatusLabels[status]}</strong>
        되었습니다.
      </p>
    </div>
  )
}

export default SettledItem
