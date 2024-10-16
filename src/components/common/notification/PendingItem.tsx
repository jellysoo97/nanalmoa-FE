import { useNotification } from '@/hooks/use-notification'
import { IInvitation } from '@/types/invitations'
import { cn } from '@/utils/cn'
import { Button } from '..'

type Props = {
  notification: IInvitation
  isGroupInvitation: boolean
}

const PendingItem = ({ notification, isGroupInvitation }: Props) => {
  const {
    managerAcceptMutation,
    managerRejectMutation,
    groupAcceptMutation,
    groupRejectMutation,
  } = useNotification()

  return (
    <div className="flex flex-col gap-y-2">
      <div
        className={cn(
          'flex w-fit items-center justify-center rounded-md px-2 py-1 text-xs',
          isGroupInvitation ? 'bg-primary-yellow' : 'bg-primary-beige'
        )}
      >
        {isGroupInvitation ? '그룹' : '관리자'}
      </div>
      <p>
        <strong>{notification.inviterName}</strong>님으로부터{' '}
        <strong>{isGroupInvitation ? '그룹' : '관리자'}</strong> 초대가
        도착했습니다!
      </p>
      <div className="flex w-full items-center justify-between gap-x-2">
        <Button
          text="거절하기"
          className="w-1/2 bg-primary-coral text-xs text-neutral-700"
          isLoading={
            groupRejectMutation.isPending || managerRejectMutation.isPending
          }
          onClick={() => {
            if (isGroupInvitation) {
              groupRejectMutation.mutate({ id: notification.id })
              return
            }
            managerRejectMutation.mutate(notification.id)
          }}
        />
        <Button
          text="수락하기"
          className="w-1/2 bg-primary-blue text-xs text-neutral-700"
          isLoading={
            groupAcceptMutation.isPending || managerAcceptMutation.isPending
          }
          onClick={() => {
            if (isGroupInvitation) {
              groupAcceptMutation.mutate({ id: notification.id })
              return
            }
            managerAcceptMutation.mutate(notification.id)
          }}
        />
      </div>
    </div>
  )
}

export default PendingItem
