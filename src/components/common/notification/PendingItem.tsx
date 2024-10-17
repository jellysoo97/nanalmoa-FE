import { useNotification } from '@/hooks/use-notification'
import { IInvitation, InvitationTypeEnum } from '@/types/invitations'
import { cn } from '@/utils/cn'
import { Button } from '..'
import { invitationTypeLabels } from '@/constants/schedules'

type Props = {
  notification: IInvitation
}

const PendingItem = ({ notification }: Props) => {
  const { id, type, inviterName } = notification
  const isGroupInvitation = type === InvitationTypeEnum.Group
  const {
    managerAcceptMutation,
    managerRejectMutation,
    groupAcceptMutation,
    groupRejectMutation,
  } = useNotification()

  const handleAccept = () => {
    if (isGroupInvitation) {
      groupAcceptMutation.mutate({ id })
      return
    }
    managerAcceptMutation.mutate(id)
  }
  const handleReject = () => {
    if (isGroupInvitation) {
      groupRejectMutation.mutate({ id })
      return
    }
    managerRejectMutation.mutate(id)
  }

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
          님으로부터{' '}
        </p>
      </div>
      <p className="text-center text-xs">
        <strong className="text-sm">{invitationTypeLabels[type]}</strong> 초대가
        도착했습니다!
      </p>
      <div className="flex w-full items-center justify-between gap-x-2">
        <Button
          text="거절하기"
          className="w-1/2 bg-red-300 text-xs text-neutral-700"
          isLoading={
            groupRejectMutation.isPending || managerRejectMutation.isPending
          }
          onClick={handleReject}
        />
        <Button
          text="수락하기"
          className="w-1/2 bg-primary-400 text-xs text-neutral-700"
          isLoading={
            groupAcceptMutation.isPending || managerAcceptMutation.isPending
          }
          onClick={handleAccept}
        />
      </div>
    </div>
  )
}

export default PendingItem
