import { IManagerInvitation } from '@/types/manager'
import { getGroupInvitationRes } from '@/types/group'

type Props = {
  item: IManagerInvitation | getGroupInvitationRes
  onClickReject: (id: number) => void
}

const SendedInvitation = ({ item, onClickReject }: Props) => {
  /* manager 타입이면 true, group 타입이면 false를 반환합니다 */
  const isManagerInvitation = (
    item: IManagerInvitation | getGroupInvitationRes
  ): item is IManagerInvitation => {
    return 'managerInvitationId' in item
  }

  const inviteId = isManagerInvitation(item)
    ? item.managerInvitationId
    : item.invitationId

  /* 그룹 dto에 맞게 수정해서 사용해주세요 */
  return (
    <div className="flex justify-between rounded bg-neutral-200 px-3 py-[7px]">
      <div className="font-bold">
        {isManagerInvitation(item) ? item.subordinateName : '그룹원 이름'}
      </div>
      <div className="flex gap-1">
        {item.status === 'PENDING' && (
          <>
            <div className="rounded border border-primary-700 px-2 py-1 text-sm text-primary-700">
              요청중
            </div>
            <button
              onClick={() => onClickReject(inviteId)}
              className="rounded bg-red-200 px-2 py-1 text-sm text-red-500"
            >
              요청 철회
            </button>
          </>
        )}
        {item.status === 'REJECTED' && (
          <div className="rounded border border-red-500 px-2 py-1 text-sm text-red-500">
            거절된 요청
          </div>
        )}
        {item.status === 'ACCEPTED' && (
          <div className="rounded border border-blue-500 px-2 py-1 text-sm text-blue-500">
            승락된 요청
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

export default SendedInvitation
