import { getGroupInvitationRes } from '@/types/group'
import { IGetManagerInvitationRes } from '@/types/manager'
import Invitation from './Invitation'

type Props = {
  items: getGroupInvitationRes[] | IGetManagerInvitationRes
  title: string
  noneMessage?: string
}

const InvitationSection = ({
  items,
  title,
  noneMessage = '초대가 없습니다.',
}: Props) => {
  return (
    <>
      <div className="flex gap-2">
        <div className="font-medium">{title}</div>
        <div className="text-[16px] text-neutral-500">
          총 {items?.length || 0}건
        </div>
      </div>
      <div className="min-h-12 py-2">
        {items?.map((item) => <Invitation item={item} />)}
        {!items?.length && (
          <div className="b-neutral-400 mt-2 flex min-h-12 items-center justify-center rounded border text-neutral-400">
            {noneMessage}
          </div>
        )}
      </div>
    </>
  )
}

export default InvitationSection
