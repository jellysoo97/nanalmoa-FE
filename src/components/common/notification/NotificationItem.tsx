import {
  IInvitation,
  InvitationGroupEnum,
  InvitationStatusEnum,
} from '@/types/invitations'
import PendingItem from './PendingItem'
import SettledItem from './SettledItem'
type Props = {
  notification: IInvitation
}

const NotificationItem = ({ notification }: Props) => {
  const isGroupInvitation = notification.type === InvitationGroupEnum.Group
  const isPendingInvitaion =
    notification.status === InvitationStatusEnum.PENDING

  return (
    <div className="flex items-center border-b border-neutral-300 px-2 py-3 text-sm last:border-none hover:bg-neutral-200">
      {isPendingInvitaion ? (
        <PendingItem
          notification={notification}
          isGroupInvitation={isGroupInvitation}
        />
      ) : (
        <SettledItem
          notification={notification}
          isGroupInvitation={isGroupInvitation}
        />
      )}
    </div>
  )
}

export default NotificationItem
