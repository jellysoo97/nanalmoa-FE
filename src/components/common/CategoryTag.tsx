import { Categories, CategoryEnum } from '@/types/category'
import { cn } from '@/utils/cn'

// backend에서 들어오는 정보 형태에 따라 수정

type Props = {
  label: Categories
}

const CategoryTag = ({ label }: Props) => {
  return (
    <span
      className={cn(
        CategoryEnum[label],
        'mr-1 rounded-lg px-2 py-1 text-xs text-white'
      )}
    >
      {label}
    </span>
  )
}

export default CategoryTag
