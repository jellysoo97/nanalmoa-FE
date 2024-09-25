import { Categories, CategoryEnum } from '@/types/category'
import { cn } from '@/utils/cn'

type Props = {
  label: Categories
  className?: string
  as?: 'span' | 'button'
} & React.HTMLAttributes<HTMLElement>

const CategoryTag = ({
  label,
  className,
  as: Component = 'span',
  ...props
}: Props) => {
  return (
    <Component
      className={cn(
        CategoryEnum[label],
        'mr-1 rounded-lg px-2 py-1 text-xs text-white',
        className
      )}
      {...props}
    >
      {label}
    </Component>
  )
}

export default CategoryTag
