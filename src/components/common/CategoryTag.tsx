import { Categories, CategoryEnum } from '@/types/category.model'

type Props = {
  label: Categories
}

const CategoryTag = ({ label }: Props) => {
  return (
    <span
      className={`${CategoryEnum[label]} mr-1 rounded-lg px-2 py-1 text-xs text-white`}
    >
      {label}
    </span>
  )
}

export default CategoryTag
