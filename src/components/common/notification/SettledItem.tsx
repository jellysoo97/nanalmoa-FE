import {
  IInvitation,
  InvitationRoleEnum,
  InvitationStatusEnum,
} from '@/types/invitations'
import { cn } from '@/utils/cn'

type Props = {
  notification: IInvitation
  isGroupInvitation: boolean
}

const SettledItem = ({ notification, isGroupInvitation }: Props) => {
  const isAccepted = notification.status === InvitationStatusEnum.ACCEPTED
  const isSender =
    notification.role === InvitationRoleEnum.GROUP_ADMIN ||
    notification.role === InvitationRoleEnum.MANAGER

  return (
    <div className="flex w-full flex-col gap-y-2">
      <div
        className={cn(
          'flex w-fit items-center justify-center rounded-md px-2 py-1 text-xs',
          isGroupInvitation ? 'bg-primary-yellow' : 'bg-primary-beige'
        )}
      >
        {isGroupInvitation ? '그룹' : '관리자'}
      </div>
      {isSender ? (
        <p className="whitespace-pre-wrap text-center">
          <strong>{notification.inviteeName}</strong>님께 보낸{'\n'}
          <strong>{isGroupInvitation ? '그룹' : '관리자'}</strong> 초대가{' '}
          <strong>{isAccepted ? '수락' : '거절'}</strong>되었습니다.
        </p>
      ) : (
        <p className="whitespace-pre-wrap text-center">
          <strong>{notification.inviterName}</strong>님께 받은{'\n'}
          <strong>{isGroupInvitation ? '그룹' : '관리자'}</strong> 초대를{' '}
          <strong>{isAccepted ? '수락' : '거절'}</strong>했습니다.
        </p>
      )}
    </div>
  )
}

export default SettledItem
