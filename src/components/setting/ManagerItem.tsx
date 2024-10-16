import { IManagerUser } from '@/types/manager'

type Props = {
  item: IManagerUser
  onClickDelete?: (id: string) => void
}

const ManagerItem = ({ item, onClickDelete }: Props) => {
  return (
    <div className="mb-1 flex items-center justify-between rounded bg-neutral-200 px-3 py-[7px]">
      <div className="font-bold">{item.name}</div>
      <div className="flex gap-1">
        <button
          className="rounded border bg-red-200 px-2 py-1 text-sm text-red-500"
          onClick={() => onClickDelete && onClickDelete(item.userUuid)}
        >
          제거
        </button>
      </div>
    </div>
  )
}

export default ManagerItem
