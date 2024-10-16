import { IManagerInvitation } from '@/types/manager'
import { GetGroupInvitationRes } from '@/types/group'

type Props = {
  item: IManagerInvitation | GetGroupInvitationRes
  onClickReject: (id: number) => void
  onClickAccept?: (id: number) => void
}

const ReceivedInvitation = ({ item, onClickReject, onClickAccept }: Props) => {
  /* IManagerInvitation 타입이면 true, getGroupInvitationRes 타입이면 false를 반환합니다 */
  const isManagerInvitation = (
    item: IManagerInvitation | GetGroupInvitationRes
  ): item is IManagerInvitation => {
    return 'managerInvitationId' in item
  }

  const inviteId = isManagerInvitation(item)
    ? item.managerInvitationId
    : item.invitationId

  // 3분이 지나면 화면에 표시하지 않음
  // let updatedAt: Date | undefined
  // if (typeof item.updatedAt === 'string') {
  //   updatedAt = new Date(item.updatedAt)
  // } else {
  //   updatedAt = item.updatedAt
  // }
  // const now = new Date()
  // const threeMinutes = 3 * 60 * 1000
  // const isExpired = updatedAt
  //   ? now.getTime() - updatedAt.getTime() > threeMinutes
  //   : false
  // if (item.status === 'CANCELED' && isExpired) {
  //   return null
  // }

  /* 그룹 dto에 맞게 수정해서 사용해주세요 */
  return (
    <div className="mb-1 flex items-center justify-between rounded bg-neutral-200 px-3 py-[7px]">
      {!isManagerInvitation(item) && (
        <div className="font-bold">{item.groupName}</div>
      )}
      <div className="font-bold">
        {isManagerInvitation(item) ? item.subordinateName : item.inviterName}
      </div>
      <div className="flex gap-1">
        {item.status === 'PENDING' && (
          <div className="flex gap-1">
            {onClickAccept && (
              <button
                className="rounded border bg-blue-200 px-2 py-1 text-sm text-blue-500"
                onClick={() => onClickAccept(inviteId)}
              >
                초대 수락
              </button>
            )}
            <button
              className="rounded border bg-red-200 px-2 py-1 text-sm text-red-500"
              onClick={() => onClickReject(inviteId)}
            >
              초대 거절
            </button>
          </div>
        )}
        {item.status === 'REJECTED' && (
          <div className="rounded border border-red-500 px-2 py-1 text-sm text-red-500">
            거절된 요청
          </div>
        )}
        {item.status === 'ACCEPTED' && (
          <div className="rounded border border-blue-500 px-2 py-1 text-sm text-blue-500">
            수락된 요청
          </div>
        )}
        {item.status === 'CANCELED' && (
          <div className="rounded border border-neutral-500 px-2 py-1 text-sm text-neutral-500">
            취소된 요청
          </div>
        )}
      </div>
    </div>
  )
}

export default ReceivedInvitation
