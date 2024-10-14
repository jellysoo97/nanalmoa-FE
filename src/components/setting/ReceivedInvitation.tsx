import { IManagerInvitation } from '@/types/manager'
import { getGroupInvitationRes } from '@/types/group'

type Props = {
  item: IManagerInvitation | getGroupInvitationRes
  onClickReject: () => void
  onClickAccept?: () => void
}

const ReceivedInvitation = ({ item, onClickReject, onClickAccept }: Props) => {
  /* IManagerInvitation 타입이면 true, getGroupInvitationRes 타입이면 false를 반환합니다 */
  const isManagerInvitation = (
    item: IManagerInvitation | getGroupInvitationRes
  ): item is IManagerInvitation => {
    return 'managerInvitationId' in item
  }

  /* 그룹 dto에 맞게 수정해서 사용해주세요 */
  return (
    <div className="flex justify-between rounded bg-neutral-200 px-3 py-[7px]">
      <div className="font-bold">
        {isManagerInvitation(item) ? item.subordinateName : '그룹원 이름'}
      </div>
      <div className="flex gap-1">
        {item.status === 'PENDING' && (
          <div className="flex gap-1">
            <button
              className="rounded border bg-blue-200 px-2 py-1 text-sm text-blue-500"
              onClick={onClickAccept}
            >
              초대 수락
            </button>
            <button
              className="rounded border bg-red-200 px-2 py-1 text-sm text-red-500"
              onClick={onClickReject}
            >
              초대 거절
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReceivedInvitation
