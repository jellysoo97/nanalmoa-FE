import { ReactNode } from 'react'

type Props = {
  title: string
  children?: ReactNode
  itemsLength?: number
}

const InvitationsSection = ({ title, children, itemsLength = -1 }: Props) => {
  return (
    <>
      <div className="flex gap-2">
        <div className="font-medium">{title}</div>
        {itemsLength >= 0 && (
          <div className="text-[16px] text-neutral-500">총 {itemsLength}건</div>
        )}
      </div>
      <div className="min-h-12 py-2">{children}</div>
    </>
  )
}

export default InvitationsSection
