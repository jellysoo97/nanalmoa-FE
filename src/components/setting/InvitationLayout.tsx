import { GetGroupInvitationRes } from '@/types/group'
import { IGetManagerInvitationRes } from '@/types/manager'

type ItemType = GetGroupInvitationRes[] | IGetManagerInvitationRes

type ComponentProps<T extends ItemType> = {
  item: T[number]
  onClickReject: (id: number) => void
  onClickAccept?: (id: number) => void
}

type Props<T extends ItemType> = {
  items: T | undefined
  Component: React.ComponentType<ComponentProps<T>>
  message?: string
  onClickReject: (id: number) => void
  onClickAccept?: (id: number) => void
}

const InvitationLayout = <T extends ItemType>({
  items,
  Component,
  message = '초대가 없습니다',
  onClickReject,
  onClickAccept,
}: Props<T>) => {
  return (
    <>
      {items?.map((item, idx) => (
        <Component
          key={idx}
          item={item}
          onClickReject={onClickReject}
          {...(onClickAccept && { onClickAccept })}
        />
      ))}
      {!items?.length && (
        <div className="b-neutral-400 mt-2 flex min-h-12 items-center justify-center rounded border text-neutral-400">
          {message}
        </div>
      )}
    </>
  )
}

export default InvitationLayout
